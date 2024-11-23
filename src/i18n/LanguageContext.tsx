import { createContext, useContext, useState, useEffect } from 'react'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from '@/locales/en'
import { ru } from '@/locales/ru'

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
})

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext)

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang) return savedLang

    const browserLang = navigator.language.split('-')[0]
    return browserLang === 'ru' ? 'ru' : 'en'
  })

  useEffect(() => {
    i18next.changeLanguage(language)
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
