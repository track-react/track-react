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
  if (typeof dependencies != 'object') {
    fileName = dependencies;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const start = performance.now();
      const cleanup = effect();
      const duration = performance.now() - start;

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const start = performance.now();

      const cleanup = effect();

      const duration = performance.now() - start;
      setTimeout(() => {
        window.postMessage(
          {
            source: 'track-react-plugin',
            type: 'useEffect',
            start,
            duration,
            hasCleanup: typeof cleanup === 'function',
            dependencies: dependencies.length === 0 ? '[ ]' : dependencies,
            location: fileName,
            responseOk: true,
          },
          '*'
        );
      }, 1000);
      return cleanup;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
  }
}
