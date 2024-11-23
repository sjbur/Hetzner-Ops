import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
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
  Chip,
  TablePagination,
} from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { useState, useEffect, useCallback } from 'react'
import { hetznerService } from '@/services/hetznerService'
import type { Snapshot } from '@/types/hetzner'
import { SnapshotsSkeleton } from '@/components/SnapshotsSkeleton/SnapshotsSkeleton'
import { useNotifications } from '@/hooks/useNotifications'
import { useTranslation } from 'react-i18next'

interface ServerSnapshotsProps {
  serverId: number
  serverName: string
}

type SortValue = 'created:desc' | 'created:asc' | 'name:asc' | 'name:desc'

export function ServerSnapshots({ serverId }: ServerSnapshotsProps) {
  const { t } = useTranslation()
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [loading, setLoading] = useState(true)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<number | null>(
    null,
  )
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sort] = useState<SortValue>('created:desc')
  const { showSuccess, showError, showWarning } = useNotifications()

  const fetchSnapshots = useCallback(async () => {
    try {
      const response = await hetznerService.getSnapshots({
        sort,
        page: page + 1,
        per_page: rowsPerPage,
        status: 'available',
      })

      const filteredSnapshots = response.images
        .filter((image) => image.created_from?.id === Number(serverId))
        .map(
          (image): Snapshot => ({
            id: image.id,
            name: image.name,
            description: image.description,
            created: image.created,
            image_size: image.image_size,
            server_id: image.created_from?.id || 0,
            server_name: image.created_from?.name || '',
            status: image.status as 'creating' | 'available',
          }),
        )

      setSnapshots(filteredSnapshots)
    } catch (error) {
      console.error('Failed to fetch snapshots:', error)
    } finally {
      setLoading(false)
    }
  }, [serverId, page, rowsPerPage, sort])

  useEffect(() => {
    fetchSnapshots()
  }, [fetchSnapshots])

  const handleCreateSnapshot = async () => {
    showWarning('Creating snapshot... This may take a few minutes')
    try {
      await hetznerService.createSnapshot(serverId, {
        description,
      })
      showSuccess('Snapshot created successfully')
      await fetchSnapshots()
      setCreateDialogOpen(false)
      setDescription('')
    } catch (error) {
      console.error('Failed to create snapshot:', error)
      showError('Failed to create snapshot')
    }
  }

  const handleDeleteSnapshot = async (snapshotId: number) => {
    try {
      await hetznerService.deleteSnapshot(snapshotId)
      showSuccess('Snapshot deleted successfully')
      await fetchSnapshots()
      setDeleteConfirmOpen(null)
    } catch (error) {
      console.error('Failed to delete snapshot:', error)
      showError('Failed to delete snapshot')
    }
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
          <Typography variant="h6">{t('snapshots.title')}</Typography>
          <Button variant="contained" onClick={() => setCreateDialogOpen(true)}>
            {t('snapshots.createSnapshot')}
          </Button>
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('common.name')}</TableCell>
                <TableCell>{t('common.description')}</TableCell>
                <TableCell>{t('common.created')}</TableCell>
                <TableCell>{t('common.size')}</TableCell>
                <TableCell>{t('common.status')}</TableCell>
                <TableCell align="right">{t('common.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <SnapshotsSkeleton />
              ) : snapshots.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {t('snapshots.noSnapshots')}
                  </TableCell>
                </TableRow>
              ) : (
                snapshots.map((snapshot) => (
                  <TableRow key={snapshot.id}>
                    <TableCell>{snapshot.id}</TableCell>
                    <TableCell>{snapshot.description || '-'}</TableCell>
                    <TableCell>
                      {new Date(snapshot.created).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {snapshot.image_size
                        ? `${snapshot.image_size.toFixed(2)} GB`
                        : t('common.notAvailable')}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={t(`common.${snapshot.status}`)}
                        color={
                          snapshot.status === 'available'
                            ? 'success'
                            : 'warning'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => setDeleteConfirmOpen(snapshot.id)}
                        disabled={snapshot.status !== 'available'}
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

        {/* Create Dialog */}
        <Dialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
        >
          <DialogTitle>{t('snapshots.createSnapshot')}</DialogTitle>
          <DialogContent>
            <Typography color="warning.main" gutterBottom>
              {t('snapshots.warningMessage')}
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              label={t('common.description')}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              helperText={t('snapshots.descriptionHelp')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              onClick={handleCreateSnapshot}
              variant="contained"
              color="warning"
            >
              {t('snapshots.createSnapshot')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog
          open={deleteConfirmOpen !== null}
          onClose={() => setDeleteConfirmOpen(null)}
        >
          <DialogTitle>{t('common.confirm')}</DialogTitle>
          <DialogContent>{t('snapshots.confirmDelete')}</DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmOpen(null)}>
              {t('common.cancel')}
            </Button>
            <Button
              onClick={() =>
                deleteConfirmOpen && handleDeleteSnapshot(deleteConfirmOpen)
              }
              color="error"
            >
              {t('common.delete')}
            </Button>
          </DialogActions>
        </Dialog>

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
      </CardContent>
    </Card>
  )
}
