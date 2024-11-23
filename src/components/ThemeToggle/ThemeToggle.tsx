import { IconButton, Tooltip } from '@mui/material'
import { LightMode, DarkMode } from '@mui/icons-material'
import { useTheme } from '@/theme/ThemeContext'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function ThemeToggle() {
  const { mode, toggleColorMode } = useTheme()
  const { t } = useTranslation()

  return (
    <Tooltip title={t('common.changeTheme')}>
      <IconButton
        onClick={toggleColorMode}
        color="inherit"
        component={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {mode === 'light' ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  )
}
