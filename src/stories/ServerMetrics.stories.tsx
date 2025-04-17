import type { Meta, StoryObj } from '@storybook/react'
import { ServerMetrics } from '@/components/ServerMetrics/ServerMetrics'

const meta = {
  title: 'Components/ServerMetrics',
  component: ServerMetrics,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ServerMetrics>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    serverId: 1,
  },
}
