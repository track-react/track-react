import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    viteStaticCopy({
      targets: [      
      { src: 'manifest.json', dest: '.' },
      { src: 'devtools.html', dest: '.' },
      { src: 'devtools.js', dest: '.' },
      { src: 'panel.html', dest: '.' },
    ],
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
