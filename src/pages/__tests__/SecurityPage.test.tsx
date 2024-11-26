import { render, screen } from '@/test/test-utils'
import { SecurityPage } from '../SecurityPage'
import { mockTranslations } from '@/test/mocks/i18next'

// Мок для SSHKeys компонента
vi.mock('@/components/SSHKeys/SSHKeys', () => ({
  SSHKeys: () => <div data-testid="ssh-keys">SSH Keys Component</div>,
}))

describe('SecurityPage', () => {
  it('renders security page with title', () => {
    render(<SecurityPage />)

    expect(
      screen.getByText(mockTranslations['navigation.security']),
    ).toBeInTheDocument()
  })

  it('renders SSHKeys component', () => {
    render(<SecurityPage />)

    expect(screen.getByTestId('ssh-keys')).toBeInTheDocument()
  })

  it('renders with animation wrapper', () => {
    render(<SecurityPage />)

    const animationWrapper = screen
      .getByText(mockTranslations['navigation.security'])
      .closest('[data-framer-motion-initial]')
    expect(animationWrapper).toBeInTheDocument()
  })
})
