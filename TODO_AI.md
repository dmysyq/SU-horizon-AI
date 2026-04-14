# TODO(ai) — точки интеграции с ИИ

Документ перечисляет все места в коде, где необходимо подключить реальный ИИ-сервис вместо прикидок.

## 1. Проверка заданий и тестов

**Файл:** `src/components/lesson/submit-task-form.tsx`

- Функция `mockAICheck()` — заменить на вызов API.
- Ожидаемый формат запроса: `POST /api/check`
  - Body: `{ answer, courseSlug, lessonSlug, type: 'test' | 'report' }`
- Ожидаемый формат ответа: `{ score, maxScore, errors: string[], recommendations: string[] }`

## 2. Чат с ИИ (общий)

**Файл:** `src/app/(app)/(main)/assistant/page.tsx`

- `setTimeout` с мок-ответом — заменить на API.
- Ожидаемый формат: `POST /api/chat`
  - Body: `{ message: string, courseSlug?: string }`
- Ответ: `{ text: string }` (или streaming)

## 3. Чат с ИИ по конкретной попытке

**Файл:** `src/app/(app)/(main)/assistant/attempt/[attemptId]/page.tsx`

- `setTimeout` — заменить на API с контекстом попытки.
- Ожидаемый формат: `POST /api/chat`
  - Body: `{ message, attemptId }` — ИИ получает контекст ошибок и рекомендаций.

## 4. Хранилище попыток

**Файл:** `src/lib/attempts-store.ts`

- Сейчас используется `localStorage`.
- TODO(ai): при подключении бэкенда — заменить на API (`GET/POST /api/attempts`).

---

## Варианты размещения ИИ

| Вариант | Описание | Плюсы | Минусы |
|---------|----------|-------|--------|
| **Облачный API** | OpenAI, Anthropic, Google Gemini | Готовый сервис, высокое качество | Плата за токены, зависимость от провайдера |
| **Локально (Ollama + Llama)** | Модель на своем сервере | Бесплатно, контроль данных, оффлайн | Нужно железо, качество может быть ниже |
| **Гибрид** | Ollama для разработки, облако для продакшена | Баланс стоимости и качества | Два контура настройки |

Подробнее — в `ARCHITECTURE.md`.

---

## Сводка по архитектуре ИИ (из ТЗ)

- **Входные данные:** текст ответа, taskId/reportId, courseSlug, lessonSlug
- **Выходные данные:** баллы по критериям, errors[], recommendations[]
- **Чат:** контекст = последняя попытка (errors, recommendations) + тема курса
- **Ограничения:** без памяти между сессиями, без личной информации вне учёбы
