/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-data-folder',
      apply: 'build',
      writeBundle() {
        // 🔑 Копируем папку data в dist после сборки
        const srcDir = resolve(__dirname, 'src/data')
        const destDir = resolve(__dirname, 'dist/data')
        
        // Создаём папку если её нет
        mkdirSync(destDir, { recursive: true })
        
        // Копируем все файлы
        const fs = require('fs')
        const files = fs.readdirSync(srcDir)
        
        files.forEach((file: string) => {
          const src = `${srcDir}/${file}`
          const dest = `${destDir}/${file}`
          copyFileSync(src, dest)
        })
        
        console.log('✅ Data folder copied to dist')
      },
    },
  ],
  build: {
    outDir: 'dist',
  },
})
