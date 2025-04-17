import { render, screen, fireEvent } from '@/test/test-utils'
import { ServerDetailsPage } from '../ServerDetailsPage'
import { vi } from 'vitest'
import '../../test/mocks/i18next'

const mockUseApi = vi.fn()
vi.mock('@/hooks/useApi', () => ({
  useApi: () => mockUseApi(),
}))

// Mock for react-router
vi.mock('@tanstack/react-router', () => ({
  useParams: () => ({ serverId: '1' }),
  useNavigate: () => vi.fn(),
}))

const mockServerData = {
  data: {
    server: {
      id: 1,
      name: 'Test Server',
      status: 'running',
      public_net: {
        ipv4: { ip: '192.168.1.1' },
      },
      server_type: {
        name: 'cx11',
        cores: 1,
        memory: 2,
        disk: 20,
      },
      datacenter: {
        location: {
          city: 'Test City',
          country: 'Test Country',
        },
      },
    },
  },
  isLoading: false,
  error: null,
  mutate: vi.fn(),
}

describe('ServerDetailsPage', () => {
  beforeEach(() => {
    mockUseApi.mockReturnValue(mockServerData)
  })

  it('renders server details', () => {
    render(<ServerDetailsPage />)

    expect(screen.getByText('Test Server')).toBeInTheDocument()
    expect(screen.getByText('192.168.1.1')).toBeInTheDocument()
    expect(screen.getByText(/Test City/)).toBeInTheDocument()
  })

  it('switches between tabs', () => {
    render(<ServerDetailsPage />)

    const metricsTab = screen.getByRole('tab', { name: 'Metrics' })
    const snapshotsTab = screen.getByRole('tab', { name: 'Snapshots' })

    fireEvent.click(snapshotsTab)
    expect(screen.getByRole('tabpanel')).toHaveAttribute(
      'aria-labelledby',
      'server-tab-1',
    )

    fireEvent.click(metricsTab)
    expect(screen.getByRole('tabpanel')).toHaveAttribute(
      'aria-labelledby',
      'server-tab-0',
    )
  })

  it('opens rename dialog when clicking rename button', () => {
    render(<ServerDetailsPage />)

    const renameButton = screen.getByRole('button', {
      name: 'Rename Server',
    })
    fireEvent.click(renameButton)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('displays loading skeleton', () => {
    mockUseApi.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      mutate: vi.fn(),
    })

    const { container } = render(<ServerDetailsPage />)

    const skeletons = container.getElementsByClassName('MuiSkeleton-root')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('displays error message', () => {
    const testError = new Error('Test error')
    mockUseApi.mockReturnValue({
      data: null,
      isLoading: false,
      error: testError,
      mutate: vi.fn(),
    })

    render(<ServerDetailsPage />)

    // Use regular expression to find text that might be split
    expect(
      screen.getByText((content) => {
        return content.includes('Error') && content.includes('Test error')
      }),
    ).toBeInTheDocument()
  })

  it('renders back button', () => {
    render(<ServerDetailsPage />)

    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })

  it('renders server status chip', () => {
    render(<ServerDetailsPage />)

    expect(screen.getByText('Running')).toBeInTheDocument()
    expect(screen.getByText('ID: 1')).toBeInTheDocument()
  })
})
