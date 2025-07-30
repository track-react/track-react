/* eslint-disable react-hooks/rules-of-hooks */
import type { Plugin, ResolvedConfig } from 'vite';
import { fetchPlugin } from './fetchPlugin.js';
import { awaitPlugin } from './awaitPlugin.js';
import { useEffectPlugin } from './useEffectPlugin.js';
export default function trackReactPlugin(): Plugin {
  const fetch = fetchPlugin();
  const awaitP = awaitPlugin();
  const useEffect = useEffectPlugin();

  return {
    name: 'vite-plugin-track-react-container',
    enforce: 'pre',
    apply: 'serve',

    configResolved(config) {
      // Helper function to safely call configResolved method
      const callConfigResolved = (plugin: Plugin, config: ResolvedConfig) => {
        if (!plugin.configResolved) return;
        
        if (typeof plugin.configResolved === 'function') {
          plugin.configResolved.call(this, config);
        } else if (plugin.configResolved.handler) {
          plugin.configResolved.handler.call(this, config);
        }
      };

      callConfigResolved(fetch, config);
      callConfigResolved(awaitP, config);
      callConfigResolved(useEffect, config);
    },

    resolveId(id, importer, options) {
      // Helper function to safely call resolveId method
      const callResolveId = (plugin: Plugin, id: string, importer?: string, options?: { ssr?: boolean }) => {
        if (!plugin.resolveId) return null;
        
        if (typeof plugin.resolveId === 'function') {
          return plugin.resolveId.call(this, id, importer, options);
        } else if (plugin.resolveId.handler) {
          return plugin.resolveId.handler.call(this, id, importer, options);
        }
        return null;
      };

      return (
        callResolveId(fetch, id, importer, options) ??
        callResolveId(awaitP, id, importer, options) ??
        callResolveId(useEffect, id, importer, options) ??
        null
      );
    },

    async transform(code, id, options) {
      // Helper function to safely call transform method
      const callTransform = async (plugin: Plugin, code: string, id: string, options?: { ssr?: boolean }) => {
        if (!plugin.transform) return null;
        
        // Handle both function and ObjectHook formats
        if (typeof plugin.transform === 'function') {
          return await plugin.transform.call(this, code, id, options);
        } else if (plugin.transform.handler) {
          return await plugin.transform.handler.call(this, code, id, options);
        }
        return null;
      };

      let result = await callTransform(fetch, code, id, options);

      result =
        (await callTransform(awaitP, result?.code ?? code, id, options)) ?? result;

      result =
        (await callTransform(useEffect, result?.code ?? code, id, options)) ?? result;
        
      return result;
    },
  };
}
