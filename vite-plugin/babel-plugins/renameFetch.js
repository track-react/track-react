import * as babel from '@babel/core';
// import babel from '@vitejs/plugin-babel'
import template from '@babel/template';
export default function renameFetch(babel, ...args) {
  const { types: t } = babel;

  return {
    name: 'Changing fetch to retrieveFetchData',
    visitor: {
      Program: {
        enter(path, state) {
          state.needsImport = false; 
        }, // traversal happens here
        exit(path, state) {
          if (
            state.needsImport &&
            !path.scope.hasBinding('retrieveFetchData') // making sure that needsImport is truthy, and retrieveFetchData doesn't already exist
          ) {
            // The below logic is to detect if the file is in commonjs.
            const sourceType =
              path.node.sourceType ??
              state.file.ast?.program?.sourceType ??  
              'module'; // default to ESM

            const useRequire = sourceType === 'script';
            const importStatement = useRequire
              ? "const { retrieveFetchData } = require('track-react/retrieveFetchData')"
              : "import { retrieveFetchData } from 'track-react/retrieveFetchData'";

            const importNode = template.statement(importStatement)();
            path.unshiftContainer('body', importNode);
          }
        },
      },
      CallExpression(path, state) {
        const callee = path.get('callee');

        // This logic looks for fetch in every way it can be called, and renames it to 'retrieveFetchData'
        if (callee) {
          if (callee.isIdentifier({ name: 'fetch' })) {
            callee.replaceWith(t.identifier('retrieveFetchData'));
            state.needsImport = true; // this will affect our Program logic below, requiring the file to import { retrieveFetchData }
          } else if (callee.isMemberExpression()) {
            const memberObject = callee.get('object');
            const memberProperty = callee.get('property');
            if (
              (memberObject.isIdentifier({ name: 'window' }) ||
                memberObject.isIdentifier({ name: 'globalThis' })) &&
              memberProperty.isIdentifier({ name: 'fetch' })
            ) {
              //replacing window.fetch and globalThis.fetch calls
              memberProperty.replaceWith(t.identifier('retrieveFetchData'));
              state.needsImport = true;
            }
          }
        }
      },
    },
  };
}
