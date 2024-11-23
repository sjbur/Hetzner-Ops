import { createTheme, alpha, ThemeOptions } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: '#D50C2D',
      light: mode === 'dark' ? '#FF1744' : '#FF4569',
      dark: mode === 'dark' ? '#B71C1C' : '#C62828',
    },
    secondary: {
      main: '#2D3748',
      light: mode === 'dark' ? '#4A5568' : '#718096',
      dark: mode === 'dark' ? '#1A202C' : '#2D3748',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#F7FAFC',
      paper: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
    },
    text: {
      primary: mode === 'dark' ? '#FFFFFF' : '#2D3748',
      secondary: mode === 'dark' ? '#A0AEC0' : '#718096',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: () => ({
          borderRadius: 8,
          boxShadow:
            mode === 'dark'
              ? '0 4px 6px rgba(0, 0, 0, 0.3)'
              : '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow:
              mode === 'dark'
                ? '0 6px 12px rgba(0, 0, 0, 0.4)'
                : '0 4px 8px rgba(0,0,0,0.15)',
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
        colorSuccess: {
          backgroundColor: mode === 'dark' ? '#2E7D32' : '#4CAF50',
          color: '#FFFFFF',
        },
        colorWarning: {
          backgroundColor: mode === 'dark' ? '#ED6C02' : '#FF9800',
          color: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: () => ({
          textTransform: 'none',
          borderRadius: 6,
          variants: [],
        }),
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow:
              mode === 'dark'
                ? '0 2px 4px rgba(0, 0, 0, 0.3)'
                : '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor:
            mode === 'dark'
              ? alpha(theme.palette.common.white, 0.1)
              : alpha(theme.palette.common.black, 0.1),
        }),
      },
    },
  },
})

export const createAppTheme = (mode: PaletteMode) =>
  createTheme(getDesignTokens(mode))
