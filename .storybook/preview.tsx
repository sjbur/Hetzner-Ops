import type { Preview } from '@storybook/react'
import { ThemeProvider } from '@mui/material/styles'
import { LanguageProvider } from '../src/i18n/LanguageContext'
import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarProvider } from 'notistack'
import { withStore } from './decorators/withStore'
import { createAppTheme } from '../src/theme/theme'

const theme = createAppTheme('light')

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withStore,
    (Story) => (
      <LanguageProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Story />
          </SnackbarProvider>
        </ThemeProvider>
      </LanguageProvider>
    ),
  ],
}

export default preview
