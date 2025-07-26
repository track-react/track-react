import * as babel from '@babel/core';

export default function wrapAwait (babel) {
    const { types: t, template } = babel;
    
    return {
      name: "Wrapping await calls", 
      visitor: {
        AwaitExpression(path, state) { // path is AST, and state is metadata for plugin (including file name, location, etc.)
          
          const argPath = path.get('argument');
          const arg = argPath.node;
          const label = argPath.getSource() || 'await';

          // This is assigning each variable a file, line, and column
          const fileName = state.file.opts.filename || 'unknown';
          const line = path.node.loc.start.line || 0;
          const column = path.node.loc.start.column || 0;
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
  