import './App.css';
import { useEffect } from 'react';
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
  json?: unknown;
  error?: string | null;
  label?: string;
  location?: string;
  dependencies?: [];
  hasCleanup?: boolean;
};

function App() {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const port = chrome.runtime.connect({ name: 'track-react-bridge' });

    port.onMessage.addListener((message) => {
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
          dependencies: message.dependencies,
          hasCleanup: message.hasCleanup,
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
