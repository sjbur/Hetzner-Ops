import type { Meta } from '@storybook/react'
import { FiltersSkeleton } from '@/components/FiltersSkeleton/FiltersSkeleton'
import { ServerSkeleton } from '@/components/ServerSkeleton/ServerSkeleton'
import { ServerDetailsSkeleton } from '@/components/ServerDetailsSkeleton/ServerDetailsSkeleton'
import { MetricsSkeleton } from '@/components/MetricsSkeleton/MetricsSkeleton'
import { SnapshotsSkeleton } from '@/components/SnapshotsSkeleton/SnapshotsSkeleton'
import { SSHKeysSkeleton } from '@/components/SSHKeysSkeleton/SSHKeysSkeleton'

const meta = {
  title: 'Components/Skeletons',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const Filters = {
  render: () => <FiltersSkeleton />,
}

export const Server = {
  render: () => <ServerSkeleton />,
}

export const ServerDetails = {
  render: () => <ServerDetailsSkeleton />,
}

export const Metrics = {
  render: () => <MetricsSkeleton />,
}

export const Snapshots = {
  render: () => <SnapshotsSkeleton />,
}

export const SSHKeys = {
  render: () => <SSHKeysSkeleton />,
}
