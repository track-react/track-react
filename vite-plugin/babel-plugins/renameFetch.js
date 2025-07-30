import template from '@babel/template';

export default function renameFetch(babel) {
  const { types: t } = babel;

  return {
    name: 'Rename fetch to retrieveFetchData',
    visitor: {
      Program: {
        enter(path, state) {
          state.needsImport = false;
        },
        exit(path, state) {
          if (
            state.needsImport &&
            !path.scope.hasBinding('retrieveFetchData')
          ) {
            const sourceType =
              path.node.sourceType ??
              state.file.ast?.program?.sourceType ??
              'module';

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

        // Skip if already calling retrieveFetchData to avoid double wrapping
        if (callee.isIdentifier({ name: 'retrieveFetchData' })) return;

        const isDirectFetch = callee.isIdentifier({ name: 'fetch' });
        const isWindowOrGlobalFetch =
          callee.isMemberExpression() &&
          (
            callee.get('object').isIdentifier({ name: 'window' }) ||
            callee.get('object').isIdentifier({ name: 'globalThis' })
          ) &&
          callee.get('property').isIdentifier({ name: 'fetch' });

        if (isDirectFetch || isWindowOrGlobalFetch) {
          state.needsImport = true;

          // Get original fetch args
          const args = path.node.arguments;

          const label = path.getSource(); 
          const filePath = state?.file?.opts?.filename || 'unknown';
          const fileName = filePath.split('/').pop();
          const line = path.node.loc?.start?.line || 0;
          const column = path.node.loc?.start?.column || 0;
          const location = `${fileName}:${line}:${column}`;

          // Replace with retrieveFetchData(...args, label, location)
          path.replaceWith(
            t.callExpression(
              t.identifier('retrieveFetchData'),
              [
                ...args,
                t.stringLiteral(label),
                t.stringLiteral(location),
              ]
            )
          );
        }
      },
    },
  };
}

