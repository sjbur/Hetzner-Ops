import { Box, Typography } from '@mui/material'

export function AboutPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        About Page
      </Typography>
      <Typography>
        This is a demo application using React, MUI, TanStack Router, and more.
      </Typography>
    </Box>
  )
}
