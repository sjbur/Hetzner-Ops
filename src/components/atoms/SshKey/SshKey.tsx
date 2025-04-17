import React from 'react'
import { Box, Typography, IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useStyles } from './SshKey.styles'
import { SshKeyProps } from './SshKey.types'

export const SshKey: React.FC<SshKeyProps> = ({
  name,
  fingerprint,
  onDelete,
  onCopy,
}) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box className={classes.info}>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {fingerprint}
        </Typography>
      </Box>
      <Box className={classes.actions}>
        <Tooltip title="Copy fingerprint">
          <IconButton onClick={onCopy} size="small">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete key">
          <IconButton onClick={onDelete} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
