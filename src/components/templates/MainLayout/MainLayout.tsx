import React from 'react'
import { Box, Container } from '@mui/material'
import { Navigation } from '@/components/molecules/Navigation/Navigation'
import { LanguageToggle } from '@/components/atoms/LanguageToggle/LanguageToggle'
import { ThemeToggle } from '@/components/atoms/ThemeToggle/ThemeToggle'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, gap: 2 }}>
        <LanguageToggle />
        <ThemeToggle />
      </Box>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  )
}
