import react from '@vitejs/plugin-react'
import path from 'path'
import {defineConfig} from 'vitest/config'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src'),
            "@root": path.resolve(__dirname, './'),
            "@i18n": path.resolve(__dirname, './locales')
        },
    },
})