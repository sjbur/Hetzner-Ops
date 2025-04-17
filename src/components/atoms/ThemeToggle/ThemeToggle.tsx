import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useTheme as useMuiTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/theme/ThemeContext'

export const ThemeToggle: React.FC = () => {
  const muiTheme = useMuiTheme()
  const { t } = useTranslation()
  const { toggleColorMode } = useTheme()

  return (
    <Tooltip title={t('theme.toggle')}>
      <IconButton onClick={toggleColorMode} color="inherit">
        {muiTheme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  )
}
