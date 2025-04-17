import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { ServerMetrics } from '@/components/molecules/ServerMetrics/ServerMetrics'
import { ServerSnapshots } from '@/components/organisms/ServerSnapshots/ServerSnapshots'
import { SSHKeys } from '@/components/molecules/SSHKeys/SSHKeys'

interface ServerDetailsProps {
  server: {
    id: number
    name: string
    status: string
    metrics: {
      cpu: number
      memory: number
      disk: number
    }
    snapshots: Array<{
      id: number
      name: string
      created: string
    }>
    sshKeys: Array<{
      id: number
      name: string
      fingerprint: string
    }>
  }
}

export const ServerDetails: React.FC<ServerDetailsProps> = ({ server }) => {
  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          {server.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Status: {server.status}
        </Typography>
      </Paper>

      <ServerMetrics serverId={server.id} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Snapshots
        </Typography>
        <ServerSnapshots serverId={server.id} serverName={server.name} />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          SSH Keys
        </Typography>
        <SSHKeys />
      </Box>
    </Box>
  )
}
