console.log('is this getting run');

setTimeout(() => {
  window.postMessage(
    [
      {
        source: 'react-events',
        type: 'fetch',
        payload: {
          url: 'https://api.example.com',
          duration: 148.7,
          status: 200,
        },
      },
      {
        source: 'react-events',
        type: 'setTimeout',
        payload: {
          url: 'https://api.example.com',
          duration: 150,
          status: 200,
        },
      },
      {
        source: 'react-events',
        type: 'useEffect',
        payload: {
          url: 'https://api.example.com',
          duration: 100,
          status: 200,
        },
      },
    ],
    '*'
  );
}, 1000);

// async function retrieveFetchData(...args) {
//   const start = performance.now();
//   const res = await fetch(...args);
//   const duration = performance.now() - start;
//   const cloned = res.clone();
//   let json;
//   try {
//     json = await cloned.json();
//   } catch (e) {
//     json = null;
//   }
//   window.postMessage(
//     {
//       source: 'react-events-devtool',
//       type: 'fetch-event',
//       payload: {
//         url: args[0],
//         start,
//         duration,
//         status: res.status,
//         ok: res.ok,
//         json,
//       },
//     },
//     '*'
//   );
//   return res;
// }
