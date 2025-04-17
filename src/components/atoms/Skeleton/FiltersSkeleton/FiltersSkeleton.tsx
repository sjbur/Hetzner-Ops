import { Box, Skeleton, Paper } from '@mui/material'

export function FiltersSkeleton() {
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
      {/* Search field skeleton */}
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          minWidth: { xs: '100%', sm: 300 },
          flex: 2,
          height: 40,
        }}
      >
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Paper>

      {/* Status select skeleton */}
      <Skeleton variant="rounded" width={180} height={40} sx={{ flex: 1 }} />

      {/* Sort by select skeleton */}
      <Skeleton variant="rounded" width={180} height={40} sx={{ flex: 1 }} />

      {/* Order select skeleton */}
      <Skeleton variant="rounded" width={180} height={40} sx={{ flex: 1 }} />
    </Box>
  )
}
