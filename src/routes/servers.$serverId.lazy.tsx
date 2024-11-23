import { createLazyFileRoute } from '@tanstack/react-router'
import { ServerDetailsPage } from '@pages/ServerDetailsPage'

export const Route = createLazyFileRoute('/servers/$serverId')({
  component: ServerDetailsPage,
})
