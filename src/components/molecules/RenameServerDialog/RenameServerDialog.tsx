import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { hetznerService } from '@/services/hetznerService'
import { useTranslation } from 'react-i18next'

interface RenameServerDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  currentName: string
  serverId: number
}

export function RenameServerDialog({
  open,
  onClose,
  onSuccess,
  currentName,
  serverId,
}: RenameServerDialogProps) {
  const { t } = useTranslation()
  const [name, setName] = useState(currentName)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validateServerName = (name: string): string => {
    if (!name) {
      return t('serverDetails.serverNameValidation.required')
    }

    if (name.length > 63) {
      return t('serverDetails.serverNameValidation.maxLength')
    }

    if (!/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/i.test(name)) {
      return t('serverDetails.serverNameValidation.format')
    }

    if (/[.-]{2,}/.test(name)) {
      return t('serverDetails.serverNameValidation.consecutive')
    }

    return ''
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    setError(validateServerName(newName))
  }

  const handleSubmit = async () => {
    if (error) return

    setLoading(true)
    try {
      await hetznerService.renameServer(serverId, name)
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Failed to rename server:', error)
      setError(t('notifications.operationFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('serverDetails.renameServer')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t('servers.serverName')}
          fullWidth
          value={name}
          onChange={handleNameChange}
          error={Boolean(error)}
          helperText={error || t('serverDetails.serverNameHelp')}
          disabled={loading}
          inputProps={{
            pattern: '[a-zA-Z0-9.-]*',
            maxLength: 63,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {t('common.cancel')}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading || Boolean(error) || name === currentName}
          variant="contained"
        >
          {t('common.save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
