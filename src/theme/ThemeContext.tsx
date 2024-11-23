import { createContext, useContext, useState, useEffect } from 'react'
import { PaletteMode } from '@mui/material'
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { createAppTheme } from './theme'

interface ThemeContextType {
  mode: PaletteMode
  toggleColorMode: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
})

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>(() => {
    // Сначала проверяем сохраненные настройки
    const savedMode = localStorage.getItem('themeMode')
    if (savedMode) {
      return savedMode as PaletteMode
    }

    // Если нет сохраненных настроек, используем системные предпочтения
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    // Слушаем изменения системных настроек
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Обновляем тему только если пользователь не установил свои настройки
      if (!localStorage.getItem('themeMode')) {
        setMode(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    localStorage.setItem('themeMode', mode)
  }, [mode])

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const theme = createAppTheme(mode)

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  )
}
