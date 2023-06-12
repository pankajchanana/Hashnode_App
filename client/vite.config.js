import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/appwrite': {
        target: 'https://cloud.appwrite.io',
        changeOrigin: true,
        ws: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/appwrite/, ''),
      },
    },
  },
})
