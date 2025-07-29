import type { Plugin } from 'vite';
import { fetchPlugin } from './fetchPlugin.js';
import { awaitPlugin } from './awaitPlugin.js';

export default function trackReactPlugin(): Plugin {
  const fetch = fetchPlugin();
  const awaitP = awaitPlugin();

  return {
    name: 'vite-plugin-track-react-container',
    enforce: 'pre',
    apply: 'serve',

    configResolved(config) {
      //@ts-expect-error
      fetch.configResolved?.(config);
      //@ts-expect-error
      awaitP.configResolved?.(config);
    },
    
    resolveId(id, importer, options) {
      return (
        //@ts-expect-error
        fetch.resolveId?.(id, importer, options) ??
        //@ts-expect-error
        awaitP.resolveId?.(id, importer, options) ??
        null
      );
    },

    async transform(code, id, options) {
      //@ts-expect-error
      let result = await fetch.transform?.(code, id, options);
      //@ts-expect-error
      result = await awaitP.transform?.(result?.code ?? code, id, options) ?? result;
      return result;

    },
  };
}