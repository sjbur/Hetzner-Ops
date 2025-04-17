import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  actions: {
    display: 'flex',
    gap: theme.spacing(1),
  },
}))
