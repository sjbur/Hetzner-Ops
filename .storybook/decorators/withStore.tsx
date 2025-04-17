import React from 'react'
import { useStorybookStore } from '../store'

export const withStore = (Story: React.ComponentType) => {
  console.log('[Storybook] Initializing store decorator')

  // Initialize the store
  useStorybookStore.setState({
    filters: {
      status: undefined,
      search: undefined,
      sortBy: undefined,
      sortOrder: 'asc',
    },
  })

  console.log('[Storybook] Store initialized:', useStorybookStore.getState())
  return <Story />
}
