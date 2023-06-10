import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview:{
    host:'localhost',
    port:5173,
    strictPort:true,
    headers:{
      'Access-Control-Allow-Origin':'http://localhost:3000',
      'Access-Control-Allow-Headers':'http://localhost:3000'
    }
  }
})
