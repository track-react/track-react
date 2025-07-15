console.log('retrieveFetchData file!');

// setTimeout(() => {
//   window.postMessage(
    
//       {
//         retrieveFetchDataSource: 'react-events-devtool',
//         retrieveFetchDataType: 'fetch-event',
//         retrieveFetchDataUrl: 'www.parker.com',
//         retrieveFetchDataStart: '0020',
//         retrieveFetchDataDuration: '0020',
//         retrieveFetchDataResponseStatus: 200,
//         retrieveFetchDataResponseOk: 'ok',
//         retrieveFetchDataJson: [{ prop: 'stuff'}]
//       }
//       {
//         retrieveFetchDataSource: 'react-events-devtool',
//         retrieveFetchDataType: 'useEffect',
//         retrieveFetchDataUrl: 'www.emily.com',
//         retrieveFetchDataStart: '0020',
//         retrieveFetchDataDuration: '0020',
//         retrieveFetchDataResponseStatus: 200,
//         retrieveFetchDataResponseOk: 'ok',
//         retrieveFetchDataJson: [{ prop: 'stuff'}]
//       },
//       {
//         retrieveFetchDataSource: 'react-events-devtool',
//         retrieveFetchDataType: 'useCallback',
//         retrieveFetchDataUrl: 'www.pedro.com',
//         retrieveFetchDataStart: '0020',
//         retrieveFetchDataDuration: '0020',
//         retrieveFetchDataResponseStatus: 200,
//         retrieveFetchDataResponseOk: 'ok',
//         retrieveFetchDataJson: [{ prop: 'stuff'}]
//       },
//     ,
//     '*'
//   );
// }, 1000);

export async function retrieveFetchData(...args) {
  const retrieveFetchDataStart = performance.now();
  const retrieveFetchDataResponse = await fetch(...args);
  const retrieveFetchDataDuration = performance.now() - retrieveFetchDataStart;
  const retrieveFetchDataCloned = retrieveFetchDataResponse.clone();
  const retrieveFetchDataUrl = retrieveFetchDataResponse.url;
  let json;
  try {
    json = await retrieveFetchDataCloned.json();
  } catch (e) {
    json = null;
  }
  window.postMessage(
    {
      retrieveFetchDataSource: 'react-events-devtool',
      retrieveFetchDataType: 'fetch-event',
      retrieveFetchDataUrl,
      retrieveFetchDataStart,
      retrieveFetchDataDuration,
      retrieveFetchDataResponseStatus: retrieveFetchDataResponse.status,
      retrieveFetchDataResponseOk: retrieveFetchDataResponse.ok,
      json,
    },
    '*'
  );
  return retrieveFetchDataResponse;
}
