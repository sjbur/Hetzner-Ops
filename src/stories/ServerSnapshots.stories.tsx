import type { Meta, StoryObj } from '@storybook/react'
import { ServerSnapshots } from '@/components/organisms/ServerSnapshots/ServerSnapshots'

const meta = {
  title: 'Components/ServerSnapshots',
  component: ServerSnapshots,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ServerSnapshots>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    serverId: 1,
    serverName: 'Test Server',
  },
}
