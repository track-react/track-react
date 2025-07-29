
import './App.css';
// import { retrieveFetchData } from '../vite-plugin/runtime/retrieveFetchData.ts';
import { useEffect } from 'react';
//import { useRef } from 'react';
import Timeline from './components/Timeline.tsx';
import { useState } from 'react';

type EventType = {
  source: string;
  type: string;
  method?: string;
  url?: string;
  start: number;
  duration: number;
  status?: number;
  responseOK: boolean;
  json?: unknown; //string[] | null;
  error?: string | null;
  label?: string;
  location?: string;
};

function App() {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const port = chrome.runtime.connect({ name: 'track-react-bridge' });

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
          error: message.error,
          label: message.label,
          location: message.location,
        },
      ]);
    });

    return () => port.disconnect();
  }, []);

  return (
    <>
      <Timeline events={events} />
    </>
  );
}

export default App;
