// Simple i18n for the options page.
// When the browser UI language is Chinese (zh*), all translatable text is
// shown in Simplified Chinese; otherwise the English defaults are kept.

var I18N = {
  en: {
    save_reminder: 'Make sure you save the settings after your done editing!',
    proxy_server_header: 'Proxy Server',
    proxy_server_desc: "The following section encapsulates a single proxy server's specification. Make sure the server information is correct.",
    label_protocol: 'Protocol:',
    label_host: 'Host:',
    label_port: 'Port:',
    label_autostart: 'Autostart:',
    label_incognito: 'Incognito only:',
    incognito_note: 'Only use this proxy setting for incognito windows.',
    exceptions_header: 'Exceptions',
    exceptions_desc: 'Individual servers may be excluded from being proxied.',
    label_bypass: 'Bypass list:',
    btn_add: 'Add',
    btn_remove: 'Remove',
    btn_remove_all: 'Remove All',
    misc_header: 'Misc',
    misc_desc: 'If you would like to be notified of major upgrades to this extension, please make sure the box below is unchecked. You wont be spammed.',
    label_opt_out: 'Opt-Out of future notifications:',
    info_saved: 'Options saved!',
    btn_save: 'Save',
    btn_close: 'Close',
    credits_developed: 'Extension developed by',
    credits_source: 'Source Code available in',
    credits_modified: 'Modified by',
    dialog_desc: 'Please add a URL to be exluded from being proxied. The available formats mentioned below. You can add multiple ones separated with a comma.',
    dialog_examples: 'Examples:',
    dialog_url: 'URL:',
    dialog_url_placeholder: 'URL to exclude',
    dialog_header: 'Bypass URL',
    dialog_ok: 'Add'
  },
  zh: {
    save_reminder: '编辑完成后请务必保存设置！',
    proxy_server_header: '代理服务器',
    proxy_server_desc: '以下部分包含单个代理服务器的配置信息。请确保服务器信息正确。',
    label_protocol: '协议：',
    label_host: '主机：',
    label_port: '端口：',
    label_autostart: '自动启动：',
    label_incognito: '仅无痕模式：',
    incognito_note: '仅对无痕窗口使用此代理设置。',
    exceptions_header: '例外',
    exceptions_desc: '可以将特定服务器排除在代理之外。',
    label_bypass: '绕过列表：',
    btn_add: '添加',
    btn_remove: '删除',
    btn_remove_all: '全部删除',
    misc_header: '其他',
    misc_desc: '如果你希望在此扩展有重大升级时收到通知，请确保下面的复选框未被勾选。你不会被打扰。',
    label_opt_out: '取消未来的通知：',
    info_saved: '选项已保存！',
    btn_save: '保存',
    btn_close: '关闭',
    credits_developed: '扩展由',
    credits_source: '源码可在',
    credits_modified: '修改由',
    dialog_desc: '请添加一个要从代理中排除的 URL。下面列出了可用的格式。你可以添加多个，用逗号分隔。',
    dialog_examples: '示例：',
    dialog_url: 'URL：',
    dialog_url_placeholder: '要排除的 URL',
    dialog_header: '绕过 URL',
    dialog_ok: '添加'
  }
};

/**
 * Whether the current browser UI language is Chinese.
 * @returns {boolean}
 */
function isChinese() {
  var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (var i = 0; i < langs.length; i++) {
    if (/^zh/i.test(langs[i])) {
      return true;
    }
  }
  return false;
}

/**
 * Returns the localized string for a key (Chinese when the browser is Chinese,
 * otherwise the English default).
 * @param {string} key
 * @returns {string}
 */
function t(key) {
  if (isChinese() && I18N.zh[key] !== undefined) {
    return I18N.zh[key];
  }
  return I18N.en[key] !== undefined ? I18N.en[key] : key;
}

/**
 * Applies translations to all elements marked with data-i18n (text) and
 * data-i18n-placeholder (input placeholder). No-op when not Chinese.
 */
function applyI18n() {
  if (!isChinese()) {
    return;
  }
  var nodes = document.querySelectorAll('[data-i18n]');
  for (var i = 0; i < nodes.length; i++) {
    var key = nodes[i].getAttribute('data-i18n');
    if (I18N.zh[key] !== undefined) {
      nodes[i].textContent = I18N.zh[key];
    }
  }
  var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  for (var j = 0; j < placeholders.length; j++) {
    var pkey = placeholders[j].getAttribute('data-i18n-placeholder');
    if (I18N.zh[pkey] !== undefined) {
      placeholders[j].setAttribute('placeholder', I18N.zh[pkey]);
    }
  }
}
