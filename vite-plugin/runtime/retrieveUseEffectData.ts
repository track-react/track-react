/* eslint-disable react-hooks/rules-of-hooks */
// import { useEffect } from "react";
// export async function retrieveFetchData(...args: Parameters<typeof useEffect>) {
// const start = performance.now();
//     console.log(args);

//       window.postMessage(
//         //sending updated properties to window object
//         {
//           source: 'react-events-plugin',
//           type: 'fetch-event',
//           method: "", //'fetch-event',
//           url: "",
//           start,
//           duration,
//           status,
//           responseOk,
//           json: json,
//         },
//         '*'
//       );
//       return res;
// }

import { useEffect } from 'react';

/**
 * Wrapper around React's useEffect that logs and emits metadata for debugging tools.
 *
 * @param effect - The effect callback to run
 * @param deps - Dependency array that controls when the effect runs
 */
export function retrieveUseEffectData(
  effect: React.EffectCallback,
  dependencies?: React.DependencyList | string,
  fileName?: string
) {
  console.log('ENTERED retrieve USE EFFECT DATA function');
  console.log('DEPENDENCIES', dependencies);
  console.log('TYPE OF DEPENDENCIES', typeof dependencies);

  if (typeof dependencies != 'object') {
    fileName = dependencies;
    //dependencies = 'No dependecies';
    useEffect(() => {
      const start = performance.now();

      const cleanup = effect();

      const duration = performance.now() - start;

      //?maybe we add a payload key to put the method specific information?
      setTimeout(() => {
        window.postMessage(
          {
            source: 'track-react-plugin',
            type: 'useEffect',
            start,
            duration,
            hasCleanup: typeof cleanup === 'function',
            dependencies: 'No dependencies',
            location: fileName,
            responseOk: true,
          },
          '*'
        );
      }, 1000);
      return cleanup;
    });
  } else {
    useEffect(() => {
      const start = performance.now();

      const cleanup = effect();

      const duration = performance.now() - start;
      //?maybe we add a payload key to put the method specific information?
      setTimeout(() => {
        window.postMessage(
          {
            source: 'track-react-plugin',
            type: 'useEffect',
            start,
            duration,
            hasCleanup: typeof cleanup === 'function',
            dependencies: dependencies.length === 0 ? '[ ]' : dependencies, //to make devTool print '[]'
            location: fileName,
            responseOk: true,
          },
          '*'
        );
      }, 1000);
      return cleanup;
    }, dependencies);
  }
}
