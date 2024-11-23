import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { RouterProvider } from '@tanstack/react-router'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@theme/ThemeContext'
import { router } from '@/router'
import { LanguageProvider } from '@/i18n/LanguageContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>,
)
