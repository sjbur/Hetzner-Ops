import type { Meta } from '@storybook/react'
import { FiltersSkeleton } from '@/components/atoms/Skeleton/FiltersSkeleton/FiltersSkeleton'
import { ServerSkeleton } from '@/components/atoms/Skeleton/ServerSkeleton/ServerSkeleton'
import { ServerDetailsSkeleton } from '@/components/atoms/Skeleton/ServerDetailsSkeleton/ServerDetailsSkeleton'
import { MetricsSkeleton } from '@/components/atoms/Skeleton/MetricsSkeleton/MetricsSkeleton'
import { SnapshotsSkeleton } from '@/components/atoms/Skeleton/SnapshotsSkeleton/SnapshotsSkeleton'
import { SSHKeysSkeleton } from '@/components/atoms/Skeleton/SSHKeysSkeleton/SSHKeysSkeleton'

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
