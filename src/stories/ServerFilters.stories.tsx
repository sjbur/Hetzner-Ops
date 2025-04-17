import type { Meta, StoryObj } from '@storybook/react'
import { ServerFilters } from '@/components/molecules/ServerFilters/ServerFilters'

const meta = {
  title: 'Components/ServerFilters',
  component: ServerFilters,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ServerFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
