chrome.devtools.panels.create(
  'Track-React',
  '', //insert src image here
  '../index.html',
  function (panel) {
    console.log('track-react DevTools panel has been created! Yay!');
  }
);

// Set up connection to background script
const port = chrome.runtime.connect({ name: 'track-react-bridge' });

//We need this setInterval because it "pings" the chrome runtime event listener --> keeping it active
  //Without it, the chrome extension will unload all the data and become unresponsive
setInterval(() => {
  port.postMessage({ type: 'ping' });
}, 10000)

// Listen for messages coming from background.js
port.onMessage.addListener((message) => {

  // Forward to your React app if it's listening to window.postMessage
  window.parent.postMessage(message, '*');
});
