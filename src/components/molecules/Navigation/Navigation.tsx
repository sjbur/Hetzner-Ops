import React from 'react'
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
import { ThemeToggle } from '@/components/atoms/ThemeToggle/ThemeToggle'
import { LanguageToggle } from '@/components/atoms/LanguageToggle/LanguageToggle'
import {
  Home as HomeIcon,
  Security as SecurityIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Navigation: React.FC = () => {
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
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              color="inherit"
              startIcon={item.icon}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ThemeToggle />
          <LanguageToggle />
        </Box>
      </Toolbar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  )
}
