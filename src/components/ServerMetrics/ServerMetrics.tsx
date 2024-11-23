import { Box, Card, CardContent, Typography, Tab, Tabs } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useState, useEffect } from 'react'
import { hetznerService } from '@/services/hetznerService'
import type { ServerMetrics as ServerMetricsType } from '@/types/hetzner'
import { MetricsSkeleton } from '@/components/MetricsSkeleton/MetricsSkeleton'
import { useTranslation } from 'react-i18next'

interface ServerMetricsProps {
  serverId: number
}

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
      id={`metrics-tabpanel-${index}`}
      {...other}
      sx={{ mt: 2 }}
    >
      {value === index && children}
    </Box>
  )
}

function formatBytes(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let unitIndex = 0
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex++
  }
  return `${value.toFixed(2)} ${units[unitIndex]}`
}

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString()
}

export function ServerMetrics({ serverId }: ServerMetricsProps) {
  const { t } = useTranslation()
  const [metrics, setMetrics] = useState<ServerMetricsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const end = new Date()
        const start = new Date(end.getTime() - 24 * 60 * 60 * 1000) // Last 24 hours
        const data = await hetznerService.getServerMetrics(serverId, start, end)
        setMetrics(data)
      } catch (error) {
        console.error('Failed to fetch metrics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [serverId])

  if (loading || !metrics) {
    return <MetricsSkeleton />
  }

  const { time_series } = metrics.metrics

  const firstMetric = Object.values(time_series)[0]
  if (!firstMetric) {
    return <Box>{t('metrics.noData')}</Box>
  }

  const chartData = firstMetric.values.map(([timestamp]) => {
    const cpuValue = time_series.cpu?.values.find(([t]) => t === timestamp)?.[1]
    const diskWriteValue = time_series['disk.0.iops.write']?.values.find(
      ([t]) => t === timestamp,
    )?.[1]
    const diskReadValue = time_series['disk.0.iops.read']?.values.find(
      ([t]) => t === timestamp,
    )?.[1]
    const networkInValue = time_series['network.0.bandwidth.in']?.values.find(
      ([t]) => t === timestamp,
    )?.[1]
    const networkOutValue = time_series['network.0.bandwidth.out']?.values.find(
      ([t]) => t === timestamp,
    )?.[1]

    return {
      time: formatTimestamp(timestamp),
      cpu: cpuValue ? parseFloat(cpuValue) : 0,
      diskWrite: diskWriteValue ? parseFloat(diskWriteValue) : 0,
      diskRead: diskReadValue ? parseFloat(diskReadValue) : 0,
      networkIn: networkInValue ? parseFloat(networkInValue) : 0,
      networkOut: networkOutValue ? parseFloat(networkOutValue) : 0,
    }
  })

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('metrics.title')}
        </Typography>

        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
        >
          <Tab label={t('metrics.cpu')} />
          <Tab label={t('metrics.disk')} />
          <Tab label={t('metrics.network')} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="cpu"
                  stroke="#8884d8"
                  name={t('metrics.cpuUsage')}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ height: 300 }}>
            <Typography variant="subtitle2" gutterBottom>
              {t('metrics.diskIops')}
            </Typography>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="diskRead"
                  stroke="#82ca9d"
                  name={t('metrics.diskRead')}
                />
                <Line
                  type="monotone"
                  dataKey="diskWrite"
                  stroke="#ffc658"
                  name={t('metrics.diskWrite')}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ height: 300 }}>
            <Typography variant="subtitle2" gutterBottom>
              {t('metrics.networkBandwidth')}
            </Typography>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis tickFormatter={(value) => formatBytes(value)} />
                <Tooltip formatter={(value: number) => formatBytes(value)} />
                <Line
                  type="monotone"
                  dataKey="networkIn"
                  stroke="#82ca9d"
                  name={t('metrics.networkIn')}
                />
                <Line
                  type="monotone"
                  dataKey="networkOut"
                  stroke="#ffc658"
                  name={t('metrics.networkOut')}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </TabPanel>
      </CardContent>
    </Card>
  )
}
