import React from 'react'
import type { ReactNode, CSSProperties } from 'react'

interface MotionDivProps {
  children: ReactNode
  whileHover?: Record<string, unknown>
  whileTap?: Record<string, unknown>
  style?: CSSProperties
  className?: string
  'data-testid'?: string
  [key: string]: unknown
}

export const mockFramerMotion = {
  motion: {
    div: ({ children, whileHover, whileTap, ...props }: MotionDivProps) => {
      return React.createElement(
        'div',
        {
          'data-framer-motion-initial': 'true',
          'data-testid': props['data-testid'],
          'data-motion-hover': whileHover ? 'true' : undefined,
          'data-motion-tap': whileTap ? 'true' : undefined,
          ...props,
        },
        children,
      )
    },
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => children,
}

vi.mock('framer-motion', () => mockFramerMotion)
