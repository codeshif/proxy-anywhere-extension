// Settings are shared with the background service worker via chrome.storage.

// When the DOM is loaded, make sure all the saved info is restored.
window.addEventListener('load', onLoad, false);

var dialog = null;

/**
 * When the options window has been loaded.
 */
async function onLoad() {
  await onRestore();
  $('button-save').addEventListener('click', onSave, false);
  $('button-close').addEventListener('click', onClose, false);
  $('bypass-list-add').addEventListener('click', onBypassListAdd, false);
  $('bypass-list-remove').addEventListener('click', onBypassListRemove, false);
  $('bypass-list-remove-all').addEventListener('click', onBypassListRemoveAll, false);
  document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
  }, false);

  dialog = new DialogController('add-bypass-dialog');
  dialog.addEventListener('click', onDialogOk);
  dialog.addEventListener('load', onDialogLoad);
  dialog.setTemplate({header: t('dialog_header'), ok: t('dialog_ok')});
  dialog.init();
  applyI18n();
}

/**
 *  When the options window is closed;
 */
function onClose() {
  window.close();
}

/**
 * Saves options to chrome.storage.local.
 */
async function onSave() {
  const port = parseInt($('port').value, 10);

  // Save settings.
  await settings.save({
    scheme: $('scheme').value,
    host: $('host').value,
    port: isNaN(port) ? 8080 : port,
    autostart: $('autostart').checked,
    incognito: $('incognito').checked,
    bypass: getBypassList()
  });

  // Ask the background to re-apply the proxy with the new settings.
  chrome.runtime.sendMessage({ type: 'refresh-proxy' });

  // Update status to let user know options were saved.
  var info = $('info-message');
  info.style.display = 'inline';
  info.style.opacity = 1;
  setTimeout(function() {
    info.style.opacity = 0.0;
  }, 1000);
}

/**
 * Collects the current bypass list from the UI.
 */
function getBypassList() {
  var bypassList = [];
  var list = $('bypass_list');
  for (var i = 0; i < list.length; i++) {
    bypassList.push(list[i].value);
  }
  return bypassList;
}

/**
 * Restore all options.
 */
async function onRestore() {
  const s = await settings.getAll();

  // Restore settings.
  $('version').innerHTML = ' (v' + chrome.runtime.getManifest().version + ')';
  $('host').value = s.host;
  $('port').value = s.port;
  $('scheme').value = s.scheme;
  $('autostart').checked = s.autostart;
  $('incognito').checked = s.incognito;

  // Restore bypass list.
  var list = $('bypass_list');
  for (var i = 0; i < s.bypass.length; i++) {
    list.add(new Option(s.bypass[i]));
  }
}

//
// Proxy specific functionality.
// TODO(mohamed): Do proper separation between options and customizations.
//

/**
 * On Add Event.
 */
function onBypassListAdd() {
  dialog.setVisible(true);
}

/**
 * On Remove Event.
 */
function onBypassListRemove() {
  var list = $('bypass_list');
  if (list.selectedIndex != -1) {
    list.remove(list.selectedIndex);
  }
  list.selectedIndex = list.length - 1;
}

/**
 * On Remove All Event.
 */
function onBypassListRemoveAll() {
  var list = $('bypass_list');
  while (list.length != 0) {
    list.remove();
  }
}

/**
 * On Dialog Add Event.
 */
function onDialogOk(state) {
  if (state != DialogController.OK) {
    return;
  }
  var item = $('bypass-item-add');
  if (item.value.trim().length == 0) {
    return;
  }
  var list = $('bypass_list');
  var items = item.value.split(',');
  for (var i = 0; i < items.length; i++) {
    list.add(new Option(items[i]));
  }
  list.selectedIndex = list.length - 1;
  dialog.setVisible(false);
}

/**
 * On Dialog Load Event.
 */
function onDialogLoad() {
  $('bypass-item-add').value = '';
  $('bypass-item-add').focus();
}
