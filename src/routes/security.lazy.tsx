import { createLazyFileRoute } from '@tanstack/react-router'
import { SecurityPage } from '@pages/SecurityPage'

export const Route = createLazyFileRoute('/security')({
  component: SecurityPage,
})
