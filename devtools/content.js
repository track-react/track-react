window.addEventListener('message', (event) => {
  if (event.source !== window) return;

  if (event.data?.retrieveFetchDataSource === 'react-events-devtool') {
    chrome.runtime.sendMessage(event);
  }
});
