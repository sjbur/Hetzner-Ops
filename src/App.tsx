import { Box, Container, Typography, Button, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useStore } from './store/useStore'
import { useApi } from './hooks/useApi'

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

interface Todo {
  id: number
  title: string
  completed: boolean
}

function App() {
  const { count, increment, decrement } = useStore()
  const { data: todos, isLoading, error } = useApi<Todo[]>('/todos')

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          React + MUI v5 + Vite
        </Typography>

        <Stack spacing={2}>
          <Box>
            <Typography variant="h6">Zustand Counter: {count}</Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <StyledButton variant="contained" onClick={increment}>
                Increment
              </StyledButton>
              <Button variant="outlined" onClick={decrement}>
                Decrement
              </Button>
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6">SWR Data Fetching:</Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              {todos
                ?.slice(0, 5)
                .map((todo) => (
                  <Typography key={todo.id}>{todo.title}</Typography>
                ))}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}

export default App
