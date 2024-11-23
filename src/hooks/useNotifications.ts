import { useSnackbar, VariantType } from 'notistack'

export function useNotifications() {
  const { enqueueSnackbar } = useSnackbar()

  return {
    showSuccess: (message: string) => {
      enqueueSnackbar(message, { variant: 'success' })
    },
    showError: (message: string) => {
      enqueueSnackbar(message, { variant: 'error' })
    },
    showInfo: (message: string) => {
      enqueueSnackbar(message, { variant: 'info' })
    },
    showWarning: (message: string) => {
      enqueueSnackbar(message, { variant: 'warning' })
    },
    showNotification: (message: string, variant: VariantType = 'default') => {
      enqueueSnackbar(message, { variant })
    },
  }
}
