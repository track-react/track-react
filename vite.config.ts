import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    viteStaticCopy({
      targets: [      
      { src: './devtools/manifest.json', dest: '.' },
      { src: './devtools/devtools.html', dest: '.' },
      { src: './devtools/devtools.js', dest: '.' },
      { src: './devtools/panel.html', dest: '.' },
    ],
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
