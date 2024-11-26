import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '.storybook/',
        '**/*.config.{js,ts}',
        '**/*.d.ts',
        '**/index.ts',
        'src/vite-env.d.ts',
        'src/types/',
        'src/stories',
        '**/*.stories.{js,jsx,ts,tsx}',
        '**/*.story.{js,jsx,ts,tsx}',
        'src/routeTree.gen.ts',
        'src/main.tsx',
        'src/router.ts',
      ],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      all: true,
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@store': path.resolve(__dirname, './src/store'),
      '@api': path.resolve(__dirname, './src/api'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@middleware': path.resolve(__dirname, './src/middleware'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@locales': path.resolve(__dirname, './src/locales'),
      '@services': path.resolve(__dirname, './src/services'),
    },
  },
})
