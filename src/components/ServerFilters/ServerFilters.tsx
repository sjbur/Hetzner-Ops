import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Drawer,
  Button,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material'
import {
  FilterList as FilterIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import { useStore } from '@/store/useStore'
import { useState } from 'react'
import type { ServerFilters as ServerFiltersType } from '@/store/useStore'

export function ServerFilters() {
  const { filters, setFilters, resetFilters } = useStore()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const filterContent = (
    <>
      <TextField
        size="small"
        label="Search"
        value={filters.search || ''}
        onChange={(e) => setFilters({ search: e.target.value })}
        sx={{ minWidth: 200 }}
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
        <InputLabel>Sort By</InputLabel>
        <Select
          value={filters.sortBy || ''}
          label="Sort By"
          onChange={(e) =>
            setFilters({
              sortBy: e.target.value as ServerFiltersType['sortBy'],
            })
          }
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="status">Status</MenuItem>
          <MenuItem value="created">Created</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Order</InputLabel>
        <Select
          value={filters.sortOrder}
          label="Order"
          onChange={(e) =>
            setFilters({ sortOrder: e.target.value as 'asc' | 'desc' })
          }
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>

      {isMobile && (
        <Button
          variant="contained"
          onClick={() => setMobileFiltersOpen(false)}
          sx={{ mt: 2 }}
        >
          Apply Filters
        </Button>
      )}
    </>
  )

  if (isMobile) {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <IconButton onClick={() => setMobileFiltersOpen(true)}>
            <FilterIcon />
          </IconButton>
          {(filters.search || filters.status || filters.sortBy) && (
            <Button size="small" onClick={resetFilters}>
              Clear Filters
            </Button>
          )}
        </Box>

        <Drawer
          anchor="bottom"
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          PaperProps={{
            sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h6">Filters</Typography>
              <IconButton
                onClick={() => setMobileFiltersOpen(false)}
                size="small"
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {filterContent}
            </Box>
          </Box>
        </Drawer>
      </>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {filterContent}
      {(filters.search || filters.status || filters.sortBy) && (
        <Button size="small" onClick={resetFilters}>
          Clear Filters
        </Button>
      )}
    </Box>
  )
}
