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
    // Очищаем состояние перед каждым тестом
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

    // Сначала устанавливаем какие-то фильтры
    act(() => {
      result.current.setFilters({
        status: 'running',
        search: 'test',
      })
    })

    // Затем сбрасываем
    act(() => {
      result.current.resetFilters()
    })

    expect(result.current.filters).toEqual(initialFilters)
  })

  it('should partially update filters', () => {
    const { result } = renderHook(() => useStore())

    // Устанавливаем начальные фильтры
    act(() => {
      result.current.setFilters({
        status: 'running',
        search: 'test',
        sortBy: 'name',
        sortOrder: 'desc',
      })
    })

    // Обновляем только часть фильтров
    act(() => {
      result.current.setFilters({
        search: 'new search',
        sortOrder: 'asc',
      })
    })

    // Проверяем, что обновились только указанные поля
    expect(result.current.filters).toEqual({
      status: 'running',
      search: 'new search',
      sortBy: 'name',
      sortOrder: 'asc',
    })
  })

  it('should persist filters between renders', () => {
    const { result, rerender } = renderHook(() => useStore())

    // Устанавливаем фильтры
    act(() => {
      result.current.setFilters({
        status: 'running',
        search: 'test',
      })
    })

    // Перерендериваем хук
    rerender()

    // Проверяем, что фильтры сохранились
    expect(result.current.filters).toEqual({
      ...initialFilters,
      status: 'running',
      search: 'test',
    })
  })
})
