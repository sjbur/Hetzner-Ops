import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Tooltip,
} from '@mui/material'
import {
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { hetznerService } from '@/services/hetznerService'
import type { SSHKey } from '@/types/hetzner'
import { useNotifications } from '@/hooks/useNotifications'

export function SSHKeys() {
  const [keys, setKeys] = useState<SSHKey[]>([])
  const [loading, setLoading] = useState(true)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<number | null>(
    null,
  )
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [formData, setFormData] = useState({
    name: '',
    public_key: '',
  })
  const [formError, setFormError] = useState('')
  const { showSuccess, showError } = useNotifications()

  const fetchKeys = async () => {
    try {
      const response = await hetznerService.getSSHKeys({
        page: page + 1,
        per_page: rowsPerPage,
        sort: 'name:asc',
      })
      setKeys(response.ssh_keys)
    } catch (error) {
      console.error('Failed to fetch SSH keys:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKeys()
  }, [fetchKeys, page, rowsPerPage])

  const handleCreate = async () => {
    if (!formData.name || !formData.public_key) {
      setFormError('Name and public key are required')
      return
    }

    try {
      await hetznerService.createSSHKey(formData)
      showSuccess('SSH key added successfully')
      await fetchKeys()
      setCreateDialogOpen(false)
      setFormData({ name: '', public_key: '' })
      setFormError('')
    } catch (error) {
      console.error('Failed to create SSH key:', error)
      showError('Failed to add SSH key')
      setFormError('Failed to create SSH key')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await hetznerService.deleteSSHKey(id)
      showSuccess('SSH key deleted successfully')
      await fetchKeys()
      setDeleteConfirmOpen(null)
    } catch (error) {
      console.error('Failed to delete SSH key:', error)
      showError('Failed to delete SSH key')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6">SSH Keys</Typography>
          <Button variant="contained" onClick={() => setCreateDialogOpen(true)}>
            Add SSH Key
          </Button>
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Fingerprint</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : keys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No SSH keys found
                  </TableCell>
                </TableRow>
              ) : (
                keys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell>{key.name}</TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        {key.fingerprint}
                        <Tooltip title="Copy fingerprint">
                          <IconButton
                            size="small"
                            onClick={() => copyToClipboard(key.fingerprint)}
                          >
                            <CopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(key.created).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => setDeleteConfirmOpen(key.id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={-1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10))
            setPage(0)
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />

        {/* Create Dialog */}
        <Dialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add SSH Key</DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
            >
              <TextField
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                error={Boolean(formError)}
                helperText={formError}
                fullWidth
                required
              />
              <TextField
                label="Public Key"
                value={formData.public_key}
                onChange={(e) =>
                  setFormData({ ...formData, public_key: e.target.value })
                }
                multiline
                rows={4}
                fullWidth
                required
                placeholder="Paste your SSH public key here..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} variant="contained">
              Add Key
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteConfirmOpen !== null}
          onClose={() => setDeleteConfirmOpen(null)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this SSH key?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmOpen(null)}>Cancel</Button>
            <Button
              onClick={() =>
                deleteConfirmOpen && handleDelete(deleteConfirmOpen)
              }
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  )
}
