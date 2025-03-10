import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@plugins': path.resolve(__dirname, 'src/plugins'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@environments': path.resolve(__dirname, 'src/environments'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      'vue-multiselect': path.resolve(__dirname, 'node_modules/vue-multiselect')
    }
  }
})
  