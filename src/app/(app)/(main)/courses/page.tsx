import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createMetadata } from '@/lib/metadata';
import { ROUTES } from '@/lib/constants';
import { MOCK_COURSES } from '@/data/mock';

export const metadata = createMetadata({
  title: 'Курсы',
  description: 'Каталог курсов с ИИ-проверкой заданий',
  path: '/courses',
});

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Курсы</h1>
        <p className="text-muted-foreground mt-1">Выберите курс и начинайте обучение с проверкой ИИ</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {MOCK_COURSES.map((course) => (
          <Card key={course.slug}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
              <span className="text-xs text-muted-foreground">{course.level}</span>
            </CardHeader>
            <CardContent>
              <Link href={ROUTES.COURSE(course.slug)}>
                <Button>Перейти к курсу</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
