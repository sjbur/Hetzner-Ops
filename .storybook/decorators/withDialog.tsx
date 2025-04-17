import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { LanguageProvider } from '../../src/i18n/LanguageContext'
import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarProvider } from 'notistack'
import { createAppTheme } from '../../src/theme/theme'

const theme = createAppTheme('light')

export const withDialog = (Story: React.ComponentType) => {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <Story />
          </div>
        </SnackbarProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
