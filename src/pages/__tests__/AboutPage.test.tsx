import { render, screen } from '@/test/test-utils'
import { AboutPage } from '../AboutPage'
import { mockTranslations } from '@/test/mocks/i18next'

describe('AboutPage', () => {
  it('renders about page with all sections', () => {
    render(<AboutPage />)

    expect(
      screen.getByText(mockTranslations['about.title']),
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockTranslations['about.projectDescription.title']),
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockTranslations['about.projectDescription.content']),
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockTranslations['about.features.title']),
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockTranslations['about.technologies.title']),
    ).toBeInTheDocument()
  })

  it('renders features list', () => {
    render(<AboutPage />)

    const features = mockTranslations['about.features.list'] as string[]
    features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })
  })

  it('renders technologies list', () => {
    render(<AboutPage />)

    const technologies = mockTranslations['about.technologies.list'] as string[]
    technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument()
    })
  })

  it('renders with animation wrapper', () => {
    render(<AboutPage />)

    const animationWrapper = screen
      .getByText(mockTranslations['about.title'])
      .closest('[data-framer-motion-initial]')
    expect(animationWrapper).toBeInTheDocument()
  })
})
