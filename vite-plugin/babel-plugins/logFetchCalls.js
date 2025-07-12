import babel from 'babel';
// import babel from '@vitejs/plugin-babel'
export default function (babel) {
  const { types: t } = babel;

  return {
    name: 'Changing fetch to retrieveFetchData', 
    visitor: {
      CallExpression(path) {
        // Originally had BlockStatement(path)
        if (path.node.callee.name === 'fetch') {
          path.node.callee.name = 'retrieveFetchData';
        }
      },
    },
  };
}
