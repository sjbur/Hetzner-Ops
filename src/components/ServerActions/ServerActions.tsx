import {
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material'
import {
  PlayArrow,
  Stop,
  Refresh,
  Delete,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material'
import { useState } from 'react'
import { hetznerService } from '@/services/hetznerService'
import type { Server } from '@/types/hetzner'
import { motion, AnimatePresence } from 'framer-motion'
import { useNotifications } from '@/hooks/useNotifications'

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
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useNotifications()

  const handleAction = async (
    action: () => Promise<void>,
    actionName: string,
  ) => {
    setLoading(true)
    try {
      await action()
      showSuccess(`Server ${actionName} successful`)
      onActionComplete()
    } catch (error) {
      console.error('Action failed:', error)
      showError(`Failed to ${actionName.toLowerCase()} server`)
    } finally {
      setLoading(false)
      setAnchorEl(null)
    }
  }

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        disabled={loading}
        component={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MoreVertIcon />
      </IconButton>

      <AnimatePresence>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem
            onClick={() =>
              handleAction(() => hetznerService.startServer(server.id), 'start')
            }
            disabled={server.status === 'running'}
          >
            <PlayArrow sx={{ mr: 1 }} /> Start
          </MenuItem>

          <MenuItem
            onClick={() =>
              handleAction(() => hetznerService.stopServer(server.id), 'stop')
            }
            disabled={server.status === 'stopped'}
          >
            <Stop sx={{ mr: 1 }} /> Stop
          </MenuItem>

          <MenuItem
            onClick={() =>
              handleAction(
                () => hetznerService.rebootServer(server.id),
                'reboot',
              )
            }
          >
            <Refresh sx={{ mr: 1 }} /> Reboot
          </MenuItem>

          <MenuItem onClick={() => setConfirmDelete(true)}>
            <Delete sx={{ mr: 1 }} /> Delete
          </MenuItem>
        </Menu>
      </AnimatePresence>

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete server {server.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button
            onClick={() =>
              handleAction(() => hetznerService.deleteServer(server.id))
            }
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
