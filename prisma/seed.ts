import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sqlCourse = await prisma.course.upsert({
    where: { slug: 'sql-basics' },
    update: {},
    create: {
      slug: 'sql-basics',
      title: 'Основы SQL',
      description: 'Введение в реляционные базы данных и язык запросов SQL.',
      level: 'Начальный',
    },
  });

  const pythonCourse = await prisma.course.upsert({
    where: { slug: 'python-intro' },
    update: {},
    create: {
      slug: 'python-intro',
      title: 'Введение в Python',
      description: 'Базовый курс программирования на Python.',
      level: 'Начальный',
    },
  });

  const lessons = [
    { slug: 'intro', title: 'Введение в SQL', content: 'SQL — язык запросов к реляционным БД.', hasTask: false, hasReport: false, orderIndex: 0, courseId: sqlCourse.id },
    { slug: 'select', title: 'Запросы SELECT', content: 'SELECT column1, column2 FROM table_name;', hasTask: true, hasReport: false, orderIndex: 1, courseId: sqlCourse.id },
    { slug: 'where', title: 'Фильтрация WHERE', content: 'WHERE условие. Операторы: =, <>, AND, OR.', hasTask: true, hasReport: false, orderIndex: 2, courseId: sqlCourse.id },
    { slug: 'join', title: 'Объединение JOIN', content: 'INNER JOIN, LEFT JOIN, RIGHT JOIN.', hasTask: true, hasReport: true, orderIndex: 3, courseId: sqlCourse.id },
    { slug: 'variables', title: 'Переменные и типы', content: 'Переменные в Python.', hasTask: false, hasReport: false, orderIndex: 0, courseId: pythonCourse.id },
    { slug: 'cycles', title: 'Циклы и условия', content: 'for, while.', hasTask: true, hasReport: false, orderIndex: 1, courseId: pythonCourse.id },
    { slug: 'functions', title: 'Функции', content: 'def my_func(x): ...', hasTask: true, hasReport: false, orderIndex: 2, courseId: pythonCourse.id },
  ];

  for (const l of lessons) {
    await prisma.lesson.upsert({
      where: { courseId_slug: { courseId: l.courseId, slug: l.slug } },
      update: {},
      create: l,
    });
  }

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
