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

  const handleAction = async (action: () => Promise<void>) => {
    setLoading(true)
    try {
      await action()
      onActionComplete()
    } catch (error) {
      console.error('Action failed:', error)
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
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() =>
            handleAction(() => hetznerService.startServer(server.id))
          }
          disabled={server.status === 'running'}
        >
          <PlayArrow sx={{ mr: 1 }} /> Start
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleAction(() => hetznerService.stopServer(server.id))
          }
          disabled={server.status === 'stopped'}
        >
          <Stop sx={{ mr: 1 }} /> Stop
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleAction(() => hetznerService.rebootServer(server.id))
          }
        >
          <Refresh sx={{ mr: 1 }} /> Reboot
        </MenuItem>

        <MenuItem onClick={() => setConfirmDelete(true)}>
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

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
