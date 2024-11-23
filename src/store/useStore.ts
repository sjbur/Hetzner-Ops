import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ServerFilters {
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

export const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        filters: initialFilters,
        setFilters: (newFilters) =>
          set((state) => ({
            filters: { ...state.filters, ...newFilters },
          })),
        resetFilters: () => set({ filters: initialFilters }),
      }),
      {
        name: 'hetzner-admin-storage',
      },
    ),
  ),
)
