let devtoolsPort = null;

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'track-react-bridge') {
    devtoolsPort = port;

    port.onDisconnect.addListener(() => {
      devtoolsPort = null;
    });

    port.onMessage.addListener((msg) => {
      if (msg.type === 'ping') return; // no-op
      console.log('[Background] Received from DevTools:', msg);
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (devtoolsPort) {
    console.log('2. FROM BACKGROUND SCRIPT: message: ', message);
    devtoolsPort.postMessage(message);
  }
});



