// This file must be imported somewhere in the user’s code (or injected automatically by your plugin if possible).
console.log('is this getting run');

setTimeout(() => {
  window.postMessage(
    {
      source: 'react-events-plugin',
      type: 'fetch-event',
      url: 'www.parker.com',
      start: '0020',
      duration: '0020',
      status: 200,
      responseOk: 'ok',
      json: [{ prop: 'stuff' }],
    },
    // {
    //   retrieveFetchDataSource: 'react-events-devtool',
    //   retrieveFetchDataType: 'useEffect',
    //   url: 'www.emily.com',
    //   retrieveFetchDataStart: '0020',
    //   duration: '0020',
    //   retrieveFetchDataResponseStatus: 200,
    //   retrieveFetchDataResponseOk: 'ok',
    //   retrieveFetchDataJson: [{ prop: 'stuff'}]
    // },
    // {
    //   retrieveFetchDataSource: 'react-events-devtool',
    //   retrieveFetchDataType: 'useCallback',
    //   url: 'www.pedro.com',
    //   retrieveFetchDataStart: '0020',
    //   duration: '0020',
    //   retrieveFetchDataResponseStatus: 200,
    //   retrieveFetchDataResponseOk: 'ok',
    //   retrieveFetchDataJson: [{ prop: 'stuff'}]
    // },
    '*'
  );
}, 1000);

export async function retrieveFetchData(...args: Parameters<typeof fetch>) {
  const start = performance.now();
  const res = await fetch(...args);
  const duration = performance.now() - start;
  const clone = res.clone();
  const url = res.url;
  let json;
  try {
    json = await clone.json();
  } catch (e) {
    console.log('error from json try/catch', e);
    json = null;
  }
  console.log('fetch transformed from retrieveFetchData:');
  console.log('retrieveFetchDataUrl', retrieveFetchDataUrl);
  console.log('json', json);
  //setTimeout(() => {
  window.postMessage(
    {
      source: 'react-events-plugin',
      type: 'fetch-event',
      url,
      start: start,
      duration,
      status: res.status,
      responseOk: res.ok,
      json,
    },
    '*'
  );
  return res;
}
