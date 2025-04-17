import { vi } from 'vitest'

const mockI18n = {
  use: () => mockI18n,
  init: vi.fn(),
  t: (key: string, params?: Record<string, unknown>) => {
    if (params?.returnObjects && Array.isArray(mockTranslations[key])) {
      return mockTranslations[key]
    }
    return mockTranslations[key] || key
  },
  language: 'en',
  changeLanguage: vi.fn(),
}

// Mock for i18next
vi.mock('i18next', () => ({
  default: mockI18n,
  createInstance: () => mockI18n,
}))

// Mock for react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockI18n.t,
    i18n: mockI18n,
  }),
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
  Trans: ({ children }: { children: React.ReactNode }) => children,
}))

const mockTranslations: Record<string, string | string[]> = {
  'about.title': 'About',
  'about.projectDescription.title': 'Project Description',
  'about.projectDescription.content': 'Project content',
  'about.features.title': 'Features',
  'about.technologies.title': 'Technologies',
  'about.features.list': ['Feature 1', 'Feature 2'],
  'about.technologies.list': ['Tech 1', 'Tech 2'],
  'common.error': 'Error',
  'common.back': 'Back',
  'common.metrics': 'Metrics',
  'servers.snapshots': 'Snapshots',
  'serverDetails.renameServer': 'Rename Server',
  'filters.running': 'Running',
  'navigation.security': 'Security',
  'servers.title': 'Servers',
  'servers.createServer': 'Create Server',
}

export { mockTranslations, mockI18n }
