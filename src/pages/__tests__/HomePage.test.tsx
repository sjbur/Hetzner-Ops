import { render, screen, fireEvent } from '@/test/test-utils'
import { HomePage } from '../HomePage'
import { vi } from 'vitest'
import '../../test/mocks/i18next'

const mockUseServers = vi.fn()
vi.mock('@hooks/useServers', () => ({
  useServers: () => mockUseServers(),
}))

vi.mock('@/store/useStore', () => ({
  useStore: () => ({
    filters: {
      status: '',
      search: '',
      sortBy: '',
      sortOrder: 'asc',
    },
  }),
}))

// Mock for TanStack Router
vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    params,
  }: {
    children: React.ReactNode
    to: string
    params?: Record<string, string>
  }) => {
    // Replace URL parameters if they exist
    const href = params
      ? Object.entries(params).reduce(
          (url, [key, value]) => url.replace(`$${key}`, value),
          to,
        )
      : to

    return (
      <a href={href} data-testid="router-link">
        {children}
      </a>
    )
  },
  useNavigate: () => vi.fn(),
}))

const mockServerData = {
  servers: [
    {
      id: 1,
      name: 'Test Server',
      status: 'running',
      created: '2024-01-01',
      public_net: {
        ipv4: { ip: '192.168.1.1' },
      },
      server_type: {
        name: 'cx11',
        cores: 1,
        memory: 2,
        disk: 20,
      },
    },
  ],
  isLoading: false,
  error: null,
  refresh: vi.fn(),
}

describe('HomePage', () => {
  beforeEach(() => {
    mockUseServers.mockReturnValue(mockServerData)
  })

  it('renders server list', () => {
    render(<HomePage />)

    expect(screen.getByText('Test Server')).toBeInTheDocument()
    expect(screen.getByText(/192\.168\.1\.1/)).toBeInTheDocument()
  })

  it('opens create server dialog when clicking create button', () => {
    render(<HomePage />)

    const createButton = screen.getByRole('button', { name: /create server/i })
    fireEvent.click(createButton)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('displays loading skeleton', () => {
    mockUseServers.mockReturnValue({
      servers: [],
      isLoading: true,
      error: null,
      refresh: vi.fn(),
    })

    const { container } = render(<HomePage />)

    const skeletons = container.getElementsByClassName('MuiSkeleton-root')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('displays error message', () => {
    mockUseServers.mockReturnValue({
      servers: [],
      isLoading: false,
      error: new Error('Test error'),
      refresh: vi.fn(),
    })

    render(<HomePage />)

    expect(screen.getByText(/Failed to load servers/i)).toBeInTheDocument()
  })

  it('renders server cards with links', () => {
    render(<HomePage />)

    const serverLinks = screen.getAllByTestId('router-link')
    expect(serverLinks.length).toBeGreaterThan(0)
    // Check that the link contains the correct server ID
    expect(serverLinks[0]).toHaveAttribute('href', '/servers/1')
  })

  it('renders server status chip', () => {
    render(<HomePage />)

    expect(screen.getByText('Running')).toBeInTheDocument()
  })

  it('renders create server button', () => {
    render(<HomePage />)

    const createButton = screen.getByRole('button', { name: /create server/i })
    expect(createButton).toBeInTheDocument()
  })

  it('filters servers by search', () => {
    vi.mock('@/store/useStore', () => ({
      useStore: () => ({
        filters: {
          status: '',
          search: 'test',
          sortBy: '',
          sortOrder: 'asc',
        },
      }),
    }))

    render(<HomePage />)

    expect(screen.getByText('Test Server')).toBeInTheDocument()
  })
})
