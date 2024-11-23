import { Box, Typography } from '@mui/material'
import { SSHKeys } from '@/components/SSHKeys/SSHKeys'

export function SecurityPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Security
      </Typography>
      <SSHKeys />
    </Box>
  )
}
