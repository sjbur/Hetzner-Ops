import { client } from '@/api/client'
import type {
  Server,
  ServerType,
  Image,
  ServerMetrics,
  FirewallRule,
} from '@/types/hetzner'

interface ServerActionResponse {
  action: {
    id: number
    status: string
  }
}

interface ServerTypesResponse {
  server_types: ServerType[]
}

interface ImagesResponse {
  images: Image[]
}

interface CreateImageResponse {
  action: {
    id: number
    status: string
  }
  image: {
    id: number
    type: string
    status: string
    name: string
    description: string
    created: string
  }
}

export const hetznerService = {
  // Server actions
  startServer: async (id: number): Promise<void> => {
    await client.post<ServerActionResponse>(`/servers/${id}/actions/poweron`)
  },

  stopServer: async (id: number): Promise<void> => {
    await client.post<ServerActionResponse>(`/servers/${id}/actions/poweroff`)
  },

  rebootServer: async (
    id: number,
    type: 'soft' | 'hard' = 'soft',
  ): Promise<void> => {
    await client.post<ServerActionResponse>(
      `/servers/${id}/actions/${type === 'soft' ? 'reboot' : 'reset'}`,
    )
  },

  deleteServer: async (id: number): Promise<void> => {
    await client.delete(`/servers/${id}`)
  },

  // Server creation
  createServer: async (data: {
    name: string
    server_type: string
    image: string
    location?: string
    start_after_create?: boolean
  }): Promise<{ server: Server }> => {
    const response = await client.post<{ server: Server }>('/servers', data)
    return response.data
  },

  // Get server types for creation form
  getServerTypes: async (): Promise<ServerTypesResponse> => {
    const response = await client.get<ServerTypesResponse>('/server_types')
    return response.data
  },

  // Get available images
  getImages: async (): Promise<ImagesResponse> => {
    const response = await client.get<ImagesResponse>('/images')
    return response.data
  },

  // Snapshots
  getSnapshots: async (params?: {
    sort?:
      | 'id'
      | 'id:asc'
      | 'id:desc'
      | 'name'
      | 'name:asc'
      | 'name:desc'
      | 'created'
      | 'created:asc'
      | 'created:desc'
    status?: 'available' | 'creating'
    page?: number
    per_page?: number
    type?: 'snapshot'
  }) => {
    const response = await client.get<{ images: Image[] }>('/images', {
      params: {
        type: 'snapshot',
        ...params,
      },
    })
    return response.data
  },

  createSnapshot: async (
    serverId: number,
    options?: {
      description?: string
      labels?: Record<string, string>
      type?: 'snapshot' | 'backup'
    },
  ): Promise<CreateImageResponse> => {
    const response = await client.post<CreateImageResponse>(
      `/servers/${serverId}/actions/create_image`,
      {
        description: options?.description,
        labels: options?.labels,
        type: options?.type || 'snapshot',
      },
    )
    return response.data
  },

  deleteSnapshot: async (snapshotId: number): Promise<void> => {
    await client.delete(`/images/${snapshotId}`)
  },

  // Metrics
  getServerMetrics: async (
    serverId: number,
    start: Date,
    end: Date,
  ): Promise<ServerMetrics> => {
    const response = await client.get<ServerMetrics>(
      `/servers/${serverId}/metrics`,
      {
        params: {
          start: start.toISOString(),
          end: end.toISOString(),
          type: 'cpu,disk,network',
        },
      },
    )
    return response.data
  },

  // Firewall
  updateFirewallRules: async (
    serverId: number,
    rules: FirewallRule[],
  ): Promise<void> => {
    await client.put(`/servers/${serverId}/firewall/rules`, { rules })
  },
}
