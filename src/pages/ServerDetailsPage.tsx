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
  Tooltip,
} from '@mui/material'
import { ArrowBack, Edit as EditIcon } from '@mui/icons-material'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ServerMetrics } from '@/components/molecules/ServerMetrics/ServerMetrics'
import { ServerSnapshots } from '@/components/organisms/ServerSnapshots/ServerSnapshots'
import { ServerActions } from '@/components/molecules/ServerActions/ServerActions'
import { ServerDetailsSkeleton } from '@/components/atoms/Skeleton/ServerDetailsSkeleton/ServerDetailsSkeleton'
import { useApi } from '@/hooks/useApi'
import type { Server } from '@/types/hetzner'
import { RenameServerDialog } from '@/components/molecules/RenameServerDialog/RenameServerDialog'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  useEffect(() => {
    document.title = server ? `Server: ${server.server.name}` : 'Loading...'
    return () => {
      document.title = 'Hetzner Admin Panel'
    }
  }, [server])

  if (error)
    return (
      <Box p={3}>
        {t('common.error')}: {error.message}
      </Box>
    )
  if (isLoading) return <ServerDetailsSkeleton />

  const serverData = server?.server

  if (!serverData) return <Box p={3}>{t('servers.notFound')}</Box>

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate({ to: '/' })}
          sx={{ mb: 2 }}
        >
          {t('common.back')}
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
                  <Tooltip title={t('serverDetails.renameServer')}>
                    <IconButton
                      onClick={() => setRenameDialogOpen(true)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={t(`filters.${serverData.status}`)}
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
                  {t('common.ipAddress')}
                </Typography>
                <Typography gutterBottom>
                  {serverData.public_net.ipv4.ip}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  {t('common.location')}
                </Typography>
                <Typography gutterBottom>
                  {serverData.datacenter.location.city},{' '}
                  {serverData.datacenter.location.country}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  {t('common.serverType')}
                </Typography>
                <Typography gutterBottom>
                  {serverData.server_type.name}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  {t('common.resources')}
                </Typography>
                <Typography>
                  {serverData.server_type.cores} {t('common.cores')} •{' '}
                  {serverData.server_type.memory}GB {t('common.memory')} •{' '}
                  {serverData.server_type.disk}GB {t('common.disk')}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
          >
            <Tab label={t('common.metrics')} />
            <Tab label={t('servers.snapshots')} />
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
      </motion.div>

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
