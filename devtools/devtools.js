chrome.devtools.panels.create(
  'ReactEvents',
  '', //insert src image here
  '../index.html',
  function (panel) {
    console.log('ReactEvent DevTools panel has been created! Yay!');
  }
);

// Set up connection to background script
const port = chrome.runtime.connect({ name: 'react-events-bridge' });

console.log('[ReactEvents] DevTools panel connected to background script');

// Listen for messages coming from background.js
port.onMessage.addListener((message) => {
  console.log('3. FROM DEVTOOLS.JS: message: ', message);

  // Forward to your React app if it's listening to window.postMessage
  window.parent.postMessage(message, '*');
});
