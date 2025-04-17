import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import { Language as LanguageIcon } from '@mui/icons-material'
import { useLanguage } from '@/i18n/LanguageContext'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
]

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { t } = useTranslation()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageSelect = (code: string) => {
    setLanguage(code)
    handleClose()
  }

  return (
    <>
      <Tooltip title={t('common.changeLanguage')}>
        <IconButton
          onClick={handleClick}
          color="inherit"
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            selected={language === lang.code}
          >
            {lang.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
