import React from 'react'
import { Button, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface ServerActionButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  color?: 'primary' | 'secondary' | 'error'
  disabled?: boolean
}

export const ServerActionButton: React.FC<ServerActionButtonProps> = ({
  icon,
  label,
  onClick,
  color = 'primary',
  disabled = false,
}) => {
  const { t } = useTranslation()

  return (
    <Tooltip title={t(label)}>
      <Button
        variant="contained"
        color={color}
        onClick={onClick}
        disabled={disabled}
        startIcon={icon}
      >
        {t(label)}
      </Button>
    </Tooltip>
  )
}
