import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material'
import { Sort, Clear } from '@mui/icons-material'
import { useStore } from '@/store/useStore'

export function ServerFilters() {
  const { filters, setFilters, resetFilters } = useStore()

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'flex-end' }}>
      <TextField
        label="Search servers"
        value={filters.search || ''}
        onChange={(e) => setFilters({ search: e.target.value })}
        size="small"
      />

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status || ''}
          label="Status"
          onChange={(e) => setFilters({ status: e.target.value })}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="running">Running</MenuItem>
          <MenuItem value="stopped">Stopped</MenuItem>
          <MenuItem value="starting">Starting</MenuItem>
          <MenuItem value="stopping">Stopping</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={filters.sortBy || ''}
          label="Sort by"
          onChange={(e) =>
            setFilters({
              sortBy: e.target.value as 'name' | 'created' | 'status',
            })
          }
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="created">Created</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </Select>
      </FormControl>

      <IconButton
        onClick={() =>
          setFilters({
            sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
          })
        }
        color={filters.sortBy ? 'primary' : 'default'}
      >
        <Sort />
      </IconButton>

      <IconButton onClick={resetFilters} color="primary">
        <Clear />
      </IconButton>
    </Box>
  )
}
