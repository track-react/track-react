import * as babel from '@babel/core';
// import babel from '@vitejs/plugin-babel'
import template from '@babel/template';
export default function renameFetch(babel, ...args) {
  const { types: t } = babel;

  return {
    name: 'Changing fetch to retrieveFetchData',
    visitor: {
      CallExpression(path, state) {
        const callee = path.get('callee');

        if (callee) {
          if (callee.isIdentifier({ name: 'fetch' })) {
            console.log('replacing normal fetch');
            //replacing normal fetch call
            callee.replaceWith(t.identifier('retrieveFetchData'));
            state.needsImport = true;
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
      Program: {
        enter(path, state) {
          state.needsImport = false;
        },
        exit(path, state) {
          if (
            state.needsImport &&
            !path.scope.hasBinding('retrieveFetchData')
          ) {
            //! The below logic is to detect if the file is in commonjs. If we decide we definitely want to support CommonJs, mb we should change the tsup to output two plugin versions (chatgpt says that is best practice, but it involves changing a lot of the configurations which im scared to do)
            const sourceType =
              path.node.sourceType ??
              state.file.ast?.program?.sourceType ??
              'module'; // default to ESM

            const useRequire = sourceType === 'script';
            const importStatement = useRequire
              ? "const { retrieveFetchData } = require('vite-plugin-react-events/retrieveFetchData')"
              : "import { retrieveFetchData } from 'vite-plugin-react-events/retrieveFetchData'";

            const importNode = template.statement(importStatement)();
            path.unshiftContainer('body', importNode);
          }
        },
      },
    },
  };
}
