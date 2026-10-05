Proxy Anywhere Extension
=====================================

[English](#english) | [简体中文](#chinese)

<a id="english"></a>

## English

This Google Chrome extension allows you to enter a custom proxy server to Chrome.
With a click of a button, you can switch to your custom proxy, or back to normal.

### How does it work?

It uses the Google Chrome Extension API to interact with the Proxy server.
You setup your information in the options (host, port, and scheme), and once
you click on the button, it toggles the proxy status.

### How do you install?

Note, this is still beta development, and might break in future Chrome releases.

 1. Clone this repository:

        git clone https://github.com/codeshif/proxy-anywhere-extension

 2. Open Chrome and go to `chrome://extensions`.
 3. Turn on "Developer mode" (the toggle in the top-right corner).
 4. Click "Load unpacked" and select the directory you cloned in step 1.

Enjoy! Please submit your pull requests if you have anything interesting!

### Modifications

This fork contains the following changes on top of the original extension:

 1. **Manifest V3 migration.** The background page (`background.html`) was
    replaced by a service worker (`background.js`); `chrome.browserAction`
    was replaced by `chrome.action`; and settings storage moved from
    `localStorage` to `chrome.storage.local` (see `js/settings.js`).
 2. **CSP fix.** The inline `onsubmit` handler in `options.html` was removed
    (it violated the MV3 `script-src 'self'` Content Security Policy) and is
    now bound from `js/options.js`.
 3. **Enter key saves.** Pressing Enter in any field on the options page now
    triggers the Save action instead of opening the "Bypass URL" dialog.
 4. **Simplified Chinese (i18n).** When the browser UI language is Chinese
    (`zh*`), all options-page text is shown in Simplified Chinese; otherwise
    the English defaults are kept. See `js/i18n.js`.
 5. **UTF-8 charset.** Added `<meta charset="utf-8">` to `options.html` to
    fix garbled Chinese text.
 6. **UI tweaks.** Removed the "Visit extension page", "File bugs and
    suggestions" and Twitter links from the top of the options page, and added
    a "Modified by codeshif" credit at the bottom. The "Proxy Anywhere" title
    is kept in English (not translated).

### Screenshots

![Screenshot of the Chrome Extension](https://github.com/mohamedmansour/proxy-anywhere-extension/raw/master/screenshot/proxy_screenshot.png)
![Screenshot of the Chrome Extension](https://github.com/mohamedmansour/proxy-anywhere-extension/raw/master/screenshot/proxy_screenshot_bypass.png)

<a id="chinese"></a>

## 简体中文

这个 Google Chrome 扩展可以让你为 Chrome 配置一个自定义代理服务器。
只需点击一下按钮，即可切换到你的自定义代理，或恢复为正常网络。

### 它是如何工作的？

它使用 Google Chrome 扩展 API 与代理服务器交互。
你在选项里填写相关信息（主机、端口和协议），然后点击按钮即可切换代理状态。

### 如何安装？

注意，这仍处于测试开发阶段，可能会在未来的 Chrome 版本中失效。

 1. 克隆本仓库：

        git clone https://github.com/codeshif/proxy-anywhere-extension

 2. 打开 Chrome，进入 `chrome://extensions`。
 3. 开启"开发者模式"（右上角的开关）。
 4. 点击"加载已解压的扩展程序"，并选择第 1 步中克隆的目录。

开始使用吧！如果你有任何有趣的改进，欢迎提交 Pull Request！

### 修改内容

这个分支在原始扩展的基础上做了以下修改：

 1. **迁移到 Manifest V3。** 后台页面（`background.html`）被替换为
    Service Worker（`background.js`）；`chrome.browserAction` 被替换为
    `chrome.action`；设置存储从 `localStorage` 迁移到 `chrome.storage.local`
    （见 `js/settings.js`）。
 2. **CSP 修复。** 移除了 `options.html` 中的内联 `onsubmit` 处理函数
    （它违反了 MV3 的 `script-src 'self'` 内容安全策略），改为在
    `js/options.js` 中绑定。
 3. **Enter 键保存。** 在选项页面的任意输入框中按 Enter 现在会触发保存操作，
    而不是弹出"Bypass URL"对话框。
 4. **简体中文（i18n）。** 当浏览器界面语言为中文（`zh*`）时，选项页面的
    所有文字都会显示为简体中文；否则保持英文默认值。见 `js/i18n.js`。
 5. **UTF-8 字符集。** 在 `options.html` 中添加了 `<meta charset="utf-8">`，
    以修复中文乱码问题。
 6. **界面调整。** 移除了选项页面顶部的"Visit extension page"、"File bugs and
    suggestions"和 Twitter 链接，并在底部添加了"Modified by codeshif"署名。
    "Proxy Anywhere"标题保持英文（不翻译）。

### 截图

![Screenshot of the Chrome Extension](https://github.com/mohamedmansour/proxy-anywhere-extension/raw/master/screenshot/proxy_screenshot.png)
![Screenshot of the Chrome Extension](https://github.com/mohamedmansour/proxy-anywhere-extension/raw/master/screenshot/proxy_screenshot_bypass.png)
