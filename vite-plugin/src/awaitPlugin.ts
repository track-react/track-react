import { Plugin } from 'vite';
import path from 'path';

import wrapAwait from '../babel-plugins/wrapAwait.js';

export function awaitPlugin(): Plugin {
  console.log('*****ENTERING AWAIT PLUGIN*******');

  return {
    name: 'vite-plugin-awaitPlugin',
    enforce: 'pre',
    apply: 'serve',

    resolveId(id) {
      if (id === 'retrieveAwaitData') {
        return path.resolve(__dirname, '../runtime/retrieveAwaitData.ts');
      }
    },

    async transform(code, id) {
      if (
        id.includes('node_modules') ||
        id.includes('retrieveAwaitData') ||
        id.includes('retrieveAwaitData.ts') ||
        id.includes('retrieveAwaitData.js') ||
        id.includes('retrieveFetchData') ||
        id.includes('retrieveFetchData.ts') ||
        id.includes('retrieveFetchData.js') ||
        id.includes('retrieveUseEffectData') ||
        id.includes('retrieveUseEffectData.ts') ||
        id.includes('retrieveUseEffectData.js') ||
        !/\.(jsx?|tsx?)$/.test(id)
      ) {
        return null;
      }
      if (code.includes('await')) {
        console.log(`[PLUGIN] ${id} contains await events, transforming...`);
      }

      const babel = await import('@babel/core');
      const jsxSyntax = (await import('@babel/plugin-syntax-jsx')).default;
      const tsSyntax = [
        (await import('@babel/plugin-syntax-typescript')).default,
        { isTSX: true },
      ];

      const result = await babel.transformAsync(code, {
        filename: id,
        plugins: [jsxSyntax, ...[tsSyntax], wrapAwait],
        sourceMaps: true,
        configFile: false,
        parserOpts: {
          sourceType: 'module',
          plugins: ['jsx', 'typescript'],
        },
      });

      if (result && result.code) {
        return {
          code: result.code,
          map: result.map || null,
        };
      }
      return null;
    },

    configResolved(config) {
      console.log('track-react plugin active in: ', config);
    },
  };
}
