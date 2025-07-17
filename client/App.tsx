import './App.css';
import '../vite-plugin/runtime/retrieveFetchData.ts';
import { useEffect } from 'react';
//import { useRef } from 'react';
import Timeline from './components/Timeline.tsx';
import { useState } from 'react';

type EventType = {
  source: string;
  type: string;
  method: string;
  url: string;
  start: number;
  duration: number;
  status: number;
  responseOK: boolean;
  json: unknown; //string[] | null;
};

function App() {
  const [events, setEvents] = useState<EventType[]>([]);

  // useEffect(() => {
  //   window.addEventListener('message', (event) => {
  //     console.log('5. DATA CAUGHT IN APP.TSX', event.data);
  //     if (event.data.source === 'react-events-plugin') {
  //       console.log('data caught in app.tsx!!', event.data);
  //       console.log('entered if');
  //       setEvents((prev) => {
  //         return [
  //           ...prev,
  //           {
  //             source: event.data.source,
  //             type: event.data.type,
  //             url: event.data.url,
  //             start: event.data.start,
  //             duration: event.data.duration,
  //             status: event.data.status,
  //             responseOK: event.data.responseOk,
  //             json: event.data.json,
  //           },
  //         ];
  //       });
  //     }
  //   });
  // }, []);
  useEffect(() => {
    const port = chrome.runtime.connect({ name: 'react-events-bridge' });

    port.onMessage.addListener((message) => {
      console.log('✅ Message received in React panel:', message);
      console.log(' TYPE OF JSON: ', typeof message.json);
      setEvents((prev) => [
        ...prev,
        {
          source: message.source,
          type: message.type,
          method: message.method,
          url: message.url,
          start: message.start,
          duration: message.duration,
          status: message.status,
          responseOK: message.responseOk,
          json: message.json,
        },
      ]);
    });

    return () => port.disconnect();
  }, []);

  return (
    <>
      <div>React-Events!</div>
      <Timeline events={events} />
    </>
  );
}

export default App;
