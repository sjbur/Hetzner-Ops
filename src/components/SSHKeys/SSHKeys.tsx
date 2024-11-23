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
import { useState, useEffect, useCallback } from 'react'
import { hetznerService } from '@/services/hetznerService'
import type { SSHKey } from '@/types/hetzner'
import { useNotifications } from '@/hooks/useNotifications'
import { SSHKeysSkeleton } from '@/components/SSHKeysSkeleton/SSHKeysSkeleton'
import { useTranslation } from 'react-i18next'

export function SSHKeys() {
  const { t } = useTranslation()
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

  const fetchKeys = useCallback(async () => {
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
  }, [page, rowsPerPage])

  useEffect(() => {
    fetchKeys()
  }, [fetchKeys])

  const handleCreate = async () => {
    if (!formData.name || !formData.public_key) {
      setFormError(t('sshKeys.nameRequired'))
      return
    }

    try {
      await hetznerService.createSSHKey(formData)
      showSuccess(t('sshKeys.keyAdded'))
      await fetchKeys()
      setCreateDialogOpen(false)
      setFormData({ name: '', public_key: '' })
      setFormError('')
    } catch (error) {
      console.error('Failed to create SSH key:', error)
      showError(t('sshKeys.addingFailed'))
      setFormError(t('sshKeys.addingFailed'))
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await hetznerService.deleteSSHKey(id)
      showSuccess(t('sshKeys.keyDeleted'))
      await fetchKeys()
      setDeleteConfirmOpen(null)
    } catch (error) {
      console.error('Failed to delete SSH key:', error)
      showError(t('sshKeys.deletingFailed'))
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    showSuccess(t('notifications.copySuccess'))
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
          <Typography variant="h6">{t('sshKeys.title')}</Typography>
          <Button variant="contained" onClick={() => setCreateDialogOpen(true)}>
            {t('sshKeys.addKey')}
          </Button>
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('common.name')}</TableCell>
                <TableCell>{t('sshKeys.fingerprint')}</TableCell>
                <TableCell>{t('common.created')}</TableCell>
                <TableCell align="right">{t('common.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <SSHKeysSkeleton />
              ) : keys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    {t('sshKeys.noKeys')}
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
          labelRowsPerPage={t('common.rowsPerPage')}
          labelDisplayedRows={({ from, to }) =>
            t('common.displayedRows', { from, to })
          }
        />

        {/* Create Dialog */}
        <Dialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{t('sshKeys.addKey')}</DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
            >
              <TextField
                label={t('common.name')}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                error={Boolean(formError)}
                helperText={formError || t('sshKeys.nameHelp')}
                fullWidth
                required
              />
              <TextField
                label={t('sshKeys.publicKey')}
                value={formData.public_key}
                onChange={(e) =>
                  setFormData({ ...formData, public_key: e.target.value })
                }
                multiline
                rows={4}
                fullWidth
                required
                placeholder={t('sshKeys.publicKeyPlaceholder')}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleCreate} variant="contained">
              {t('common.create')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog
          open={deleteConfirmOpen !== null}
          onClose={() => setDeleteConfirmOpen(null)}
        >
          <DialogTitle>{t('common.confirm')}</DialogTitle>
          <DialogContent>{t('sshKeys.confirmDelete')}</DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmOpen(null)}>
              {t('common.cancel')}
            </Button>
            <Button
              onClick={() =>
                deleteConfirmOpen && handleDelete(deleteConfirmOpen)
              }
              color="error"
            >
              {t('common.delete')}
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  )
}
