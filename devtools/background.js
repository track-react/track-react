let devtoolsPort = null;

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'react-events-bridge') {
    devtoolsPort = port;

    port.onDisconnect.addListener(() => {
      devtoolsPort = null;
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (devtoolsPort) {
    console.log('2. FROM BACKGROUND SCRIPT: message: ', message);
    devtoolsPort.postMessage(message);
  }
});
