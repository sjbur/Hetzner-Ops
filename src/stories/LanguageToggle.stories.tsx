import type { Meta, StoryObj } from '@storybook/react'
import { LanguageToggle } from '@/components/LanguageToggle/LanguageToggle'
import { LanguageProvider } from '@/i18n/LanguageContext'

const meta = {
  title: 'Components/LanguageToggle',
  component: LanguageToggle,
  decorators: [
    (Story) => (
      <LanguageProvider>
        <Story />
      </LanguageProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
