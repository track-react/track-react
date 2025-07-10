import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import WorkIcon from '@mui/icons-material/Work';
//import SchoolIcon from "@mui/icons-material/School";
//import StarIcon from "@mui/icons-material/Star";

import 'react-vertical-timeline-component/style.min.css';

import '../App.css';

type TimelineProps = {
  dataTest: { 
    source: string;
    type: string;
    payload: {
      url: string;
      duration: number;
      status: number;
    }
     };
};

function Timeline({ dataTest }: TimelineProps) {
  console.log('dataTest in timeline', dataTest);
  return (
    <>
      <VerticalTimeline>
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date='2011 - present'
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<WorkIcon />}
        >
          <h3 className='vertical-timeline-element-title'>{dataTest.source}</h3>
          <h4 className='vertical-timeline-element-subtitle'>{dataTest.type}</h4>
          <h3>{dataTest.payload.url}</h3>
          <p>
            Creative Direction, User Experience, Visual Design, Project
            Management, Team Leading
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </>
  );
}

export default Timeline;
