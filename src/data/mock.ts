// Моковые данные для эталонной структуры

export interface MockCourse {
  slug: string;
  title: string;
  description: string;
  level: string;
  lessons: MockLesson[];
}

export interface MockLesson {
  slug: string;
  title: string;
  hasTask: boolean;
  hasReport?: boolean;
}

export interface MockAttempt {
  id: string;
  courseSlug: string;
  lessonSlug?: string;
  taskId?: string;
  type: 'test' | 'report';
  score: number;
  maxScore: number;
  date: string;
}

export const MOCK_COURSES: MockCourse[] = [
  {
    slug: 'sql-basics',
    title: 'Основы SQL',
    description: 'Введение в реляционные базы данных и язык запросов SQL.',
    level: 'Начальный',
    lessons: [
      { slug: 'intro', title: 'Введение в SQL', hasTask: false },
      { slug: 'select', title: 'Запросы SELECT', hasTask: true },
      { slug: 'where', title: 'Фильтрация WHERE', hasTask: true },
      { slug: 'join', title: 'Объединение JOIN', hasTask: true, hasReport: true },
    ],
  },
  {
    slug: 'python-intro',
    title: 'Введение в Python',
    description: 'Базовый курс программирования на Python.',
    level: 'Начальный',
    lessons: [
      { slug: 'variables', title: 'Переменные и типы', hasTask: false },
      { slug: 'cycles', title: 'Циклы и условия', hasTask: true },
      { slug: 'functions', title: 'Функции', hasTask: true },
    ],
  },
];
