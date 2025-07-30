window.addEventListener('message', (event) => {
  if (event.source !== window) return;

  if (event.data?.source === 'track-react-plugin') {
    chrome.runtime.sendMessage(event.data);
  }
});
