import { client } from '@/api/client'
import type { Server, ServerType, Image } from '@/types/hetzner'

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
}
