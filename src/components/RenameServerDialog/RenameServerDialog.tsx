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
  const [name, setName] = useState(currentName)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validateServerName = (name: string): string => {
    if (!name) {
      return 'Server name is required'
    }

    if (name.length > 63) {
      return 'Server name must be less than 64 characters'
    }

    if (!/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/i.test(name)) {
      return 'Server name may only contain letters, numbers, periods, and dashes, and must start and end with a letter or number'
    }

    if (/[.-]{2,}/.test(name)) {
      return 'Server name must not contain consecutive periods or dashes'
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
      setError('Failed to rename server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Rename Server</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Server Name"
          fullWidth
          value={name}
          onChange={handleNameChange}
          error={Boolean(error)}
          helperText={error || 'Use letters, numbers, periods, and dashes'}
          disabled={loading}
          inputProps={{
            pattern: '[a-zA-Z0-9.-]*',
            maxLength: 63,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading || Boolean(error) || name === currentName}
          variant="contained"
        >
          Rename
        </Button>
      </DialogActions>
    </Dialog>
  )
}
