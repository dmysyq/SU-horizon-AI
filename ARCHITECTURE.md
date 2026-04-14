# Архитектура CodeHorizon AI

## Источники

- **codehorizon-web** — UI, стили, компоненты (Tailwind, shadcn, Radix)
- **codehorizon-api** — эталон структуры данных (Kotlin/Spring); мы используем упрощённый Prisma вместо него

## Текущая реализация

### Фронтенд (ch_f)

- **Next.js 15** + React 19 + TypeScript
- **Tailwind CSS 4** + переменные из codehorizon-web
- **next-themes** — светлая/тёмная тема
- **Plus Jakarta Sans** — шрифт (вместо Gilroy)
- Роли: **студент**, **преподаватель** (без гостя)

### Хранение данных (сейчас)

| Сущность   | Хранилище   | Примечание                    |
|-----------|-------------|-------------------------------|
| Пользователи | localStorage | Мок auth, ключ `ch_f_user`    |
| Курсы/уроки | Статика     | `src/data/mock.ts`            |
| Попытки   | localStorage | Ключ `ch_f_attempts`          |
| Задания/тесты (админ) | Консоль   | Пока не сохраняются           |

### База данных (Prisma + SQLite)

Схема готова для персистентности:

```
User ← Attempt
Course ← Lesson ← Task ← Attempt
```

**Запуск БД:**
```bash
cp .env.example .env
pnpm db:push
pnpm db:seed
```

После этого можно добавить API routes и переключить фронт на них. Сейчас приложение работает на моках и localStorage.

---

## Подключение ИИ

### Вариант 1: Облачный API (OpenAI, Anthropic, Gemini и т.п.)

- Плюсы: не нужна своя инфраструктура, стабильное качество
- Минусы: плата за токены, зависимость от внешнего сервиса
- Реализация: HTTP-запросы с фронта или через Next.js API routes

```ts
// Пример: POST /api/check
const res = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [{ role: 'system', content: promptWithCriteria }, { role: 'user', content: answer }],
  }),
});
```

### Вариант 2: Локальная модель (Ollama + Llama)

- Плюсы: нет затрат на токены, контроль над данными, работа оффлайн
- Минусы: нужен сервер с GPU/CPU, может быть ниже качество
- Реализация: Ollama даёт OpenAI-совместимый API локально

```bash
# Установка Ollama
ollama pull llama3.2
ollama serve  # localhost:11434
```

```ts
// Запрос к локальному Ollama
const res = await fetch('http://localhost:11434/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    model: 'llama3.2',
    messages: [{ role: 'user', content: prompt }],
  }),
});
```

### Вариант 3: Гибрид

- Локальная модель для разработки и тестов (Ollama)
- Облачный API для production (OpenAI/Anthropic)

### Точки входа ИИ в коде

1. **Проверка заданий** — `src/components/lesson/submit-task-form.tsx`, `mockAICheck`
2. **Чат общий** — `src/app/(app)/(main)/assistant/page.tsx`
3. **Чат по попытке** — `src/app/(app)/(main)/assistant/attempt/[attemptId]/page.tsx`

Подробности — в `TODO_AI.md`.

---

## Запуск проекта

```bash
pnpm install
pnpm dev
```

Для БД (опционально):
```bash
cp .env.example .env
pnpm db:push
pnpm db:seed
```
