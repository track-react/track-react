export default function wrapAwait(babel) {
  const { types: t } = babel;

  console.log('PARKER IS ENTERING WRAPAWAIT');

  function containsRetrieveAwaitData(node) {
    if (!node) return false;

    if (t.isCallExpression(node)) {
      if (t.isIdentifier(node.callee) && node.callee.name === 'retrieveAwaitData') {
        return true;
      }
      // Recursively check all arguments
      return node.arguments.some(arg => containsRetrieveAwaitData(arg));
    }

    return false;
  }

  return {
    name: "Wrapping await calls",
    visitor: {
      AwaitExpression(path, state) {
        const functionName = path.getFunctionParent()?.node?.id?.name;

        if (functionName === 'retrieveAwaitData') {
          return; // Avoid infinite loop
        }

        const argPath = path.get('argument');
        const arg = argPath.node;

        if (containsRetrieveAwaitData(arg)) {
          console.log('Found retrieveAwaitData in await argument - skipping wrap');
          return;
        }

        const label = argPath.getSource() || 'await';
        const fileName = state.file.opts.filename || 'unknown';
        const line = path.node.loc?.start?.line || 0;
        const column = path.node.loc?.start?.column || 0;
        const location = `${fileName}:${line}:${column}`;

        path.node.argument = t.callExpression(
          t.identifier("retrieveAwaitData"),
          [
            arg,
            t.stringLiteral(label),
            t.stringLiteral(location),
          ]
        );
      }
    }
  };
}
