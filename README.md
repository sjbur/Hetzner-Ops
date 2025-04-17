# React + TypeScript Project Template

Современный шаблон React приложения с TypeScript.

## 🚀 Технологии

- **React 18** - UI библиотека
- **TypeScript** - типизация
- **Material UI** - компоненты и стилизация
- **TanStack Router** - маршрутизация
- **Zustand** - управление состоянием
- **SWR** - data fetching
- **Vitest** - тестирование
- **ESLint + Prettier** - линтинг и форматирование

## 📦 Установка

```bash
npm install
```

## 🔧 Разработка

```bash
npm run dev       # Запуск dev сервера
npm run build     # Сборка
npm run test      # Запуск тестов
npm run lint      # Проверка линтером
```

## 📁 Структура проекта

```
src/
├── api/          # API клиент и типы
├── components/   # React компоненты
├── hooks/        # Кастомные хуки
├── pages/        # Компоненты страниц
├── routes/       # Конфигурация роутинга
├── store/        # Zustand сторы
├── theme/        # Настройки темы MUI
├── utils/        # Утилиты
└── middleware/   # Middleware
```

## 📚 Документация компонентов

Запуск Storybook:

```bash
npm run storybook
```

## 🧪 Тестирование

```bash
npm run test          # Запуск тестов
npm run test:coverage # Отчет о покрытии
npm run test:ui       # UI для тестов
```

## 📝 Соглашения

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
