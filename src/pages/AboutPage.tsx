import { Box, Typography, Paper } from '@mui/material'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function AboutPage() {
  const { t } = useTranslation()

  const features = t('about.features.list', { returnObjects: true }) as string[]
  const technologies = t('about.technologies.list', {
    returnObjects: true,
  }) as string[]

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Typography variant="h4" gutterBottom>
          {t('about.title')}
        </Typography>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('about.projectDescription.title')}
          </Typography>
          <Typography paragraph>
            {t('about.projectDescription.content')}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            {t('about.features.title')}
          </Typography>
          <ul>
            {features.map((feature: string, index: number) => (
              <Typography key={index} component="li" sx={{ mb: 1 }}>
                {feature}
              </Typography>
            ))}
          </ul>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            {t('about.technologies.title')}
          </Typography>
          <ul>
            {technologies.map((tech: string, index: number) => (
              <Typography key={index} component="li" sx={{ mb: 1 }}>
                {tech}
              </Typography>
            ))}
          </ul>
        </Paper>
      </motion.div>
    </Box>
  )
}
