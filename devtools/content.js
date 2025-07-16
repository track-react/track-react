window.addEventListener('message', (event) => {
  if (event.source !== window) return;

  if (event.data?.source === 'react-events-plugin') {
    console.log('1. FROM CONTENT SCRIPT event.data: ', event.data);
    chrome.runtime.sendMessage(event.data);
  }
});
