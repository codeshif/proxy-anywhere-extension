// Global Settings. Backed by chrome.storage.local (works in MV3 service worker).
settings = {
  KEYS: [
    'version', 'scheme', 'host', 'port',
    'autostart', 'incognito', 'bypass', 'proxy_active'
  ],

  async getAll() {
    const data = await chrome.storage.local.get(this.KEYS);
    const port = parseInt(data.port, 10);
    return {
      version: data.version,
      scheme: data.scheme || 'http',
      host: data.host || 'localhost',
      port: (data.port === undefined || data.port === null || data.port === '' || isNaN(port)) ? 8080 : port,
      autostart: data.autostart === true,
      incognito: data.incognito === true,
      bypass: data.bypass || ['<local>'],
      proxy_active: data.proxy_active === true
    };
  },

  async save(partial) {
    await chrome.storage.local.set(partial);
  }
};
