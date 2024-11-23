import { Card, CardContent, Grid, Skeleton, Box } from '@mui/material'

export function ServerSkeleton() {
  return (
    <>
      {[1, 2, 3].map((key) => (
        <Grid item xs={12} md={6} lg={4} key={key}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="circular" width={40} height={40} />
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mb: 2, mt: 1 }}>
                <Skeleton variant="rounded" width={80} height={24} />
                <Skeleton variant="rounded" width={80} height={24} />
              </Box>

              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="30%" />
              <Skeleton variant="text" width="70%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  )
}
