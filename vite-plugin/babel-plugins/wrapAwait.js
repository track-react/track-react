export default function wrapAwait(babel) {
  // destructuring types from babel, and renaming it t
  const { types: t } = babel;

  return {
    name: 'Wrapping await calls',
    visitor: {
      AwaitExpression(path, state) {
        // passing in path for node paths, and the state for extra metadata -- including file name

        // This is checking to see if the parent function is 'retrieveAwaitData' --> therefore we can avoid an infinite loop
        const functionName = path.getFunctionParent()?.node?.id?.name;
        if (functionName === 'retrieveAwaitData') {
          return;
        }

        const argPath = path.get('argument');
        const arg = argPath.node;

        // Here we are declaring all the variables that will displayed in the 'location'.
        const label = argPath.getSource() || 'await';
        const fileName = state.file.opts.filename || 'unknown';
        const line = path.node.loc?.start?.line || 0;
        const column = path.node.loc?.start?.column || 0;
        const location = `${fileName}:${line}:${column}`;

        // This is adding a function called 'retrieveAwaitData()' after the AwaitExpression
        //retrieveAwaitData will accept three parameters --> promise, label, location
        path.node.argument = t.callExpression(
          t.identifier('retrieveAwaitData'),
          [arg, t.stringLiteral(label), t.stringLiteral(location)]
        );
      },
    },
  };
}
