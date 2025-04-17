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
  Paper,
} from '@mui/material'
import {
  FilterList as FilterIcon,
  Close as CloseIcon,
  Search as SearchIcon,
} from '@mui/icons-material'
import { useStore } from '@/store/useStore'
import { useState } from 'react'
import type { ServerFilters as ServerFiltersType } from '@/store/useStore'
import { useTranslation } from 'react-i18next'

export function ServerFilters() {
  const { filters, setFilters, resetFilters } = useStore()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation()

  const filterContent = (
    <>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: '4px',
          minWidth: { xs: '100%', sm: 300 },
          flex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          height: 40,
        }}
      >
        <SearchIcon color="action" sx={{ ml: 1 }} />
        <TextField
          placeholder={t('filters.search')}
          value={filters.search || ''}
          onChange={(e) => setFilters({ search: e.target.value })}
          fullWidth
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: { height: '100%' },
          }}
        />
      </Paper>

      <FormControl size="small" sx={{ minWidth: 180, flex: 1 }}>
        <InputLabel>{t('filters.status')}</InputLabel>
        <Select
          value={filters.status || ''}
          label={t('filters.status')}
          onChange={(e) => setFilters({ status: e.target.value })}
        >
          <MenuItem value="">{t('filters.all')}</MenuItem>
          <MenuItem value="running">{t('filters.running')}</MenuItem>
          <MenuItem value="stopped">{t('filters.stopped')}</MenuItem>
          <MenuItem value="starting">{t('filters.starting')}</MenuItem>
          <MenuItem value="stopping">{t('filters.stopping')}</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 180, flex: 1 }}>
        <InputLabel>{t('filters.sortBy')}</InputLabel>
        <Select
          value={filters.sortBy || ''}
          label={t('filters.sortBy')}
          onChange={(e) =>
            setFilters({
              sortBy: e.target.value as ServerFiltersType['sortBy'],
            })
          }
        >
          <MenuItem value="">{t('filters.all')}</MenuItem>
          <MenuItem value="name">{t('common.name')}</MenuItem>
          <MenuItem value="status">{t('common.status')}</MenuItem>
          <MenuItem value="created">{t('common.created')}</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 180, flex: 1 }}>
        <InputLabel>{t('filters.order')}</InputLabel>
        <Select
          value={filters.sortOrder}
          label={t('filters.order')}
          onChange={(e) =>
            setFilters({ sortOrder: e.target.value as 'asc' | 'desc' })
          }
        >
          <MenuItem value="asc">{t('filters.ascending')}</MenuItem>
          <MenuItem value="desc">{t('filters.descending')}</MenuItem>
        </Select>
      </FormControl>

      {isMobile && (
        <Button
          variant="contained"
          onClick={() => setMobileFiltersOpen(false)}
          sx={{ mt: 2 }}
        >
          {t('filters.applyFilters')}
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
              {t('filters.clearFilters')}
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
              <Typography variant="h6">{t('filters.filters')}</Typography>
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
        alignItems: 'flex-start',
      }}
    >
      {filterContent}
      {(filters.search || filters.status || filters.sortBy) && (
        <Button
          size="small"
          onClick={resetFilters}
          variant="outlined"
          sx={{ height: 40 }}
        >
          {t('filters.clearFilters')}
        </Button>
      )}
    </Box>
  )
}
