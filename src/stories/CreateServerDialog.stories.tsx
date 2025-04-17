import type { Meta, StoryObj } from '@storybook/react'
import { CreateServerDialog } from '@/components/CreateServerDialog/CreateServerDialog'
import { withDialog } from '../../.storybook/decorators/withDialog'
import { Button } from '@mui/material'
import { useState } from 'react'

const meta = {
  title: 'Components/Dialogs/CreateServerDialog',
  component: CreateServerDialog,
  decorators: [withDialog],
} satisfies Meta<typeof CreateServerDialog>

export default meta
type Story = StoryObj<typeof meta>

const DialogWithButton = () => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Create Server Dialog
      </Button>
      <CreateServerDialog open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export const Default: Story = {
  render: () => <DialogWithButton />,
}
