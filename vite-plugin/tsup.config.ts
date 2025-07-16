import { defineConfig } from 'tsup';
import fs from 'fs';
import path from 'path';
import esbuild from 'esbuild';

export default defineConfig({
  // ① what to bundle
  entry: ['src/index.ts'],

  // ② output formats
  format: ['esm', 'cjs'],

  // ③ generate *.d.ts for consumers
  dts: true,

  // ④ node target (affects down‑leveling)
  target: 'node18',

  // ⑤ leave these deps unbundled
  external: [
    'vite',
    '@babel/core',
    '@babel/preset-typescript', // add others if you import them at runtime
  ],

  // ⑥ run after build succeeds
  async onSuccess() {
    const src = path.resolve('runtime/retrieveFetchData.ts');
    const destDir = path.resolve('dist/runtime');
    const dest = path.join(destDir, 'retrieveFetchData.js');
    fs.mkdirSync(destDir, { recursive: true });

    // compile TypeScript → JS (keeps modern syntax, strips types)
    const { code } = esbuild.transformSync(fs.readFileSync(src, 'utf8'), {
      loader: 'ts',
      format: 'esm',
      target: 'es2020',
    });
    fs.writeFileSync(dest, code);
    console.log('transpiled retrieveFetchData → dist/runtime ✅');
  },
});
