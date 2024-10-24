import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@/pages': '/src/pages',
            '@/components': '/src/components',
            '@/public': '/public',
            '@/assets': '/src/assets',
            '@/types': '/src/types',
            '@/utils': '/src/utils',
            '@/contexts': '/src/contexts',
        },
    },
})
