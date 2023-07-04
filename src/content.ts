import browser from 'webextension-polyfill';
const path = '/inject.js';
const script = document.createElement('script');
script.type = 'module';
script.src = browser.runtime.getURL(path);
document.head.append(script);
