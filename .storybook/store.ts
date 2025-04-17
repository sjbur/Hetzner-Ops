import { create } from 'zustand'

export interface ServerFilters {
  status?: string
  search?: string
  sortBy?: 'name' | 'created' | 'status'
  sortOrder: 'asc' | 'desc'
}

interface Store {
  filters: ServerFilters
  setFilters: (filters: Partial<ServerFilters>) => void
  resetFilters: () => void
}

const initialFilters: ServerFilters = {
  status: undefined,
  search: undefined,
  sortBy: undefined,
  sortOrder: 'asc',
}

export const useStorybookStore = create<Store>()((set) => ({
  filters: initialFilters,
  setFilters: (newFilters) => {
    console.log('[Storybook Store] Setting filters:', newFilters)
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }))
  },
  resetFilters: () => {
    console.log('[Storybook Store] Resetting filters')
    set({ filters: initialFilters })
  },
}))
