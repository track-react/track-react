export default function renameFetch(babel) {

  const { types: t } = babel;

  return {
    name: 'rename-fetch-to-retrieveFetchData',
    visitor: {
      CallExpression(path) {
        const callee = path.get('callee');

        if (callee.isIdentifier({ name: 'fetch' })) {
          // Replace simple fetch() with retrieveFetchData()
          callee.replaceWith(t.identifier('retrieveFetchData'));
        } else if (callee.isMemberExpression()) {
          const object = callee.get('object');
          const property = callee.get('property');

          if (
            (object.isIdentifier({ name: 'window' }) ||
              object.isIdentifier({ name: 'globalThis' })) &&
            property.isIdentifier({ name: 'fetch' })
          ) {
            // Replace window.fetch or globalThis.fetch with retrieveFetchData
            // Replace whole callee with retrieveFetchData identifier
            callee.replaceWith(t.identifier('retrieveFetchData'));
          }
        }
      },
    },
  };
}
