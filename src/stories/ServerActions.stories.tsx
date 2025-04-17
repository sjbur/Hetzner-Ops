import type { Meta, StoryObj } from '@storybook/react'
import { ServerActions } from '@/components/molecules/ServerActions/ServerActions'
import { Server } from '@/types/hetzner'

const mockServer = {
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

const meta = {
  title: 'Components/ServerActions',
  component: ServerActions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ServerActions>

export default meta
type Story = StoryObj<typeof meta>

export const Running: Story = {
  args: {
    server: mockServer as Server,
    onActionComplete: () => console.log('Action completed'),
  },
}

export const Stopped: Story = {
  args: {
    server: { ...mockServer, status: 'stopped' },
    onActionComplete: () => console.log('Action completed'),
  },
}
