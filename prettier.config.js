/** @type {import("prettier").Config} */
export default {
  // Максимальная длина строки
  printWidth: 80,
  
  // Использовать одинарные кавычки
  singleQuote: true,
  
  // Добавлять точку с запятой в конце выражений
  semi: false,
  
  // Отступ с помощью 2 пробелов
  tabWidth: 2,
  
  // Добавлять запятые в многострочных конструкциях
  trailingComma: 'all',
  
  // Отступы в объектах
  bracketSpacing: true,
  
  // Скобки в стрелочных функциях
  arrowParens: 'always',
  
  // Перенос строк в HTML-подобном синтаксисе
  bracketSameLine: false,
  
  // Сохранять существующие переносы строк
  proseWrap: 'preserve',
} 