import template from '@babel/template';
export default function renameUseEffect(babel, ...args) {
  const { types: t } = babel;
  console.log('t', t);

  return {
    name: 'Changing useEffect to retrieveUseEffectData',
    visitor: {
      Program: {
        enter(path, state) {
          state.needsImport = false;
        },
        exit(path, state) {
          if (
            state.needsImport &&
            !path.scope.hasBinding('retrieveUseEffectData')
          ) {
            const sourceType =
              path.node.sourceType ??
              state.file.ast?.program?.sourceType ??
              'module'; // default to ESM

            const useRequire = sourceType === 'script';
            const importStatement = useRequire
              ? "const { retrieveUseEffectData } = require('track-react/retrieveUseEffectData')"
              : "import { retrieveUseEffectData } from 'track-react/retrieveUseEffectData'";

            const importNode = template.statement(importStatement)();
            path.unshiftContainer('body', importNode);
          }
        },
      },
      CallExpression(path, state) {
        const callee = path.get('callee');
        if (callee) {
          if (callee.isIdentifier({ name: 'useEffect' })) {
            console.log('replacing normal useEffect');
            callee.replaceWith(t.identifier('retrieveUseEffectData'));

            const args = path.get('arguments'); // arguments of useEffecct
            //! might need to take out the question marks below
            const filePath = state?.file?.opts?.filename || 'unknown';
            const fileName = filePath.split('/').pop(); // trimming so its just file name

            // Add the fileName as last argument
            const newArgs = [
              ...args.map((arg) => arg.node),
              t.stringLiteral(fileName),
            ];

            path.node.arguments = newArgs;
            state.needsImport = true;
          }
        }
      },
    },
  };
}
