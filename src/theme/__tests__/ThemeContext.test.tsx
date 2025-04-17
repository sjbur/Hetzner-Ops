import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../ThemeContext'
import { vi, Mock } from 'vitest'

// Mock createAppTheme
vi.mock('../theme', () => ({
  createAppTheme: vi.fn((mode) => ({
    palette: {
      mode,
      primary: { main: '#000' },
    },
  })),
}))

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Define type for matchMedia mock
const mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})) as Mock

// Override window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
})

// Test component
const TestComponent = () => {
  const { mode, toggleColorMode } = useTheme()
  return (
    <div>
      <span data-testid="theme-mode">{mode}</span>
      <button onClick={toggleColorMode}>Toggle Theme</button>
    </div>
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorageMock.clear()
    localStorageMock.getItem.mockReturnValue(null)
    vi.clearAllMocks()

    // Set light theme by default
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  it('should provide default theme', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('theme-mode')).toHaveTextContent('light')
    })
  })

  it('should toggle theme', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    )

    const button = screen.getByText('Toggle Theme')

    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('themeMode', 'dark')
    })

    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByTestId('theme-mode')).toHaveTextContent('light')
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'themeMode',
        'light',
      )
    })
  })

  it('should load theme from localStorage', async () => {
    localStorageMock.getItem.mockReturnValue('dark')

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark')
    })
  })

  it('should use system preference when no localStorage value', async () => {
    ;(window.matchMedia as Mock).mockImplementation((query: string) => ({
      matches: true, // Emulate dark theme in system
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark')
    })
  })
})
