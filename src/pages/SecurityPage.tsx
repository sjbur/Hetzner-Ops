import { Box, Typography } from '@mui/material'
import { SSHKeys } from '@/components/molecules/SSHKeys/SSHKeys'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function SecurityPage() {
  const { t } = useTranslation()

  return (
    <Box sx={{ p: 3 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Typography variant="h4" gutterBottom>
          {t('navigation.security')}
        </Typography>
        <SSHKeys />
      </motion.div>
    </Box>
  )
}
