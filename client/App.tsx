import "./App.css";
import "../runtime/loggedFetch.ts";
import { useEffect } from "react";
import Timeline from "./components/Timeline.tsx";

function App() {
  useEffect(() => {
    window.addEventListener("message", (event) => {
      //console.log("entered if ");
      if (event.data.source === "react-events") {
        console.log(event.data);
        console.log("this is the source", event.data.source);
      }

      //console.log("this is the entire event", event);
      // console.log("this is console.log in app.tsx", event.data);
      // console.log('this is the fetch length', event.currentTarget.fetch.length);
    });
  }, []);

  return (
    <>
      <div>React-Events!</div>
      <Timeline />
    </>
  );
}

export default App;
