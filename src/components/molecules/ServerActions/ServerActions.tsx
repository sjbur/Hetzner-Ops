import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { useState } from 'react'
import { hetznerService } from '@/services/hetznerService'
import type { Server } from '@/types/hetzner'
import { useNotifications } from '@/hooks/useNotifications'
import { useTranslation } from 'react-i18next'

interface ServerActionsProps {
  server: Server
  onActionComplete: () => void
}

export function ServerActions({
  server,
  onActionComplete,
}: ServerActionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { showSuccess, showError } = useNotifications()
  const { t } = useTranslation()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAction = async (
    action: () => Promise<void>,
    successMessage: string,
  ) => {
    try {
      await action()
      showSuccess(successMessage)
      onActionComplete()
    } catch (error) {
      console.error('Action failed:', error)
      showError(t('notifications.operationFailed'))
    }
    handleClose()
  }

  const handleStart = () => {
    handleAction(
      () => hetznerService.startServer(server.id),
      t('notifications.serverStarted'),
    )
  }

  const handleStop = () => {
    handleAction(
      () => hetznerService.stopServer(server.id),
      t('notifications.serverStopped'),
    )
  }

  const handleReboot = () => {
    handleAction(
      () => hetznerService.rebootServer(server.id),
      t('notifications.serverRebooted'),
    )
  }

  const handleDelete = () => {
    handleAction(
      () => hetznerService.deleteServer(server.id),
      t('notifications.serverDeleted'),
    )
    setConfirmDelete(false)
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {server.status === 'stopped' && (
          <MenuItem onClick={handleStart}>{t('servers.start')}</MenuItem>
        )}
        {server.status === 'running' && (
          <MenuItem onClick={handleStop}>{t('servers.stop')}</MenuItem>
        )}
        <MenuItem onClick={handleReboot}>{t('servers.reboot')}</MenuItem>
        <MenuItem
          onClick={() => setConfirmDelete(true)}
          sx={{ color: 'error.main' }}
        >
          {t('servers.delete')}
        </MenuItem>
      </Menu>

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>{t('common.confirm')}</DialogTitle>
        <DialogContent>
          {t('servers.confirmDelete', { name: server.name })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleDelete} color="error">
            {t('common.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
