import { en } from '@/locales/en'

interface TranslationObject {
  [key: string]: string | string[] | TranslationObject
}

describe('Translations', () => {
  it('should not have empty translation strings', () => {
    const checkEmptyStrings = (obj: TranslationObject, path = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'string') {
          const fullPath = path ? `${path}.${key}` : key
          const message = `Empty translation for key: ${fullPath}`
          expect(value.trim(), message).not.toBe('')
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            const fullPath = path
              ? `${path}.${key}[${index}]`
              : `${key}[${index}]`
            const message = `Empty translation for key: ${fullPath}`
            expect(item.trim(), message).not.toBe('')
          })
        } else if (typeof value === 'object') {
          checkEmptyStrings(
            value as TranslationObject,
            path ? `${path}.${key}` : key,
          )
        }
      })
    }

    checkEmptyStrings(en)
  })

  it('should have valid interpolation placeholders', () => {
    const placeholderRegex = /{{([^}]+)}}/g

    const checkPlaceholders = (obj: TranslationObject, path = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'string') {
          const placeholders = Array.from(value.matchAll(placeholderRegex)).map(
            (match) => match[1],
          )

          placeholders.forEach((placeholder) => {
            expect(placeholder).toBeDefined()
          })
        } else if (Array.isArray(value)) {
          value.forEach((item) => {
            const placeholders = Array.from(
              item.matchAll(placeholderRegex),
            ).map((match) => match[1])

            placeholders.forEach((placeholder) => {
              expect(placeholder).toBeDefined()
            })
          })
        } else if (typeof value === 'object') {
          checkPlaceholders(
            value as TranslationObject,
            path ? `${path}.${key}` : key,
          )
        }
      })
    }

    checkPlaceholders(en)
  })
})
