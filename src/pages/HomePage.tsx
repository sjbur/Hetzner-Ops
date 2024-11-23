import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  CircularProgress,
} from '@mui/material'
import { useServers } from '@hooks/useServers'

export function HomePage() {
  const { servers, isLoading, error } = useServers()

  if (error) return <Box p={3}>Failed to load servers: {error.message}</Box>
  if (isLoading)
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    )

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Hetzner Servers
      </Typography>

      <Grid container spacing={3}>
        {servers.map((server) => (
          <Grid item xs={12} md={6} lg={4} key={server.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {server.name}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={server.status}
                    color={server.status === 'running' ? 'success' : 'default'}
                    size="small"
                  />
                  <Chip
                    label={`ID: ${server.id}`}
                    variant="outlined"
                    size="small"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  IP: {server.public_net.ipv4.ip}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Type: {server.server_type.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Resources: {server.server_type.cores} CPU,{' '}
                  {server.server_type.memory}GB RAM, {server.server_type.disk}GB
                  Disk
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
