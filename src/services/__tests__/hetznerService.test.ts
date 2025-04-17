import { hetznerService } from '../hetznerService'
import { client } from '@/api/client'
import { vi } from 'vitest'

// Mock axios client
vi.mock('@/api/client', () => ({
  client: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('hetznerService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Server operations', () => {
    const serverId = 123

    it('should start server', async () => {
      const mockResponse = { action: { id: 1, status: 'running' } }
      vi.mocked(client.post).mockResolvedValueOnce({ data: mockResponse })

      await hetznerService.startServer(serverId)

      expect(client.post).toHaveBeenCalledWith(
        `/servers/${serverId}/actions/poweron`,
      )
    })

    it('should stop server', async () => {
      const mockResponse = { action: { id: 1, status: 'stopped' } }
      vi.mocked(client.post).mockResolvedValueOnce({ data: mockResponse })

      await hetznerService.stopServer(serverId)

      expect(client.post).toHaveBeenCalledWith(
        `/servers/${serverId}/actions/poweroff`,
      )
    })

    it('should reboot server', async () => {
      const mockResponse = { action: { id: 1, status: 'rebooting' } }
      vi.mocked(client.post).mockResolvedValueOnce({ data: mockResponse })

      await hetznerService.rebootServer(serverId)

      expect(client.post).toHaveBeenCalledWith(
        `/servers/${serverId}/actions/reboot`,
      )
    })

    it('should delete server', async () => {
      await hetznerService.deleteServer(serverId)

      expect(client.delete).toHaveBeenCalledWith(`/servers/${serverId}`)
    })

    it('should create server', async () => {
      const serverData = {
        name: 'test-server',
        server_type: 'cx11',
        image: 'ubuntu-20.04',
        location: 'nbg1',
      }
      const mockResponse = {
        server: {
          id: 1,
          name: 'test-server',
          status: 'creating',
        },
      }
      vi.mocked(client.post).mockResolvedValueOnce({ data: mockResponse })

      const result = await hetznerService.createServer(serverData)

      expect(client.post).toHaveBeenCalledWith('/servers', serverData)
      expect(result).toEqual(mockResponse)
    })
  })

  describe('Snapshot operations', () => {
    const serverId = 123
    const snapshotId = 456

    it('should get snapshots with filters', async () => {
      const mockResponse = {
        images: [{ id: 1, type: 'snapshot', status: 'available' }],
      }
      vi.mocked(client.get).mockResolvedValueOnce({ data: mockResponse })

      const params = {
        sort: 'id' as const,
        status: 'available' as const,
        page: 1,
        per_page: 25,
      }

      const result = await hetznerService.getSnapshots(params)

      expect(client.get).toHaveBeenCalledWith('/images', {
        params: { type: 'snapshot', ...params },
      })
      expect(result).toEqual(mockResponse)
    })

    it('should create snapshot', async () => {
      const mockResponse = {
        action: { id: 1, status: 'creating' },
        image: { id: 1, type: 'snapshot' },
      }
      vi.mocked(client.post).mockResolvedValueOnce({ data: mockResponse })

      const options = { description: 'test snapshot' }
      const result = await hetznerService.createSnapshot(serverId, options)

      expect(client.post).toHaveBeenCalledWith(
        `/servers/${serverId}/actions/create_image`,
        { description: options.description, type: 'snapshot' },
      )
      expect(result).toEqual(mockResponse)
    })

    it('should delete snapshot', async () => {
      await hetznerService.deleteSnapshot(snapshotId)

      expect(client.delete).toHaveBeenCalledWith(`/images/${snapshotId}`)
    })
  })

  describe('SSH Key operations', () => {
    it('should get SSH keys with pagination', async () => {
      const mockResponse = {
        ssh_keys: [{ id: 1, name: 'key1', fingerprint: 'fp1' }],
        meta: {
          pagination: {
            page: 1,
            per_page: 25,
            total_entries: 1,
          },
        },
      }
      vi.mocked(client.get).mockResolvedValueOnce({ data: mockResponse })

      const params = {
        sort: 'id' as const,
        page: 1,
        per_page: 25,
      }

      const result = await hetznerService.getSSHKeys(params)

      expect(client.get).toHaveBeenCalledWith('/ssh_keys', { params })
      expect(result).toEqual(mockResponse)
    })

    it('should create SSH key', async () => {
      const mockResponse = {
        ssh_key: { id: 1, name: 'test-key' },
      }
      vi.mocked(client.post).mockResolvedValueOnce({ data: mockResponse })

      const keyData = {
        name: 'test-key',
        public_key: 'ssh-rsa AAAA...',
      }

      const result = await hetznerService.createSSHKey(keyData)

      expect(client.post).toHaveBeenCalledWith('/ssh_keys', keyData)
      expect(result).toEqual(mockResponse)
    })

    it('should delete SSH key', async () => {
      const keyId = 123
      await hetznerService.deleteSSHKey(keyId)

      expect(client.delete).toHaveBeenCalledWith(`/ssh_keys/${keyId}`)
    })
  })

  describe('Metrics', () => {
    it('should get server metrics', async () => {
      const serverId = 123
      const start = new Date('2024-01-01')
      const end = new Date('2024-01-02')

      const mockResponse = {
        metrics: {
          start: start.toISOString(),
          end: end.toISOString(),
          step: 60,
          time_series: {},
        },
      }
      vi.mocked(client.get).mockResolvedValueOnce({ data: mockResponse })

      const result = await hetznerService.getServerMetrics(serverId, start, end)

      expect(client.get).toHaveBeenCalledWith(`/servers/${serverId}/metrics`, {
        params: {
          start: start.toISOString(),
          end: end.toISOString(),
          type: 'cpu,disk,network',
        },
      })
      expect(result).toEqual(mockResponse)
    })
  })
})
