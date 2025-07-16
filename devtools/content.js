window.addEventListener('message', (event) => {
  if (event.source !== window) return;

  if (event.data?.source === 'react-events-plugin') {
    chrome.runtime.sendMessage(event);
  }
});
