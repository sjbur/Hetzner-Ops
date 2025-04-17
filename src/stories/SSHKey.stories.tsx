import { Meta, StoryFn } from '@storybook/react'
import { SshKey } from '../components/atoms/SshKey/SshKey'
import { SshKeyProps } from '../components/atoms/SshKey/SshKey.types'

const meta: Meta<typeof SshKey> = {
  title: 'Components/SSHKey',
  component: SshKey,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

const Template: StoryFn<SshKeyProps> = (args) => <SshKey {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'My SSH Key',
  fingerprint: 'SHA256:abcdef1234567890',
  onDelete: () => console.log('Delete clicked'),
  onCopy: () => console.log('Copy clicked'),
}
