import './App.css';
import '../vite-plugin/runtime/retrieveFetchData.ts';
import { useEffect } from 'react';
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

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.retrieveFetchDataSource === 'react-events-devtool') {
        console.log('entered if');
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
    });
  }, []);

  return (
    <>
      <div>React-Events!</div>
      <Timeline events={events} />
    </>
  );
}

export default App;
