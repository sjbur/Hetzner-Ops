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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

interface ServerSnapshotsProps {
  serverId: number
  serverName: string
}

type SortValue = 'created:desc' | 'created:asc' | 'name:asc' | 'name:desc'

export function ServerSnapshots({ serverId }: ServerSnapshotsProps) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [loading, setLoading] = useState(true)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<number | null>(
    null,
  )
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sort, setSort] = useState<SortValue>('created:desc')

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
    try {
      await hetznerService.createSnapshot(serverId, {
        description,
      })
      await fetchSnapshots()
      setCreateDialogOpen(false)
      setDescription('')
    } catch (error) {
      console.error('Failed to create snapshot:', error)
    }
  }

  const handleDeleteSnapshot = async (snapshotId: number) => {
    try {
      await hetznerService.deleteSnapshot(snapshotId)
      await fetchSnapshots()
      setDeleteConfirmOpen(null)
    } catch (error) {
      console.error('Failed to delete snapshot:', error)
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
          <Typography variant="h6">Snapshots</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sort}
                label="Sort by"
                onChange={(e) => setSort(e.target.value as SortValue)}
              >
                <MenuItem value="created:desc">Newest first</MenuItem>
                <MenuItem value="created:asc">Oldest first</MenuItem>
                <MenuItem value="name:asc">Name (A-Z)</MenuItem>
                <MenuItem value="name:desc">Name (Z-A)</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={() => setCreateDialogOpen(true)}
            >
              Create Snapshot
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <SnapshotsSkeleton />
              ) : snapshots.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No snapshots available
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
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={snapshot.status}
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

        {/* Create Snapshot Dialog */}
        <Dialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
        >
          <DialogTitle>Create Snapshot</DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 2 }}>
              <Typography color="warning.main" variant="body2" gutterBottom>
                Warning: To ensure data consistency, it is recommended to shut
                down the server before creating a snapshot.
              </Typography>
            </Box>
            <TextField
              autoFocus
              margin="dense"
              label="Description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              helperText="Optional description for the snapshot"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleCreateSnapshot}
              variant="contained"
              color="warning"
            >
              Create Snapshot
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
            Are you sure you want to delete this snapshot?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmOpen(null)}>Cancel</Button>
            <Button
              onClick={() =>
                deleteConfirmOpen && handleDeleteSnapshot(deleteConfirmOpen)
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
