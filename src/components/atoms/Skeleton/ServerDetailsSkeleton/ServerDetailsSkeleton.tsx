import { Box, Card, CardContent, Grid, Skeleton } from '@mui/material'

export function ServerDetailsSkeleton() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="text" width={100} height={40} />
      </Box>

      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 3,
            }}
          >
            <Box>
              <Skeleton variant="text" width={300} height={40} />
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Skeleton variant="rounded" width={100} height={32} />
                <Skeleton variant="rounded" width={100} height={32} />
              </Box>
            </Box>
            <Skeleton variant="circular" width={40} height={40} />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Skeleton variant="text" width={100} height={24} />
              <Skeleton variant="text" width={200} height={24} sx={{ mb: 2 }} />

              <Skeleton variant="text" width={100} height={24} />
              <Skeleton variant="text" width={200} height={24} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Skeleton variant="text" width={100} height={24} />
              <Skeleton variant="text" width={200} height={24} sx={{ mb: 2 }} />

              <Skeleton variant="text" width={100} height={24} />
              <Skeleton variant="text" width={200} height={24} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3 }}>
        <Skeleton variant="rounded" width={300} height={48} />
        <Box sx={{ mt: 2 }}>
          <Card>
            <CardContent>
              <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={300} />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}
