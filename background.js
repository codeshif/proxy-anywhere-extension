importScripts('js/settings.js', 'js/proxy_controller.js');

const proxyController = new ProxyController();
proxyController.init();

// On install: show the Options page.
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({ url: 'options.html' });
});

// Messages from the options page.
chrome.runtime.onMessage.addListener((msg) => {
  if (msg && msg.type === 'refresh-proxy') {
    proxyController.setProxyEnabled(proxyController.proxyStatus);
  }
});
