import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ServerActions } from '../ServerActions'
import { hetznerService } from '@/services/hetznerService'
import { useNotifications } from '@/hooks/useNotifications'
import { vi } from 'vitest'
import { Server } from '@/types/hetzner'

// Мокаем сервисы и хуки
vi.mock('@/services/hetznerService')
vi.mock('@/hooks/useNotifications')

describe('ServerActions', () => {
  const mockServer: Server = {
    id: 1,
    name: 'Test Server',
    status: 'running',
    public_net: {
      ipv4: {
        ip: '1.1.1.1',
        blocked: false,
        dns_ptr: 'test.com',
      },
      ipv6: {
        ip: '2001:db8::1',
        blocked: false,
        dns_ptr: [],
      },
      floating_ips: [],
    },
    server_type: {
      id: 1,
      name: 'cx11',
      description: 'CX11',
      cores: 1,
      memory: 2,
      disk: 20,
    },
    datacenter: {
      id: 1,
      name: 'fsn1-dc14',
      description: 'Falkenstein DC 14',
      location: {
        id: 1,
        name: 'fsn1',
        description: 'Falkenstein DC Park 1',
        country: 'DE',
        city: 'Falkenstein',
      },
    },
    created: '2023-01-01T00:00:00Z',
    snapshots: [],
  }

  const mockOnActionComplete = vi.fn()
  const mockShowSuccess = vi.fn()
  const mockShowError = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Мокаем useNotifications
    vi.mocked(useNotifications).mockReturnValue({
      showSuccess: mockShowSuccess,
      showError: mockShowError,
      showInfo: vi.fn(),
      showWarning: vi.fn(),
      showNotification: vi.fn(),
    })
  })

  it('should render menu button', () => {
    render(
      <ServerActions
        server={mockServer}
        onActionComplete={mockOnActionComplete}
      />,
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should open menu on button click', () => {
    render(
      <ServerActions
        server={mockServer}
        onActionComplete={mockOnActionComplete}
      />,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('should start server', async () => {
    vi.mocked(hetznerService.startServer).mockResolvedValueOnce()

    render(
      <ServerActions
        server={{ ...mockServer, status: 'stopped' }}
        onActionComplete={mockOnActionComplete}
      />,
    )

    // Открываем меню и кликаем "Start"
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('servers.start'))

    await waitFor(() => {
      expect(hetznerService.startServer).toHaveBeenCalledWith(mockServer.id)
      expect(mockShowSuccess).toHaveBeenCalledWith(
        'notifications.serverStarted',
      )
      expect(mockOnActionComplete).toHaveBeenCalled()
    })
  })

  it('should stop server', async () => {
    vi.mocked(hetznerService.stopServer).mockResolvedValueOnce()

    render(
      <ServerActions
        server={mockServer}
        onActionComplete={mockOnActionComplete}
      />,
    )

    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('servers.stop'))

    await waitFor(() => {
      expect(hetznerService.stopServer).toHaveBeenCalledWith(mockServer.id)
      expect(mockShowSuccess).toHaveBeenCalledWith(
        'notifications.serverStopped',
      )
      expect(mockOnActionComplete).toHaveBeenCalled()
    })
  })

  it('should handle action error', async () => {
    const error = new Error('Test error')
    vi.mocked(hetznerService.stopServer).mockRejectedValueOnce(error)

    render(
      <ServerActions
        server={mockServer}
        onActionComplete={mockOnActionComplete}
      />,
    )

    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('servers.stop'))

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        'notifications.operationFailed',
      )
      expect(mockOnActionComplete).not.toHaveBeenCalled()
    })
  })

  it('should show delete confirmation dialog', async () => {
    render(
      <ServerActions
        server={mockServer}
        onActionComplete={mockOnActionComplete}
      />,
    )

    // Открываем меню и кликаем "Delete"
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('servers.delete'))

    // Проверяем, что диалог подтверждения открылся
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('common.confirm')).toBeInTheDocument()
  })

  it('should delete server after confirmation', async () => {
    vi.mocked(hetznerService.deleteServer).mockResolvedValueOnce()

    render(
      <ServerActions
        server={mockServer}
        onActionComplete={mockOnActionComplete}
      />,
    )

    // Открываем меню и запускаем удаление
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('servers.delete'))
    fireEvent.click(screen.getByText('common.delete'))

    await waitFor(() => {
      expect(hetznerService.deleteServer).toHaveBeenCalledWith(mockServer.id)
      expect(mockShowSuccess).toHaveBeenCalledWith(
        'notifications.serverDeleted',
      )
      expect(mockOnActionComplete).toHaveBeenCalled()
    })
  })
})
