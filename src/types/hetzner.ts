export interface Server {
  id: number
  name: string
  status:
    | 'running'
    | 'stopped'
    | 'starting'
    | 'stopping'
    | 'off'
    | 'deleting'
    | 'migrating'
    | 'rebuilding'
    | 'unknown'
  public_net: {
    ipv4: {
      ip: string
      blocked: boolean
      dns_ptr: string
    }
    ipv6: {
      ip: string
      blocked: boolean
      dns_ptr: string[]
    }
    floating_ips: number[]
  }
  server_type: {
    id: number
    name: string
    description: string
    cores: number
    memory: number
    disk: number
  }
  datacenter: {
    id: number
    name: string
    description: string
    location: {
      id: number
      name: string
      description: string
      country: string
      city: string
    }
  }
  created: string
}

export interface ServersResponse {
  servers: Server[]
  meta: {
    pagination: {
      page: number
      per_page: number
      previous_page: number | null
      next_page: number | null
      last_page: number
      total_entries: number
    }
  }
}
