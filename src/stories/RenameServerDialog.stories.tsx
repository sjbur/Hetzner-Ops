import type { Meta, StoryObj } from '@storybook/react'
import { RenameServerDialog } from '@/components/RenameServerDialog/RenameServerDialog'
import { withDialog } from '../../.storybook/decorators/withDialog'
import { Button } from '@mui/material'
import { useState } from 'react'

const meta = {
  title: 'Components/Dialogs/RenameServerDialog',
  component: RenameServerDialog,
  decorators: [withDialog],
} satisfies Meta<typeof RenameServerDialog>

export default meta
type Story = StoryObj<typeof meta>

const DialogWithButton = () => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Rename Server Dialog
      </Button>
      <RenameServerDialog
        open={open}
        onClose={() => setOpen(false)}
        serverName="Test Server"
      />
    </div>
  )
}

export const Default: Story = {
  render: () => <DialogWithButton />,
}
