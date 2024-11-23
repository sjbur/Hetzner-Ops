import { Box, Container, Typography, Button, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          React + MUI v5 + Vite
        </Typography>
        <Stack spacing={2} direction="row">
          <StyledButton variant="contained">Styled Button</StyledButton>
          <Button variant="outlined">Regular Button</Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default App
