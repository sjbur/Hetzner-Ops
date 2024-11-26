import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { createAppTheme } from '../theme/theme'
import { LanguageProvider } from '../i18n/LanguageContext'
import React from 'react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import type { CSSProperties } from 'react'

// Инициализация i18next для тестов
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: {
      common: {},
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

interface MotionDivProps {
  children: React.ReactNode
  whileHover?: Record<string, unknown>
  whileTap?: Record<string, unknown>
  style?: CSSProperties
  className?: string
  'data-testid'?: string
  [key: string]: unknown
}

// Мок для Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, whileTap, ...props }: MotionDivProps) =>
      React.createElement(
        'div',
        {
          'data-framer-motion-initial': 'true',
          'data-testid': props['data-testid'],
          'data-motion-hover': whileHover ? 'true' : undefined,
          'data-motion-tap': whileTap ? 'true' : undefined,
          ...props,
        },
        children,
      ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

interface AllTheProvidersProps {
  children: React.ReactNode
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  const theme = createAppTheme('light')

  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Экспортируем только типы и утилиты для тестирования
export type { RenderOptions }
export { customRender as render }
export { userEvent } from '@testing-library/user-event'
export { screen, within, fireEvent } from '@testing-library/react'
