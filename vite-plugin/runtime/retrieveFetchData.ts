export async function retrieveFetchData(
  ...args: [...Parameters<typeof fetch>, string, string] // fetch args + label + location
) {
  // Pop off the last two args (added by the Babel plugin)
  const location = args.pop(); // last one
  const label = args.pop(); // second-to-last one

  console.log('Entering retrieveFetchData');
  console.log('[label]', label);
  console.log('[location]', location);

  const url = args[0];
  const method = args[1]?.method ?? 'GET';

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
    console.log('[ERROR] retrieveFetchData error', e);
    responseOk = false;
    status = e?.status ?? null;
  }

  const duration = performance.now() - start;

  let json;
  try {
    json = clone ? await clone.json() : null;
  } catch (e) {
    console.log('[ERROR] parsing JSON in retrieveFetchData:', e);
    json = null;
  }

  console.log('Fetch transformed by retrieveFetchData');
  window.postMessage(
    {
      source: 'track-react-plugin',
      type: 'fetch-event',
      method,
      url,
      start,
      duration,
      status,
      responseOk,
      json,
      label,
      location,
    },
    '*'
  );

  return res;
}

