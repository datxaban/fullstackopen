import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://fullstackopen-phonebook-60u4.onrender.com',
        changeOrigin: true,
      },
    }
  },
})
