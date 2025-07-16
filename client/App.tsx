
import './App.css';
// import { retrieveFetchData } from '../vite-plugin/runtime/retrieveFetchData.ts';
import { useEffect, useCallback } from 'react';
//import { useRef } from 'react';
import Timeline from './components/Timeline.tsx';
import { useState } from 'react';

type EventType = {
  source: string;
  type: string;
  url: string;
  start: number;
  duration: number;
  status: number;
  responseOK: boolean;
  json: unknown;
};

function App() {
  const [events, setEvents] = useState<EventType[]>([]);

  // useEffect(() => {
  //   retrieveFetchData('https://jsonplaceholder.typicode.com/todos/1').then(
  //     (res) => {
  //       console.log('this is the response from retrieveFeetchData:', res);
  //     }
  //   );
  // }, []);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      {
        console.log('event listener triggered');
        console.log('event.data', event.data);
        console.log('events array use state', events);
        if (event.data.retrieveFetchDataSource === 'react-events-devtool') {
          console.log('event listener caught fetch event');
          setEvents((prev) => {
            return [
              ...prev,
              {
                source: event.data.retrieveFetchDataSource,
                type: event.data.retrieveFetchDataType,
                url: event.data.retrieveFetchDataUrl,
                start: event.data.retrieveFetchDataStart,
                duration: event.data.retrieveFetchDataDuration,
                status: event.data.retrieveFetchDataResponseStatus,
                responseOK: event.data.retrieveFetchDataResponseOk,
                json: event.data.json,
              },
            ];
          });
        }
      }
    },
    [events]
  );

  useEffect(() => {
    function sendToChrome() {
      console.log('[ENTERED SENDTOCHROME()!!!!!!]');

      // Store the listener function so we can remove it later
      const messageHandler = (event: MessageEvent) => {
        console.log('Inside windowMessage', event.data);

        // Send the message data to Chrome extension
        chrome.runtime
          .sendMessage({
            type: 'WINDOW_MESSAGE',
            data: event.data,
          })
          .then((response) => {
            console.log('[CHROME RELAY RESPONSE]', response);
          })
          .catch((error) => {
            console.error('[CHROME RELAY ERROR]', error);
          });
      };

      // Listen for window messages and forward them to Chrome extension
      window.addEventListener('message', messageHandler);

      // Listen for messages from Chrome extension
      chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
        console.log('[CHROME RUNTIME LISTENER]', message);
        handleMessage(message);

        // Optionally send a response back
        sendResponse({ received: true });
      });

      // Return cleanup function
      return () => {
        window.removeEventListener('message', messageHandler);
      };
    }

    const cleanup = sendToChrome();

    return cleanup;
  }, [handleMessage]);

  return (
    <>
      <div>React-Events!</div>
      <Timeline events={events} />
    </>
  );
}

export default App;
