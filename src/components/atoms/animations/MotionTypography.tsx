import { motion } from 'framer-motion'
import { Typography, TypographyProps } from '@mui/material'
import { forwardRef } from 'react'

export const MotionTypography = forwardRef<HTMLDivElement, TypographyProps>(
  (props, ref) => <Typography component={motion.div} ref={ref} {...props} />,
)

MotionTypography.displayName = 'MotionTypography'
