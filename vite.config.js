import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { resolve } from 'path'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // build: {
  //   target : "esnext",
  //   emptyOutDir: true,
  //   rollupOptions: {
  //   treeshake: false,
  //   cache: false,
  //   },
  // }
   //remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  // resolve: {
  //   extensions: [
  //     '.js',
  //     '.json',
  //     '.jsx',
  //     '.mjs',
  //     '.ts',
  //     '.tsx',
  //     '.vue',
  //   ]
  // },
  
})
