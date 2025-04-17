import { renderHook } from '@testing-library/react'
import { useNotifications } from '../useNotifications'
import { useSnackbar } from 'notistack'
import { vi } from 'vitest'

// Mock notistack
vi.mock('notistack', () => ({
  useSnackbar: vi.fn(),
}))

describe('useNotifications', () => {
  const enqueueSnackbarMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useSnackbar).mockReturnValue({
      enqueueSnackbar: enqueueSnackbarMock,
      closeSnackbar: vi.fn(),
    })
  })

  it('should show success notification', () => {
    const { result } = renderHook(() => useNotifications())

    result.current.showSuccess('Success message')

    expect(enqueueSnackbarMock).toHaveBeenCalledWith('Success message', {
      variant: 'success',
    })
  })

  it('should show error notification', () => {
    const { result } = renderHook(() => useNotifications())

    result.current.showError('Error message')

    expect(enqueueSnackbarMock).toHaveBeenCalledWith('Error message', {
      variant: 'error',
    })
  })

  it('should show warning notification', () => {
    const { result } = renderHook(() => useNotifications())

    result.current.showWarning('Warning message')

    expect(enqueueSnackbarMock).toHaveBeenCalledWith('Warning message', {
      variant: 'warning',
    })
  })

  it('should show info notification', () => {
    const { result } = renderHook(() => useNotifications())

    result.current.showInfo('Info message')

    expect(enqueueSnackbarMock).toHaveBeenCalledWith('Info message', {
      variant: 'info',
    })
  })
})
