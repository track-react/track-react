import "./App.css";
import "../runtime/loggedFetch.ts";
//import { useEffect } from 'react';
//import { useRef } from 'react';
import Timeline from "./components/Timeline.tsx";
import { useState } from "react";

function App() {
  //let dataTest: object = {};//useRef({});

  const [events, setEvents] = useState([{source:"", type: "", payload: { url:"", status:0, duration:0 }}]);
  //useEffect(() => {
    window.addEventListener("message", (event) => {
      //console.log("entered if ");
      // console.log('looking for current property', event)
      if (event.data[0].source === "react-events") {
        console.log('this is the event.data', event.data);
        setEvents(event.data);
      }

      //console.log("this is the entire event", event);
      // console.log("this is console.log in app.tsx", event.data);
      // console.log('this is the fetch length', event.currentTarget.fetch.length);
    });
 // }, []);

  return (
    <>
      <div>React-Events!</div>
      <Timeline events={events}/>
    </>
  );
}

export default App;
