import { useApi } from './useApi'
import type { ServersResponse } from '@/types/hetzner'

export function useServers() {
  const { data, error, isLoading, mutate } = useApi<ServersResponse>('/servers')

  return {
    servers: data?.servers || [],
    meta: data?.meta,
    error,
    isLoading,
    refresh: mutate,
  }
}
