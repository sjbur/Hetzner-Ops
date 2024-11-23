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
import { ServerActions } from '@/components/ServerActions/ServerActions'
import { ServerFilters } from '@/components/ServerFilters/ServerFilters'
import { useStore } from '@/store/useStore'

export function HomePage() {
  const { servers, isLoading, error, refresh } = useServers()
  const { filters } = useStore()

  // Apply filters and sorting
  const filteredServers = servers
    .filter((server) => {
      if (filters.status && server.status !== filters.status) return false
      if (
        filters.search &&
        !server.name.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false
      return true
    })
    .sort((a, b) => {
      if (!filters.sortBy) return 0
      const order = filters.sortOrder === 'asc' ? 1 : -1

      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name) * order
        case 'created':
          return (
            (new Date(a.created).getTime() - new Date(b.created).getTime()) *
            order
          )
        case 'status':
          return a.status.localeCompare(b.status) * order
        default:
          return 0
      }
    })

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

      <ServerFilters />

      <Grid container spacing={3}>
        {filteredServers.map((server) => (
          <Grid item xs={12} md={6} lg={4} key={server.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" gutterBottom>
                    {server.name}
                  </Typography>
                  <ServerActions server={server} onActionComplete={refresh} />
                </Box>

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
