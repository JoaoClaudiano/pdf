import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/github.com/JoaoClaudiano/pdf/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Minha Biblioteca PDF',
        short_name: 'PDFLib',
        description: 'Organize seus PDFs com tags e grupos, offline',
        theme_color: '#3b82f6',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/unpkg\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unpkg-libs',
              expiration: { maxEntries: 10 }
            }
          }
        ]
      }
    })
  ]
})
