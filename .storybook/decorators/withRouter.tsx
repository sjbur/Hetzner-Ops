import React from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from '../../src/routeTree.gen'

// Create a mock router instance
const router = createRouter({ routeTree })

// Initialize the router
router.load()

export const withRouter = (Story: React.ComponentType) => {
  return (
    <RouterProvider router={router}>
      <Story />
    </RouterProvider>
  )
}
