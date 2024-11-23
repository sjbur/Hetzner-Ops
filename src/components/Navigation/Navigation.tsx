import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { Link } from '@tanstack/react-router'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import {
  Home as HomeIcon,
  Security as SecurityIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
import { useState } from 'react'
import { LanguageToggle } from '@/components/LanguageToggle/LanguageToggle'
import { useTranslation } from 'react-i18next'

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const menuItems = [
    { path: '/', label: t('navigation.home'), icon: <HomeIcon /> },
    {
      path: '/security',
      label: t('navigation.security'),
      icon: <SecurityIcon />,
    },
    { path: '/about', label: t('navigation.about'), icon: <InfoIcon /> },
  ]

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          key={item.path}
          component={Link}
          to={item.path}
          onClick={handleDrawerToggle}
          sx={{ color: 'inherit', textDecoration: 'none' }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  )

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
          </>
        ) : (
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
                startIcon={item.icon}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <LanguageToggle />
          <ThemeToggle />
        </Box>
      </Toolbar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  )
}
