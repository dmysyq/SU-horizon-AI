import Link from 'next/link';
import { FileQuestion, ClipboardList } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createMetadata } from '@/lib/metadata';
import { ROUTES } from '@/lib/constants';

export const metadata = createMetadata({
  title: 'Админ',
  description: 'Создание заданий и тестов',
  path: '/admin',
});

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Панель преподавателя</h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Создавайте задания и тесты для студентов. ИИ поможет проверить ответы и объяснить ошибки.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="space-y-2">
            <FileQuestion className="h-8 w-8 text-primary" />
            <CardTitle>Новое задание</CardTitle>
            <CardDescription>Открытый вопрос, код, задача с критериями для ИИ</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={ROUTES.ADMIN_TASKS_NEW}>
              <Button>Создать задание</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-2">
            <ClipboardList className="h-8 w-8 text-primary" />
            <CardTitle>Новый тест</CardTitle>
            <CardDescription>Набор вопросов с вариантами и открытыми ответами</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={ROUTES.ADMIN_TESTS_NEW}>
              <Button>Создать тест</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
