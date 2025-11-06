import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Get repository name from environment or default to empty string for root
const getBasePath = () => {
  if (process.env.GITHUB_PAGES && process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1]
    return `/${repoName}/`
  }
  return '/'
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})

