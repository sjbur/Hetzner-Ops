import { Box, Button, Stack, Typography } from '@mui/material'
import { useStore } from '../store/useStore'
import { useApi } from '../hooks/useApi'

interface Todo {
  id: number
  title: string
  completed: boolean
}

export function HomePage() {
  const { count, increment, decrement } = useStore()
  const { data: todos, isLoading, error } = useApi<Todo[]>('/todos')

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>

      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Counter: {count}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={increment}>
              Increment
            </Button>
            <Button variant="outlined" onClick={decrement}>
              Decrement
            </Button>
          </Stack>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Todos from API:
          </Typography>
          <Stack spacing={1}>
            {todos?.slice(0, 5).map((todo) => (
              <Typography key={todo.id}>
                {todo.completed ? '✓' : '○'} {todo.title}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
