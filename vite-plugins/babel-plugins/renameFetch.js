import babel from 'babel/core';
// import babel from '@vitejs/plugin-babel'
export default function renameFetch(babel, ...args) {
  const { types: t } = babel;

  return {
    name: 'Changing fetch to retrieveFetchData',
    visitor: {
      CallExpression(path) {
        // Originally had BlockStatement(path)
        const callee = path.get('callee');
        console.log('type', callee.node.type);
        console.log('name', callee.node.name);

        if (callee) {
          if (callee.isIdentifier({ name: 'fetch' })) {
            //replacing normal fetch call
            //callee.node.name = 'retrieveFetchData';
            callee.replaceWith(t.identifier('retrieveFetchData'));
          } else if (
            callee.isMemberExpression()
            // type === 'MemberExpression' &&
            // callee.node.property.name === 'fetch'
          ) {
            const memberObject = callee.get('object');
            const memberProperty = callee.get('property');
            if (
              (memberObject.isIdentifier({ name: 'window' }) ||
              memberObject.isIdentifier({ name: 'globalThis' })) &&
              memberProperty.isIdentifier({ name: 'fetch' })
            ) {
              //replacing window.fetch call
              memberProperty.replaceWith(t.identifier('retrieveFetchData'));
            }
          }
        }
      },
    },
  };
}
