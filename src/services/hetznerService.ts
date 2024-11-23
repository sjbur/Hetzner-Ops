import { client } from '@/api/client'
import type { Server } from '@/types/hetzner'

export const hetznerService = {
  // Server actions
  startServer: (id: number) =>
    client.post<{ action: { id: number; status: string } }>(
      `/servers/${id}/actions/poweron`,
    ),

  stopServer: (id: number) =>
    client.post<{ action: { id: number; status: string } }>(
      `/servers/${id}/actions/poweroff`,
    ),

  rebootServer: (id: number, type: 'soft' | 'hard' = 'soft') =>
    client.post<{ action: { id: number; status: string } }>(
      `/servers/${id}/actions/${type === 'soft' ? 'reboot' : 'reset'}`,
    ),

  deleteServer: (id: number) => client.delete(`/servers/${id}`),

  // Server creation
  createServer: (data: {
    name: string
    server_type: string
    image: string
    location?: string
    start_after_create?: boolean
  }) => client.post<{ server: Server }>('/servers', data),

  // Get server types for creation form
  getServerTypes: () =>
    client.get<{ server_types: Array<{ id: number; name: string }> }>(
      '/server_types',
    ),

  // Get available images
  getImages: () =>
    client.get<{ images: Array<{ id: number; name: string; type: string }> }>(
      '/images',
    ),
}
