import { render, screen } from '@/test/test-utils'
import { MotionContainer } from '../MotionContainer'

describe('MotionContainer', () => {
  it('should render children', () => {
    render(
      <MotionContainer>
        <div>Test Content</div>
      </MotionContainer>,
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should pass props to Box component', () => {
    render(
      <MotionContainer data-testid="test-container" sx={{ p: 2 }}>
        <div>Test Content</div>
      </MotionContainer>,
    )

    const container = screen.getByTestId('test-container')
    expect(container).toBeInTheDocument()
    // MUI Box applies styles via CSS-in-JS
    expect(container.className).toMatch(/MuiBox-root/)
  })

  it('should have motion div with animation props', () => {
    render(
      <MotionContainer data-testid="test-container">
        <div>Test Content</div>
      </MotionContainer>,
    )

    const container = screen.getByTestId('test-container')
    const motionDiv = container.firstChild
    // Check that there is a motion.div with animation attributes inside
    expect(motionDiv).toHaveAttribute('data-framer-motion-initial')
  })
})
