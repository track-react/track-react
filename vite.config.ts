import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { fetchPlugin } from './vite-plugins/fetchPlugin.ts';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // equivalent to --host
  },
  plugins: [
    react(),
    fetchPlugin(), // our custom fetch plugin
    viteStaticCopy({ // this builds a static UNPROCESSED folder for the chrome extension
      targets: [      
      { src: './devtools/manifest.json', dest: '.' },
      { src: './devtools/devtools.html', dest: '.' },
      { src: './devtools/devtools.js', dest: '.' },
    ],
    })
  ],
  build: {
    outDir: 'dist', // the folder that everything will be built into
    emptyOutDir: true, // the folder will EMPTY ITSELF every time it is rebuilt
  },
});
