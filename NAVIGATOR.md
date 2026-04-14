## Навигатор по проекту CodeHorizon AI

### 1. Как войти

Аутентификация сейчас **моковая**, пользователи хранятся **в браузере**:
- ключ `localStorage`: `ch_f_user`
- структура: `{ id, email, name, role }`
- **пароль технически не проверяется**, используется только для формы.

Роли определяются так:
- если email **содержит** `teacher` или `admin` → `role: "teacher"`
- иначе → `role: "student"`

#### Примеры аккаунтов

- **Студент**
  - Email: `student@example.com`
  - Пароль: `any-password`
  - Роль: `student`

- **Преподаватель / админ**
  - Email: `teacher@example.com`
  - Пароль: `any-password`
  - Роль: `teacher` (доступ к `/admin`)

> При каждом новом логине локальный пользователь **перезаписывается**.

---

### 2. Основные ссылки (после входа)

- **Главная**: `/`
  - Описание платформы и ИИ‑ассистента.

- **Курсы**: `/courses`
  - Список курсов из мок‑данных.

- **Страница курса**: `/courses/sql-basics`
  - Пример курса «Основы SQL».

- **Урок**: `/courses/sql-basics/learn/select`
  - Вкладки «Материал / Задание / Отчёт» (для select/where/join).

- **Личный кабинет**: `/me`
  - Карточки: курсы, история попыток, чат с ИИ.

- **История попыток**: `/me/attempts`
  - Берётся из `localStorage` (`ch_f_attempts`).

- **Детали попытки**: `/attempts/:attemptId`
  - Детальный разбор + кнопка «Обсудить с ИИ».

- **Чат с ИИ (общий)**: `/assistant`
  - Моковый чат, `TODO(ai)` для подключения модели.

- **Чат по попытке**: `/assistant/attempt/:attemptId`
  - Моковый чат c контекстом конкретной попытки.

- **Админ‑панель (преподаватель)**: `/admin`
  - Создание задания: `/admin/tasks/new`
  - Создание теста: `/admin/tests/new`

---

### 3. Где что хранится сейчас

- **Пользователь**: `src/providers/auth-provider.tsx` + `src/types/auth.ts`
  - localStorage, ключ `ch_f_user`.

- **Курсы и уроки**: `src/data/mock.ts`
  - Используются в `/courses` и уроках.

- **Попытки**: `src/lib/attempts-store.ts`
  - localStorage, ключ `ch_f_attempts`.

- **Навигация и шапка/подвал**:
  - Header: `src/components/navigation/header.tsx`
  - Footer: `src/components/navigation/footer.tsx`

- **Описание архитектуры и ИИ**:
  - Общая архитектура: `ARCHITECTURE.md`
  - Точки интеграции ИИ: `TODO_AI.md`

