import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

// import WorkIcon from '@mui/icons-material/Work';
//import SchoolIcon from "@mui/icons-material/School";
import StarPurple500 from '@mui/icons-material/Star';

import 'react-vertical-timeline-component/style.min.css';

import '../App.css';

type TimelineProps = {
  events: {
    source: string;
    type: string;
    method: string;
    url: string;
    start: number;
    duration: number;
    status: number;
    responseOK: boolean;
    json: unknown; //string[] | null ;
  }[];
};

function Timeline({ events }: TimelineProps) {
  const verticalTimelineElements = events.map((el, i) => {
    const color = el.responseOK ? 'rgb(33, 150, 243)' : '#fc4040';
    const maxLength = 200;

    let jsonString = JSON.stringify(el.json);
    if (JSON.stringify(el.json).length > maxLength) {
      jsonString = jsonString.substring(0, maxLength);
    }

    // const jsonString = JSON.stringify(el.json)
    return (
      <VerticalTimelineElement
        key={`${el.url}-${i}`}
        className='vertical-timeline-element--work'
        contentStyle={{
          background: color,
          color: '#fff',
        }}
        contentArrowStyle={{ borderRight: '7px solid', color }}
        iconStyle={{
          background: color,
          color: '#fff',
        }}
        icon={<StarPurple500 />}
      >
        <h3 className=''>Source: {el.source}</h3>
        <h4 className=''>Type: {el.type}</h4>
        <h4>HTTP Method: {el.method }</h4>
        <h4 style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
          URL: {el.url}
        </h4>
        <h4>Start: {el.start}</h4>
        <h4>Duration: {el.duration} ms</h4>
        <h4>Status: {el.status ? el.status : 'n/a'}</h4>
        <h4>ResponseOK: {JSON.stringify(el.responseOK)}</h4>
        <h4 style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
          JSON: {jsonString}
        </h4>
        <button className='mini ui button'>More Info</button>
        <button
          className='mini ui button'
          style={{ marginLeft: '10px', marginBottom: '10px' }}
        >
          Ask AI
        </button>
      </VerticalTimelineElement>
    );
  });
  return (
    <>
      <VerticalTimeline>{verticalTimelineElements}</VerticalTimeline>
    </>
  );
}

export default Timeline;
