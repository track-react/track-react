import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // equivalent to --host
  },
  plugins: [
    react(),
    viteStaticCopy({
<<<<<<< HEAD
      targets: [      
      { src: './devtools/manifest.json', dest: '.' },
      { src: './devtools/devtools.html', dest: '.' },
      { src: './devtools/devtools.js', dest: '.' },
      { src: './devtools/background.js', dest: '.' },
    ],
    })
=======
      targets: [
        { src: './devtools/manifest.json', dest: '.' },
        { src: './devtools/devtools.html', dest: '.' },
        { src: './devtools/devtools.js', dest: '.' },
        { src: './devtools/content.js', dest: '.' },
        { src: './devtools/background.js', dest: '.' },
      ],
    }),
>>>>>>> fbbdf2125988a836d013e0e502cb277df2988c99
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled']
  }
});
