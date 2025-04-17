import React, { useEffect, useState } from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { ServerMetric } from '@/components/atoms/ServerMetric/ServerMetric'
import { useTranslation } from 'react-i18next'
import { MetricsSkeleton } from '@/components/atoms/Skeleton/MetricsSkeleton/MetricsSkeleton'
import { hetznerService } from '@/services/hetznerService'
import type { ServerMetrics as ServerMetricsType } from '@/types/hetzner'

interface ServerMetricsProps {
  serverId: number
}

export const ServerMetrics: React.FC<ServerMetricsProps> = ({ serverId }) => {
  const { t } = useTranslation()
  const [metrics, setMetrics] = useState<ServerMetricsType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true)
        const end = new Date()
        const start = new Date(end.getTime() - 24 * 60 * 60 * 1000) // Last 24 hours
        const data = await hetznerService.getServerMetrics(serverId, start, end)
        setMetrics(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMetrics()
  }, [serverId])

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">
          {t('common.error')}: {error.message}
        </Typography>
      </Box>
    )
  }

  if (isLoading) {
    return <MetricsSkeleton />
  }

  if (!metrics) {
    return (
      <Box p={2}>
        <Typography color="text.secondary">{t('metrics.noData')}</Typography>
      </Box>
    )
  }

  // Calculate average values from time series
  const calculateAverage = (values: Array<[number, string]> | undefined) => {
    if (!values || values.length === 0) return 0
    const sum = values.reduce((acc, [_, value]) => acc + parseFloat(value), 0)
    return Math.round((sum / values.length) * 100) / 100
  }

  const cpu = calculateAverage(metrics.metrics.time_series.cpu?.values)
  const diskRead = calculateAverage(
    metrics.metrics.time_series['disk.0.iops.read']?.values,
  )
  const diskWrite = calculateAverage(
    metrics.metrics.time_series['disk.0.iops.write']?.values,
  )
  const networkIn = calculateAverage(
    metrics.metrics.time_series['network.0.bandwidth.in']?.values,
  )
  const networkOut = calculateAverage(
    metrics.metrics.time_series['network.0.bandwidth.out']?.values,
  )

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <ServerMetric title="metrics.cpuUsage" value={cpu} max={100} unit="%" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ServerMetric
          title="metrics.diskIops"
          value={diskRead + diskWrite}
          max={1000}
          unit="IOPS"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ServerMetric
          title="metrics.networkBandwidth"
          value={networkIn + networkOut}
          max={1000}
          unit="Mbps"
        />
      </Grid>
    </Grid>
  )
}
