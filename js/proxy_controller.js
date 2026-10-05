/**
 * Controls the state of the current proxy being used by Chrome.
 *
 * @constructor
 */
ProxyController = function()
{
  // Global status that states if the custom proxy is set.
  this.proxyStatus = false;

  // Listen on Action clicks.
  chrome.action.onClicked.addListener(this.onBrowserActionClicked.bind(this));

  // Listen on Proxy Errors.
  chrome.proxy.onProxyError.addListener(this.onProxyError.bind(this));
};

ProxyController.ONLINE_ICON = '/img/online.png';
ProxyController.OFFLINE_ICON = '/img/offline.png';
ProxyController.ERROR_ICON = '/img/error.png';

/**
 * To know the status when the custom proxy server is active or online.
 *
 * @returns {boolean} true if custom proxy is set and active.
 */
ProxyController.prototype.isProxyActive = function()
{
  return this.proxyStatus;
};

/**
 * Action button on the Chrome toolbar that has been clicked.
 * Toggle behaviour.
 */
ProxyController.prototype.onBrowserActionClicked = function()
{
  this.setProxyEnabled(!this.proxyStatus);
};

/**
 * Notifies about proxy errors.
 *
 * @param {Object} details Gives the state of the error.
 */
ProxyController.prototype.onProxyError = function(details)
{
  chrome.action.setIcon({ path: ProxyController.ERROR_ICON });
  chrome.action.setTitle({ title: details.error });
};

/**
 * Initialize the proxy.
 */
ProxyController.prototype.init = async function()
{
  const s = await settings.getAll();

  // Restore in-memory state (service worker may have been restarted).
  this.proxyStatus = s.proxy_active;

  // Re-assert the proxy configuration: use the saved state if the proxy was
  // already active, otherwise honour the autostart setting.
  await this.setProxyEnabled(s.proxy_active || s.autostart);
};

/**
 * Sets the current proxy server.
 *
 * @param {boolean} status_ True to turn it on, otherwise use the auto_detect
 *                          option to bring it back to normal.
 */
ProxyController.prototype.setProxyEnabled = async function(status_)
{
  this.proxyStatus = status_;

  const s = await settings.getAll();

  // An object encapsulating a complete proxy configuration.
  const config = {
    mode: status_ ? 'fixed_servers' : 'auto_detect',
    rules: {
      singleProxy: {
        scheme: s.scheme,
        host: s.host,
        port: s.port
      },
      bypassList: s.bypass
    }
  };

  // Describes the current proxy setting being used.
  const proxySettings = {
    'value': config,
    'scope': s.incognito ? 'incognito_persistent' : 'regular'
  };

  // Clear settings for both windows.
  await chrome.proxy.settings.clear({ scope: 'incognito_persistent' });
  await chrome.proxy.settings.clear({ scope: 'regular' });

  // Setup new settings for the appropriate window.
  await chrome.proxy.settings.set(proxySettings);

  // Persist the status so it survives service worker restarts.
  await settings.save({ proxy_active: status_ });

  // Change the icon to reflect the current status of the proxy server.
  chrome.action.setIcon({ path: status_ ? ProxyController.ONLINE_ICON : ProxyController.OFFLINE_ICON });
  chrome.action.setTitle({ title: status_ ? 'Online' : 'Offline' });
};
