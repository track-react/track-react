// This file must be imported somewhere in the user’s code (or injected automatically by your plugin if possible).

export async function retrieveFetchData(...args: Parameters<typeof fetch>) {
  console.log('Entering retrieveFetchData');
  const url = args[0]; // url will always be the first arg in the array
  let method;
  if (args[1] && args[1].method) {
    method = args[1]?.method;
  } else {
    method = 'GET';
  }
  
  const start = performance.now();
  let res = null;
  let clone;
  let status;
  let responseOk;
  try {
    res = await fetch(...args);
    clone = res.clone();
    status = res.status;
    responseOk = res.ok;
  } catch (e) {
    console.log('[ERROR] getting fetch response retrieveFetch data', e);
    responseOk = false;
    if (e && typeof e === 'object' && 'status' in e) {
      status = e.status ? e.status : null;
    } else {
      status = null;
    }
  }
  console.log('[res] from fetchPlugin', res);
  const duration = performance.now() - start;
  let json; // will be reassigned a value in the try/catch block
  try {
    if (clone) {
      json = await clone.json();
    } else {
      json = null;
    }
  } catch (e) {
    console.log('[ERROR] caught in PLUGIN retrieveFetchData: ', e);
    json = null;
  }
  console.log('Fetch has been transformed from retrieveFetchData'); //successfully transformed fetch
  window.postMessage(
    //sending updated properties to window object
    {
      source: 'track-react-plugin',
      type: 'fetch-event',
      method, //'fetch-event',
      url,
      start,
      duration,
      status,
      responseOk,
      json: json,
    },
    '*'
  );
  return res;
}
