import React from 'react'
import { Skeleton as MuiSkeleton, SkeletonProps } from '@mui/material'

interface CustomSkeletonProps extends SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular'
  animation?: 'pulse' | 'wave' | false
}

export const Skeleton: React.FC<CustomSkeletonProps> = ({
  variant = 'rectangular',
  animation = 'pulse',
  ...props
}) => {
  return <MuiSkeleton variant={variant} animation={animation} {...props} />
}
