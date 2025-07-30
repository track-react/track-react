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
    method?: string;
    url?: string;
    start: number;
    duration: number;
    status?: number;
    responseOK: boolean;
    json?: unknown; //string[] | null ;
    error?: string | null;
    label?: string;
    location?: string;
    dependencies?: [];
    hasCleanup?: boolean;
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

    // Helper function to render header content based on type
    const renderHeaderContent = (element: typeof el, success: boolean) => {
      if (element.type === 'fetch-event') {
        return (
          <>
            <span
              className={`devtools-method ${
                success ? 'devtools-method-success' : 'devtools-method-error'
              }`}
            >
              {element.method}
            </span>{' '}
            {element.url}
          </>
        );
      }
      switch (element.type) {
        case 'await-event':
          return 'Await-Event';
        case 'error':
          return `Error Event: ${element.source}`;
        default:
          return `${element.type} Event`;
      }
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
            {renderHeaderContent(el, isSuccess)}
          </div>

          <div className='devtools-grid'>
            <span className='devtools-label'>Source:</span>
            <span title={el.source}>{truncateText(el.source)}</span>

            <span className='devtools-label'>Type:</span>
            <span title={el.type}>{truncateText(el.type)}</span>

            <span className='devtools-label'>Status:</span>
            <span
              className={
                isSuccess ? 'devtools-status-success' : 'devtools-status-error'
              }
              title={String(el.status || 'n/a')}
            >
              {truncateText(el.status || 'n/a')}
            </span>

            <span className='devtools-label'>Duration:</span>
            <span title={`${el.duration} ms`}>
              {truncateText(`${el.duration} ms`)}
            </span>

            <span className='devtools-label'>Start:</span>
            <span title={String(el.start)}>{truncateText(el.start)}</span>
            {el.label && (
              <>
                <span className='devtools-label'>Label:</span>
                <span title={el.label}>{truncateText(el.label)}</span>
              </>
            )}

            {el.location && (
              <>
                <span className='devtools-label'>Location:</span>
                <span title={el.location}>{truncateText(el.location)}</span>
              </>
            )}

            {el.hasCleanup && (
              <>
                <span className='devtools-label'>Has Cleanup Function:</span>
                <span title='hasCleanup'>{el.hasCleanup.toString()}</span>
              </>
            )}

            {el.error && (
              <>
                <span className='devtools-label'>Error:</span>
                <span
                  className='devtools-status-error'
                  title={el.error}
                >
                  {truncateText(el.error)}
                </span>
              </>
            )}
          </div>
          {el.dependencies && (
            <details className='devtools-json-summary'>
              <summary>Dependencies</summary>
              <pre className='devtools-json-content'>{el.dependencies}</pre>
            </details>
          )}
          {jsonString && (
            <details className='devtools-json-summary'>
              <summary>Response Data</summary>
              <pre className='devtools-json-content'>{jsonString}</pre>
            </details>
          )}

          <div className='devtools-button-container'>
            <button className='mini ui button devtools-secondary'>
              More Info
            </button>
            <button className='mini ui button devtools-primary'>Ask AI</button>
          </div>
        </div>
      </VerticalTimelineElement>
    );
  });

  return (
    <div className='devtools-timeline-container'>
      <VerticalTimeline lineColor='#E8EAED'>
        {verticalTimelineElements}
      </VerticalTimeline>
    </div>
  );
}
export default Timeline;
