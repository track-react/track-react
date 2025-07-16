let devtoolsPort = null;

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'devtools') {
    console.log('[Background] DevTools connected');
    devtoolsPort = port;

    port.onDisconnect.addListener(() => {
      console.log('[Background] DevTools disconnected');
      devtoolsPort = null;
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'WINDOW_MESSAGE') {
    console.log('[Background] Got message from content script:', message.data);

    if (devtoolsPort) {
      devtoolsPort.postMessage(message.data);
      sendResponse({ status: 'sent to devtools' });
    } else {
      console.warn('[Background] No devtoolsPort connected');
      sendResponse({ error: 'no devtools panel connected' });
    }
  }
});