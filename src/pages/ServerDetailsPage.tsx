import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Button,
  Tab,
  Tabs,
  IconButton,
} from '@mui/material'
import { ArrowBack, Edit as EditIcon } from '@mui/icons-material'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ServerMetrics } from '@/components/ServerMetrics/ServerMetrics'
import { ServerSnapshots } from '@/components/ServerSnapshots/ServerSnapshots'
import { ServerActions } from '@/components/ServerActions/ServerActions'
import { ServerDetailsSkeleton } from '@/components/ServerDetailsSkeleton/ServerDetailsSkeleton'
import { useApi } from '@/hooks/useApi'
import type { Server } from '@/types/hetzner'
import { RenameServerDialog } from '@/components/RenameServerDialog/RenameServerDialog'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`server-tabpanel-${index}`}
      aria-labelledby={`server-tab-${index}`}
      {...other}
      sx={{ mt: 2 }}
    >
      {value === index && children}
    </Box>
  )
}

export function ServerDetailsPage() {
  const { serverId } = useParams({ from: '/servers/$serverId' })
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0)
  const {
    data: server,
    isLoading,
    error,
    mutate: refresh,
  } = useApi<{ server: Server }>(`/servers/${serverId}`)
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)

  useEffect(() => {
    document.title = server ? `Server: ${server.server.name}` : 'Loading...'
    return () => {
      document.title = 'Hetzner Admin Panel'
    }
  }, [server])

  if (error) return <Box p={3}>Failed to load server: {error.message}</Box>
  if (isLoading) return <ServerDetailsSkeleton />

  const serverData = server?.server

  if (!serverData) return <Box p={3}>Server not found</Box>

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate({ to: '/' })}
          sx={{ mb: 2 }}
        >
          Back to Servers
        </Button>

        <Card>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    {serverData.name}
                  </Typography>
                  <IconButton
                    onClick={() => setRenameDialogOpen(true)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={serverData.status}
                    color={
                      serverData.status === 'running' ? 'success' : 'default'
                    }
                  />
                  <Chip label={`ID: ${serverData.id}`} variant="outlined" />
                </Box>
              </Box>
              <ServerActions server={serverData} onActionComplete={refresh} />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  IP Address
                </Typography>
                <Typography gutterBottom>
                  {serverData.public_net.ipv4.ip}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Location
                </Typography>
                <Typography gutterBottom>
                  {serverData.datacenter.location.city},{' '}
                  {serverData.datacenter.location.country}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Server Type
                </Typography>
                <Typography gutterBottom>
                  {serverData.server_type.name}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Resources
                </Typography>
                <Typography>
                  {serverData.server_type.cores} CPU •{' '}
                  {serverData.server_type.memory}
                  GB RAM • {serverData.server_type.disk}GB Disk
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
        >
          <Tab label="Metrics" />
          <Tab label="Snapshots" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <ServerMetrics serverId={serverData.id} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <ServerSnapshots
          serverId={serverData.id}
          serverName={serverData.name}
        />
      </TabPanel>

      <RenameServerDialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        onSuccess={refresh}
        currentName={serverData.name}
        serverId={serverData.id}
      />
    </Box>
  )
}
