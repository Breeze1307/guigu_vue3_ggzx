/*
 * @Description:
 * @Author: breeze1307
 * @Date: 2023-11-09 14:19:21
 * @LastEditTime: 2023-11-29 17:14:11
 * @LastEditors: breeze1307
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
      },
    },
  },
  server: {
    proxy: {
      '/mockApi': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mockApi/, ''),
      },
    },
  },
})
