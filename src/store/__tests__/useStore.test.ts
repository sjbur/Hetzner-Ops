import { renderHook, act } from '@testing-library/react'
import { useStore, type ServerFilters } from '../useStore'

const initialFilters: ServerFilters = {
  status: undefined,
  search: undefined,
  sortBy: undefined,
  sortOrder: 'asc',
}

describe('useStore', () => {
  beforeEach(() => {
    // Clear state before each test
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.resetFilters()
    })
  })

  it('should initialize with default filters', () => {
    const { result } = renderHook(() => useStore())
    expect(result.current.filters).toEqual(initialFilters)
  })

  it('should set filters', () => {
    const { result } = renderHook(() => useStore())

    const newFilters: Partial<ServerFilters> = {
      status: 'running',
      search: 'test',
      sortBy: 'name',
      sortOrder: 'desc',
    }

    act(() => {
      result.current.setFilters(newFilters)
    })

    expect(result.current.filters).toEqual({
      ...initialFilters,
      ...newFilters,
    })
  })

  it('should reset filters', () => {
    const { result } = renderHook(() => useStore())

    // First, set some filters
    act(() => {
      result.current.setFilters({
        status: 'running',
        search: 'test',
      })
    })

    // Then reset
    act(() => {
      result.current.resetFilters()
    })

    expect(result.current.filters).toEqual(initialFilters)
  })

  it('should partially update filters', () => {
    const { result } = renderHook(() => useStore())

    // Set initial filters
    act(() => {
      result.current.setFilters({
        status: 'running',
        search: 'test',
        sortBy: 'name',
        sortOrder: 'desc',
      })
    })

    // Update only part of the filters
    act(() => {
      result.current.setFilters({
        search: 'new search',
        sortOrder: 'asc',
      })
    })

    // Check that only specified fields were updated
    expect(result.current.filters).toEqual({
      status: 'running',
      search: 'new search',
      sortBy: 'name',
      sortOrder: 'asc',
    })
  })

  it('should persist filters between renders', () => {
    const { result, rerender } = renderHook(() => useStore())

    // Set filters
    act(() => {
      result.current.setFilters({
        status: 'running',
        search: 'test',
      })
    })

    // Re-render hook
    rerender()

    // Check that filters were preserved
    expect(result.current.filters).toEqual({
      ...initialFilters,
      status: 'running',
      search: 'test',
    })
  })
})
