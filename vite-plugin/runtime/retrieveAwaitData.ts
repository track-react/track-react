export function retrieveAwaitData<T>(
  promise: Promise<T>,
  label = 'await',
  location = 'unknown'
): Promise<T> {
  console.log('Entering retrieveAwaitData');
  console.log(`Label: ${label}, Location: ${location}`);

  const start = performance.now();
  let responseOk = true;
  let errorMessage: string | null = null;

  console.log('[retrieveAwaitData] is trying!');

  return promise.then(result => {
    let safeResultPromise;

    if (result instanceof Response) {
      safeResultPromise = result.clone().json().catch(() => null);
    } else {
      safeResultPromise = Promise.resolve(result);
    }

    return safeResultPromise.then(safeResult => {
      const duration = performance.now() - start;

      window.postMessage(
        {
          source: 'track-react-plugin',
          type: 'await-event',
          label,
          location,
          start,
          duration,
          responseOk,
          error: errorMessage,
          result: safeResult,
        },
        '*'
      );

      return result;
    });
  })
  .catch(e => {
    console.log('[ERROR] caught in PLUGIN retrieveAwaitData: ', e);
    responseOk = false;
    errorMessage = e instanceof Error ? e.message : String(e);

    const duration = performance.now() - start;

    window.postMessage(
      {
        source: 'track-react-plugin',
        type: 'await-event',
        label,
        location,
        start,
        duration,
        responseOk,
        error: errorMessage,
        result: null,
      },
      '*'
    );

    return Promise.reject(e);
  });
}
