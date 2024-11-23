import { Box, Card, CardContent, Skeleton } from '@mui/material'

export function MetricsSkeleton() {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" width={300} height={40} sx={{ mb: 3 }} />

        <Box sx={{ height: 300 }}>
          <Skeleton variant="rectangular" height="100%" />
        </Box>
      </CardContent>
    </Card>
  )
}
