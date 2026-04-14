import { Card, CardContent } from '@/components/ui/card';

interface LessonContentProps {
  courseSlug: string;
  lessonSlug: string;
}

export function LessonContent({ courseSlug, lessonSlug }: LessonContentProps) {
  // Мок контента — в реальности из API/БД
  const content: Record<string, string> = {
    'sql-basics-intro': 'SQL (Structured Query Language) — язык запросов к реляционным базам данных. С его помощью можно выбирать, вставлять, обновлять и удалять данные.',
    'sql-basics-select': 'SELECT column1, column2 FROM table_name; — базовая конструкция выборки. Звёздочка (*) выбирает все столбцы.',
    'sql-basics-where': 'WHERE условие — фильтрация строк. Операторы: =, <>, <, >, <=, >=, AND, OR, NOT, IN, LIKE.',
    'sql-basics-join': 'JOIN объединяет таблицы по ключам. INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN.',
    'python-intro-variables': 'Переменные в Python не требуют объявления типа. a = 10, name = "hello"',
    'python-intro-cycles': 'for i in range(10): ... while condition: ...',
    'python-intro-functions': 'def my_func(x): return x * 2',
  };
  const key = `${courseSlug}-${lessonSlug}`;
  const text = content[key] ?? 'Содержание урока загружается...';

  return (
    <Card>
      <CardContent className="pt-6 prose dark:prose-invert max-w-none">
        <p>{text}</p>
      </CardContent>
    </Card>
  );
}
