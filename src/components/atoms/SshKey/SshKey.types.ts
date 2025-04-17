export interface SshKeyProps {
  name: string
  fingerprint: string
  onDelete: () => void
  onCopy: () => void
}
