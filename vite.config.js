import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@stores': path.resolve(__dirname, './src/stores'),  // Configuration correcte pour @stores
      '@': path.resolve(__dirname, './src'),  // Alias @ si vous souhaitez l'utiliser également
    }
  },
  plugins: [vue()]
});
