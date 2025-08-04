import { Plugin } from 'vite';
import path from 'path';
import renameFetch from '../babel-plugins/renameFetch.js';

let viteMode = 'development'; // fallback

export function fetchPlugin(): Plugin {
  return {
    name: 'vite-plugin-fetchPlugin', // plugin name
    enforce: 'pre', // specifies that this plugin will run before all other vite build logic
    apply: 'serve', // This ensures the plugin only runs during development

    resolveId(id) {
      // anywhere retrieveFetchData is added -> adding an explicit path
      if (id === 'retrieveFetchData') {
        return path.resolve(__dirname, '../runtime/retrieveFetchData.ts');
      }
    },

    async transform(code, id) {
      // ignoring files that have already been transformed
      if (viteMode !== 'development') {
        return null;
      }
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

      // Use Babel to transform the code with the renameFetch plugin
      const babel = await import('@babel/core');
      const jsxSyntax = (await import('@babel/plugin-syntax-jsx')).default;
      const tsSyntax = [
        (await import('@babel/plugin-syntax-typescript')).default,
        { isTSX: true },
      ];

      const result = await babel.transformAsync(code, {
        filename: id,
        plugins: [jsxSyntax, ...[tsSyntax], renameFetch],
        sourceMaps: true,
        configFile: false,
        parserOpts: {
          sourceType: 'module',
          plugins: ['jsx', 'typescript'],
        },
      });

      // Return the transformed code and map (if available)
      if (result && result.code) {
        return {
          code: result.code,
          map: result.map || null,
        };
      }
      return null;
    },

    configResolved(config) {
      viteMode = config.mode;
      // This hook runs after Vite has resolved the final config
      // Logs the current mode (development, production, etc.), confirming the plugin is active
      console.log('track-react plugin active in:', config);
    },
  };
}
