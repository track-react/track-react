import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
    const isSuccess = el.responseOK;
    console.log('Http METHOD!!!!', el.method);
    const jsonString = JSON.stringify(el.json);

    // Helper function to truncate long strings for grid display
    const truncateText = (text: string | number, maxLen: number = 30) => {
      const str = String(text);
      return str.length > maxLen ? str.substring(0, maxLen) + '...' : str;
    };

    return (
      <VerticalTimelineElement
        key={`${el.url}-${i}`}
        className={`vertical-timeline-element--work devtools-element`}
        contentStyle={{}}
        contentArrowStyle={{}}
        iconStyle={{}}
        iconClassName={
          isSuccess ? 'devtools-icon-success' : 'devtools-icon-error'
        }
        icon={<AccessTimeIcon />}
      >
        <div
          className={`devtools-content ${
            isSuccess ? 'devtools-content-success' : 'devtools-content-error'
          }`}
        >
          <div
            className={`devtools-header ${
              isSuccess ? 'devtools-header-success' : 'devtools-header-error'
            }`}
          >
            <span
              className={`devtools-method ${
                isSuccess ? 'devtools-method-success' : 'devtools-method-error'
              }`}
            >
              {el.method}
            </span>{' '}
            {el.url}
          </div>

          <div className="devtools-grid">
            <span className="devtools-label">Source:</span>
            <span title={el.source}>{truncateText(el.source)}</span>

            <span className="devtools-label">Type:</span>
            <span title={el.type}>{truncateText(el.type)}</span>

            <span className="devtools-label">Status:</span>
            <span
              className={
                isSuccess ? 'devtools-status-success' : 'devtools-status-error'
              }
              title={String(el.status || 'n/a')}
            >
              {truncateText(el.status || 'n/a')}
            </span>

            <span className="devtools-label">Duration:</span>
            <span title={`${el.duration} ms`}>
              {truncateText(`${el.duration} ms`)}
            </span>

            <span className="devtools-label">Start:</span>
            <span title={String(el.start)}>{truncateText(el.start)}</span>
          </div>

          {jsonString && (
            <details className="devtools-json-summary">
              <summary>Response Data</summary>
              <pre className="devtools-json-content">{jsonString}</pre>
            </details>
          )}

          <div className="devtools-button-container">
            <button className="mini ui button devtools-secondary">
              More Info
            </button>
            <button className="mini ui button devtools-primary">Ask AI</button>
          </div>
        </div>
      </VerticalTimelineElement>
    );
  });

  return (
    <div className="devtools-timeline-container">
      <VerticalTimeline lineColor="#E8EAED">
        {verticalTimelineElements}
      </VerticalTimeline>
    </div>
  );
}
export default Timeline;
