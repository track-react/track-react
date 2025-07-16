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
      if (event.data.source === 'react-events-plugin') {
        console.log('entered if');
        setEvents((prev) => {
          return [
            ...prev,
            {
              source: event.data.source,
              type: event.data.type,
              url: event.data.url,
              start: event.data.start,
              duration: event.data.duration,
              status: event.data.status,
              responseOK: event.data.responseOk,
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
