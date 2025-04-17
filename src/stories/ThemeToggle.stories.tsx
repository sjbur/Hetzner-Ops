import type { Meta, StoryObj } from '@storybook/react'
import { ThemeToggle } from '@/components/atoms/ThemeToggle/ThemeToggle'
import { ThemeProvider } from '@/theme/ThemeContext'

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
