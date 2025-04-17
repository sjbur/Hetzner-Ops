import React from 'react'
import { Card, CardContent, Typography, LinearProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface ServerMetricProps {
  title: string
  value: number
  max: number
  unit?: string
}

export const ServerMetric: React.FC<ServerMetricProps> = ({
  title,
  value,
  max,
  unit = '%',
}) => {
  const { t } = useTranslation()
  const percentage = (value / max) * 100

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t(title)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {value} {unit}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </CardContent>
    </Card>
  )
}
