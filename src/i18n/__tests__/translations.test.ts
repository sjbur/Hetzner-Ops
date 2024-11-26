import { en } from '@/locales/en'
import { ru } from '@/locales/ru'

type TranslationObject = Record<string, string | TranslationObject>

describe('Translations', () => {
  it('should have matching keys in en and ru translations', () => {
    // Рекурсивная функция для проверки ключей объектов
    const checkKeys = (enObj: TranslationObject, ruObj: TranslationObject) => {
      const enKeys = Object.keys(enObj)
      const ruKeys = Object.keys(ruObj)

      // Проверяем, что все ключи из en есть в ru
      enKeys.forEach((key) => {
        expect(Object.prototype.hasOwnProperty.call(ruObj, key)).toBe(true)

        // Если значение - объект, проверяем рекурсивно
        if (typeof enObj[key] === 'object' && !Array.isArray(enObj[key])) {
          expect(typeof ruObj[key]).toBe('object')
          checkKeys(
            enObj[key] as TranslationObject,
            ruObj[key] as TranslationObject,
          )
        }
      })

      // Проверяем, что все ключи из ru есть в en
      ruKeys.forEach((key) => {
        expect(Object.prototype.hasOwnProperty.call(enObj, key)).toBe(true)
      })
    }

    checkKeys(en as TranslationObject, ru as TranslationObject)
  })

  it('should not have empty translation strings', () => {
    const checkEmptyStrings = (
      obj: TranslationObject,
      lang: string,
      path = '',
    ) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'string') {
          const fullPath = path ? `${path}.${key}` : key
          const message = `Empty translation in ${lang} for key: ${fullPath}`
          expect(value.trim(), message).not.toBe('')
        } else if (typeof value === 'object' && !Array.isArray(value)) {
          checkEmptyStrings(
            value as TranslationObject,
            lang,
            path ? `${path}.${key}` : key,
          )
        }
      })
    }

    checkEmptyStrings(en as TranslationObject, 'en')
    checkEmptyStrings(ru as TranslationObject, 'ru')
  })

  it('should have valid interpolation placeholders', () => {
    const placeholderRegex = /{{([^}]+)}}/g

    const checkPlaceholders = (
      enObj: TranslationObject,
      ruObj: TranslationObject,
      path = '',
    ) => {
      Object.entries(enObj).forEach(([key, value]) => {
        if (typeof value === 'string' && typeof ruObj[key] === 'string') {
          const enPlaceholders = Array.from(
            value.matchAll(placeholderRegex),
          ).map((match) => match[1])
          const ruPlaceholders = Array.from(
            (ruObj[key] as string).matchAll(placeholderRegex),
          ).map((match) => match[1])

          enPlaceholders.forEach((placeholder) => {
            expect(ruPlaceholders).toContain(placeholder)
          })

          ruPlaceholders.forEach((placeholder) => {
            expect(enPlaceholders).toContain(placeholder)
          })
        } else if (typeof value === 'object' && !Array.isArray(value)) {
          checkPlaceholders(
            value as TranslationObject,
            ruObj[key] as TranslationObject,
            path ? `${path}.${key}` : key,
          )
        }
      })
    }

    checkPlaceholders(en as TranslationObject, ru as TranslationObject)
  })
})
