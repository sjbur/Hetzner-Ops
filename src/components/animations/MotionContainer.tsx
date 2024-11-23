import { motion } from 'framer-motion'
import { Box, BoxProps } from '@mui/material'
import { forwardRef } from 'react'

export const MotionContainer = forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => (
    <Box
      component={motion.div}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  ),
)

MotionContainer.displayName = 'MotionContainer'
