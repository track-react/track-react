import * as babel from '@babel/core';
// import babel from '@vitejs/plugin-babel'
export default function renameFetch(babel, ...args) {
  const { types: t } = babel;

  return {
    name: 'Changing fetch to retrieveFetchData',
    visitor: {
      CallExpression(path) {
        const callee = path.get('callee');

        if (callee) {
          if (callee.isIdentifier({ name: 'fetch' })) {
            console.log('replacing normal fetch');
            //replacing normal fetch call
            callee.replaceWith(t.identifier('retrieveFetchData'));
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
            }
          }
        }
      },
    },
  };
}
