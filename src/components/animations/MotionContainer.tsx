import { motion } from 'framer-motion'
import { Box, BoxProps } from '@mui/material'
import { forwardRef } from 'react'

type MotionContainerProps = BoxProps & {
  children: React.ReactNode
}

export const MotionContainer = forwardRef<HTMLDivElement, MotionContainerProps>(
  ({ children, ...props }, ref) => (
    <Box ref={ref} {...props}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </Box>
  ),
)

MotionContainer.displayName = 'MotionContainer'
