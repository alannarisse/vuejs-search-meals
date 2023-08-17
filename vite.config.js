import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// vue.config.js file to be placed in the root of your repository

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vuejs-search-meals/'
    : '/'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})

