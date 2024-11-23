import { Box, Skeleton } from '@mui/material'

export function FiltersSkeleton() {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'flex-end' }}>
      <Skeleton variant="rounded" width={200} height={40} />
      <Skeleton variant="rounded" width={120} height={40} />
      <Skeleton variant="rounded" width={120} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
    </Box>
  )
}
