import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '../LanguageContext'
import { vi } from 'vitest'

// Компонент для тестирования хука useLanguage
const TestComponent = () => {
  const { language, setLanguage } = useLanguage()
  return (
    <div>
      <span data-testid="current-lang">{language}</span>
      <button onClick={() => setLanguage('ru')} data-testid="change-to-ru">
        Change to RU
      </button>
      <button onClick={() => setLanguage('en')} data-testid="change-to-en">
        Change to EN
      </button>
    </div>
  )
}

describe('LanguageContext', () => {
  beforeEach(() => {
    // Очищаем localStorage перед каждым тестом
    localStorage.clear()
    // Сбрасываем моки
    vi.clearAllMocks()
  })

  it('should use default language (en) when no language is saved', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    )

    expect(screen.getByTestId('current-lang')).toHaveTextContent('en')
  })

  it('should use saved language from localStorage', () => {
    localStorage.setItem('language', 'ru')

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    )

    expect(screen.getByTestId('current-lang')).toHaveTextContent('ru')
  })

  it('should change language when setLanguage is called', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    )

    // Изначально английский
    expect(screen.getByTestId('current-lang')).toHaveTextContent('en')

    // Меняем на русский
    fireEvent.click(screen.getByTestId('change-to-ru'))
    expect(screen.getByTestId('current-lang')).toHaveTextContent('ru')

    // Меняем обратно на английский
    fireEvent.click(screen.getByTestId('change-to-en'))
    expect(screen.getByTestId('current-lang')).toHaveTextContent('en')
  })

  it('should save language to localStorage when changed', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    )

    fireEvent.click(screen.getByTestId('change-to-ru'))
    expect(localStorage.getItem('language')).toBe('ru')

    fireEvent.click(screen.getByTestId('change-to-en'))
    expect(localStorage.getItem('language')).toBe('en')
  })

  it('should update document.documentElement.lang when language changes', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    )

    fireEvent.click(screen.getByTestId('change-to-ru'))
    expect(document.documentElement.lang).toBe('ru')

    fireEvent.click(screen.getByTestId('change-to-en'))
    expect(document.documentElement.lang).toBe('en')
  })

  it('should use browser language if available and no saved language', () => {
    // Мокаем navigator.language
    const originalNavigator = window.navigator
    const mockNavigator = {
      ...originalNavigator,
      language: 'ru-RU',
    }
    Object.defineProperty(window, 'navigator', {
      value: mockNavigator,
      writable: true,
    })

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    )

    expect(screen.getByTestId('current-lang')).toHaveTextContent('ru')

    // Восстанавливаем оригинальный navigator
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
    })
  })
})
