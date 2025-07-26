export async function retrieveAwaitData<T>(
  promise: Promise<T>,
  label: string = 'await',
  location: string = 'unknown'
): Promise<T> {
  console.log('Entering retrieveAwaitData');
  console.log(`Label: ${label}, Location: ${location}`);

  const start = performance.now();
  let result: T | null = null;
  let responseOk = true;
  let errorMessage: string | null = null;

  try {
    console.log('[retrieveAwaitData] is trying!');
    result = await promise;
  } catch (e) {
    console.log('[ERROR] caught in PLUGIN retrieveAwaitData: ', e);
    responseOk = false;
    errorMessage = e instanceof Error ? e.message: String(e);
  }

  const duration = performance.now() - start;
  
  window.postMessage(
    {
      source: 'react-events-plugin',
      type: 'await-event',
      label,
      location,
      start,
      duration,
      responseOk,
      error: errorMessage,
      result,
    },
    '*'
  );
  return result;
}
