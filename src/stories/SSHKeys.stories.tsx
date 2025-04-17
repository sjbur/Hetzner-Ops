import type { Meta, StoryObj } from '@storybook/react'
import { SSHKeys } from '@/components/molecules/SSHKeys/SSHKeys'

const meta = {
  title: 'Components/SSHKeys',
  component: SSHKeys,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SSHKeys>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
