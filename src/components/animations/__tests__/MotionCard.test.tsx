import { render, screen } from '@/test/test-utils'
import { MotionCard } from '../MotionCard'

describe('MotionCard', () => {
  it('should render with children', () => {
    render(
      <MotionCard>
        <div>Test Content</div>
      </MotionCard>,
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should pass props to Card component', () => {
    render(
      <MotionCard data-testid="test-card" sx={{ boxShadow: 5 }}>
        <div>Test Content</div>
      </MotionCard>,
    )

    const card = screen.getByTestId('test-card')
    expect(card).toBeInTheDocument()
    // MUI применяет стили через CSS-in-JS, поэтому проверяем наличие класса
    expect(card.className).toMatch(/MuiCard-root/)
  })

  it('should have motion props', () => {
    render(
      <MotionCard data-testid="test-card">
        <div>Test Content</div>
      </MotionCard>,
    )

    const card = screen.getByTestId('test-card')
    // Framer Motion добавляет data-атрибуты для анимаций
    expect(card).toHaveAttribute('data-framer-motion-initial')
  })
})
