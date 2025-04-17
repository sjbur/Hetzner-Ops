import { createAppTheme } from '../theme'
import { CSSObject } from '@emotion/react'

describe('theme', () => {
  describe('createAppTheme', () => {
    it('creates light theme with correct palette', () => {
      const theme = createAppTheme('light')

      expect(theme.palette.mode).toBe('light')
      expect(theme.palette.primary.main).toBe('#D50C2D')
      expect(theme.palette.secondary.main).toBe('#2D3748')
      expect(theme.palette.background.default).toBe('#F7FAFC')
      expect(theme.palette.background.paper).toBe('#FFFFFF')
    })

    it('creates dark theme with correct palette', () => {
      const theme = createAppTheme('dark')

      expect(theme.palette.mode).toBe('dark')
      expect(theme.palette.primary.main).toBe('#D50C2D')
      expect(theme.palette.secondary.main).toBe('#2D3748')
      expect(theme.palette.background.default).toBe('#121212')
      expect(theme.palette.background.paper).toBe('#1E1E1E')
    })

    it('configures card component styles', () => {
      const lightTheme = createAppTheme('light')
      const darkTheme = createAppTheme('dark')

      const lightCardStyles = (
        lightTheme.components?.MuiCard?.styleOverrides?.root as any
      )({}) as CSSObject
      expect(lightCardStyles).toMatchObject({
        borderRadius: 8,
        transition: 'transform 0.2s, box-shadow 0.2s',
      })
      expect(lightCardStyles.boxShadow).toContain('0 2px 4px')

      const darkCardStyles = (
        darkTheme.components?.MuiCard?.styleOverrides?.root as any
      )({}) as CSSObject
      expect(darkCardStyles).toMatchObject({
        borderRadius: 8,
        transition: 'transform 0.2s, box-shadow 0.2s',
      })
      expect(darkCardStyles.boxShadow).toContain('0 4px 6px')
    })

    it('configures chip component styles', () => {
      const theme = createAppTheme('light')

      const chipStyles = theme.components?.MuiChip?.styleOverrides
      expect(chipStyles?.root).toMatchObject({
        borderRadius: 4,
      })
      expect(chipStyles?.colorSuccess).toMatchObject({
        backgroundColor: '#4CAF50',
        color: '#FFFFFF',
      })
      expect(chipStyles?.colorWarning).toMatchObject({
        backgroundColor: '#FF9800',
        color: '#FFFFFF',
      })
    })

    it('configures button component styles', () => {
      const theme = createAppTheme('light')

      const buttonStyles = theme.components?.MuiButton?.styleOverrides
      const rootStyles = (buttonStyles?.root as any)({}) as CSSObject

      expect(rootStyles).toMatchObject({
        textTransform: 'none',
        borderRadius: 6,
        variants: [],
      })

      expect(buttonStyles?.contained).toMatchObject({
        boxShadow: 'none',
      })
    })

    it('configures table cell component styles', () => {
      const theme = createAppTheme('light')

      const tableCellStyles = theme.components?.MuiTableCell?.styleOverrides
      const rootStyles = (tableCellStyles?.root as any)?.({
        theme,
      }) as CSSObject

      expect(rootStyles).toBeDefined()
      expect(rootStyles?.borderColor).toBeDefined()
    })

    it('applies different hover effects based on theme mode', () => {
      const lightTheme = createAppTheme('light')
      const darkTheme = createAppTheme('dark')

      const lightCardStyles = (
        lightTheme.components?.MuiCard?.styleOverrides?.root as any
      )({})
      const darkCardStyles = (
        darkTheme.components?.MuiCard?.styleOverrides?.root as any
      )({})

      expect(lightCardStyles['&:hover']?.boxShadow).toContain('0 4px 8px')
      expect(darkCardStyles['&:hover']?.boxShadow).toContain('0 6px 12px')

      const lightButtonContained =
        lightTheme.components?.MuiButton?.styleOverrides?.contained
      const darkButtonContained =
        darkTheme.components?.MuiButton?.styleOverrides?.contained

      const mockOwnerState = {
        variant: 'contained',
        color: 'primary',
        size: 'medium',
        disabled: false,
      } as const

      if (typeof lightButtonContained === 'function') {
        const lightButtonStyles = lightButtonContained({
          theme: lightTheme,
          ownerState: mockOwnerState,
        }) as CSSObject
        const hoverStyles = lightButtonStyles['&:hover'] as CSSObject
        expect(hoverStyles.boxShadow).toContain('0 2px 4px')
      }

      if (typeof darkButtonContained === 'function') {
        const darkButtonStyles = darkButtonContained({
          theme: darkTheme,
          ownerState: mockOwnerState,
        }) as CSSObject
        const hoverStyles = darkButtonStyles['&:hover'] as CSSObject
        expect(hoverStyles.boxShadow).toContain('0 2px 4px')
      }
    })
  })
})
