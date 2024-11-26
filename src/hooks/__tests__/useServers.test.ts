import { renderHook } from '@testing-library/react'
import { useServers } from '../useServers'
import { useApi } from '../useApi'
import { vi } from 'vitest'

// Мокаем useApi хук
vi.mock('../useApi', () => ({
  useApi: vi.fn(),
}))

describe('useServers', () => {
  const mockServers = {
    servers: [
      { id: 1, name: 'Server 1' },
      { id: 2, name: 'Server 2' },
    ],
    meta: {
      pagination: {
        page: 1,
        per_page: 25,
        total_entries: 2,
      },
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return servers data', async () => {
    vi.mocked(useApi).mockReturnValue({
      data: mockServers,
      error: undefined,
      isLoading: false,
      mutate: vi.fn(),
    })

    const { result } = renderHook(() => useServers())

    expect(result.current.servers).toEqual(mockServers.servers)
    expect(result.current.meta).toEqual(mockServers.meta)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeUndefined()
  })

  it('should handle loading state', () => {
    vi.mocked(useApi).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      mutate: vi.fn(),
    })

    const { result } = renderHook(() => useServers())

    expect(result.current.servers).toEqual([])
    expect(result.current.isLoading).toBe(true)
  })

  it('should handle error state', () => {
    const error = new Error('Failed to fetch servers')
    vi.mocked(useApi).mockReturnValue({
      data: undefined,
      error,
      isLoading: false,
      mutate: vi.fn(),
    })

    const { result } = renderHook(() => useServers())

    expect(result.current.servers).toEqual([])
    expect(result.current.error).toBe(error)
  })

  it('should handle refresh', async () => {
    const mutateMock = vi.fn()
    vi.mocked(useApi).mockReturnValue({
      data: mockServers,
      error: undefined,
      isLoading: false,
      mutate: mutateMock,
    })

    const { result } = renderHook(() => useServers())

    await result.current.refresh()
    expect(mutateMock).toHaveBeenCalled()
  })
})
