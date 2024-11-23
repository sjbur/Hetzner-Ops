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
  metrics?: ServerMetrics
  snapshots: Snapshot[]
  firewall?: {
    id: number
    status: 'applied' | 'pending'
    rules: FirewallRule[]
  }
}

export interface ServerType {
  id: number
  name: string
  description: string
  cores: number
  memory: number
  disk: number
  prices: Array<{
    location: string
    price_monthly: {
      gross: string
    }
  }>
}

export interface Image {
  id: number
  name: string
  type: string
  description: string
  os_flavor: string
  os_version: string | null
  rapid_deploy: boolean
  status: string
  created: string
  image_size: number
  created_from?: {
    id: number
    name: string
  }
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

export interface ServerMetrics {
  metrics: {
    start: string
    end: string
    step: number
    time_series: {
      'disk.0.iops.write'?: {
        values: Array<[number, string]>
      }
      'disk.0.iops.read'?: {
        values: Array<[number, string]>
      }
      'network.0.bandwidth.in'?: {
        values: Array<[number, string]>
      }
      'network.0.bandwidth.out'?: {
        values: Array<[number, string]>
      }
      cpu?: {
        values: Array<[number, string]>
      }
    }
  }
}

export interface Snapshot {
  id: number
  name: string
  description: string
  created: string
  image_size: number
  server_id: number
  server_name: string
  status: 'creating' | 'available'
}

export interface FirewallRule {
  direction: 'in' | 'out'
  protocol: 'tcp' | 'udp' | 'icmp'
  port: string // "80" or "80-443"
  source_ips: string[]
  description?: string
}

export interface SnapshotsResponse {
  snapshots: Snapshot[]
  meta: {
    pagination: {
      page: number
      per_page: number
      total_entries: number
    }
  }
}

export interface SSHKey {
  id: number
  name: string
  fingerprint: string
  public_key: string
  labels?: Record<string, string>
  created: string
}

export interface SSHKeysResponse {
  ssh_keys: SSHKey[]
  meta: {
    pagination: {
      page: number
      per_page: number
      total_entries: number
    }
  }
}
