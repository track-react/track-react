import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // equivalent to --host
  },
  plugins: [react(),
    viteStaticCopy({
      targets: [      
      { src: './devtools/manifest.json', dest: '.' },
      { src: './devtools/devtools.html', dest: '.' },
      { src: './devtools/devtools.js', dest: '.' },
    ],
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
