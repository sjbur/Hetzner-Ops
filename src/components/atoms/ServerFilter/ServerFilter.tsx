import React from 'react'
import { TextField, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface ServerFilterProps {
  type: 'search' | 'status' | 'sort'
  value: string
  onChange: (value: string) => void
  options?: Array<{ value: string; label: string }>
}

export const ServerFilter: React.FC<ServerFilterProps> = ({
  type,
  value,
  onChange,
  options = [],
}) => {
  const { t } = useTranslation()

  const getLabel = () => {
    switch (type) {
      case 'search':
        return t('filters.search')
      case 'status':
        return t('filters.status')
      case 'sort':
        return t('filters.sort')
      default:
        return ''
    }
  }

  if (type === 'search') {
    return (
      <TextField
        fullWidth
        label={getLabel()}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        size="small"
      />
    )
  }

  return (
    <TextField
      select
      fullWidth
      label={getLabel()}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small"
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {t(option.label)}
        </MenuItem>
      ))}
    </TextField>
  )
}
