import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/auth': {
        target: 'https://staff-graph-service.onrender.com',
        changeOrigin: true,
      },
      '/graphql': {
        target: 'https://staff-graph-service.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
