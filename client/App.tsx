
import './App.css';
// import { retrieveFetchData } from '../vite-plugin/runtime/retrieveFetchData.ts';
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

  // useEffect(() => {
  //   retrieveFetchData('https://jsonplaceholder.typicode.com/todos/1').then((res) => {
  //     console.log('this is the response from retrieveFeetchData:', res);
  //   });
  // }, []);

  useEffect(() => {
    console.log('Events state updated:', events);
  }, [events]);
  

  const handleMessage = (event: MessageEvent) => {
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
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <>
      <div>React-Events!</div>
      <Timeline events={events} />
    </>
  );
}

export default App;
