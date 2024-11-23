import { motion } from 'framer-motion'
import { Card, CardProps } from '@mui/material'
import { forwardRef } from 'react'

export const MotionCard = forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => (
    <Card
      component={motion.div}
      ref={ref}
      whileHover={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}
      whileTap={{ scale: 0.98 }}
      {...props}
    />
  ),
)

MotionCard.displayName = 'MotionCard'
