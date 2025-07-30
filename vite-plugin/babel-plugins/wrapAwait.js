import template from '@babel/template';

export default function wrapAwait(babel) {
  const { types: t } = babel;

  return {
    name: 'Wrapping await calls',
    visitor: {
      Program: {
        enter(path, state) {
          state.needsImport = false; 
        },
        exit(path, state) {
          if (
            state.needsImport &&
            !path.scope.hasBinding('retrieveAwaitData') 
          ) {
            // The below logic is to detect if the file is in commonjs.
            const sourceType =
              path.node.sourceType ??
              state.file.ast?.program?.sourceType ??  
              'module'; 

            const useRequire = sourceType === 'script';
            const importStatement = useRequire
              ? "const { retrieveAwaitData } = require('track-react/retrieveAwaitData')"
              : "import { retrieveAwaitData } from 'track-react/retrieveAwaitData'";

            const importNode = template.statement(importStatement)();
            path.unshiftContainer('body', importNode);
          }
        },
      },
      AwaitExpression(path, state) {

        // Checking to see if parent function is 'retrieveAwaitData' --> avoiding infinite loop
        const functionName = path.getFunctionParent()?.node?.id?.name;
        if (functionName === 'retrieveAwaitData') {
          return;
        }

        state.needsImport = true;

        const argPath = path.get('argument');
        const arg = argPath.node;

        // Here we are declaring all the variables that will displayed in the 'location'.
        const label = argPath.getSource() || 'await';
        const filePath = state?.file?.opts?.filename || 'unknown';
        const fileName = filePath.split('/').pop();
        
        const line = path.node.loc?.start?.line || 0;
        const column = path.node.loc?.start?.column || 0;
        const location = `${fileName}:${line}:${column}`;

        // This is adding a function called 'retrieveAwaitData()' after the AwaitExpression
        // retrieveAwaitData will accept three parameters --> promise, label, location
        path.node.argument = t.callExpression(
          t.identifier('retrieveAwaitData'),
          [arg, t.stringLiteral(label), t.stringLiteral(location)]
        );
      },
    },
  };
}
