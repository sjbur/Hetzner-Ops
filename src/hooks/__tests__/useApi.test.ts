import { renderHook } from '@testing-library/react'
import { describe, it, vi, expect, Mock } from 'vitest'
import useSWR from 'swr'
import { useApi } from '../useApi'

vi.mock('swr', () => ({
  __esModule: true,
  default: vi.fn(),
}))

describe('useApi', () => {
  it('should return data on successful request', () => {
    const useSWRMock = useSWR as unknown as Mock
    const mockData = { id: 1, name: 'John Doe' }

    useSWRMock.mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
      mutate: vi.fn(),
    })

    const { result } = renderHook(() => useApi('/api/user'))

    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBeNull()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.mutate).toBeInstanceOf(Function)
  })

  it('should return error on failed request', () => {
    const useSWRMock = useSWR as unknown as Mock

    useSWRMock.mockReturnValue({
      data: null,
      error: new Error('Failed to fetch'),
      isLoading: false,
      mutate: vi.fn(),
    })

    const { result } = renderHook(() => useApi('/api/user'))

    expect(result.current.data).toBeNull()
    expect(result.current.error).toEqual(new Error('Failed to fetch'))
    expect(result.current.isLoading).toBe(false)
    expect(result.current.mutate).toBeInstanceOf(Function)
  })

  it('should return isLoading while fetching', () => {
    const useSWRMock = useSWR as unknown as Mock

    useSWRMock.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      mutate: vi.fn(),
    })

    const { result } = renderHook(() => useApi('/api/user'))

    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeNull()
    expect(result.current.isLoading).toBe(true)
    expect(result.current.mutate).toBeInstanceOf(Function)
  })

  it('should handle mutate correctly', async () => {
    const useSWRMock = useSWR as unknown as Mock
    const mockMutate = vi.fn()
    const initialData = { id: 1, name: 'John Doe' }
    const updatedData = { id: 1, name: 'Jane Doe' }

    useSWRMock.mockReturnValue({
      data: initialData,
      error: null,
      isLoading: false,
      mutate: mockMutate,
    })

    const { result } = renderHook(() => useApi('/api/user'))

    expect(result.current.data).toEqual(initialData)

    mockMutate.mockResolvedValueOnce(updatedData)

    await result.current.mutate()

    expect(mockMutate).toHaveBeenCalled()
  })
})
