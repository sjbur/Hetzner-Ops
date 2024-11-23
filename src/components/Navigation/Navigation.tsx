import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { Link } from '@tanstack/react-router'

export function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
