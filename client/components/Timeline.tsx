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
    url: string;
    start: number;
    duration: number;
    status: number;
    responseOK: boolean;
    json: unknown; //string[] | null ;
  }[];
};

function Timeline({ events }: TimelineProps) {
  const verticalTimelineElements = events.map((el) => {
    return (
      <VerticalTimelineElement
        className='vertical-timeline-element--work'
        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<StarPurple500 />}
      >
        <h3 className=''>Source: {el.source}</h3>
        <h4 className=''>Type: {el.type}</h4>
        <h4>URL: {el.url}</h4>
        <h4>Start: {el.start}</h4>
        <h4>Duration: {el.duration}</h4>
        <h4>Status: {el.status}</h4>
        <h4>ResponseOK: {JSON.stringify(el.responseOK)}</h4>
        <h4>JSON: {JSON.stringify(el.json)}</h4>
        <button className='mini ui button'>More Info</button>
        <button className='mini ui button'>Ask AI</button>
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
