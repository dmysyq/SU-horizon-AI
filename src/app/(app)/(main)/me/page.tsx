import Link from 'next/link';
import { BookOpen, MessageSquare, FileCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createMetadata } from '@/lib/metadata';
import { ROUTES } from '@/lib/constants';

export const metadata = createMetadata({
  title: 'Мой кабинет',
  description: 'Дэшборд студента',
  path: '/me',
});

export default function MePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Мой кабинет</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <BookOpen className="h-8 w-8 text-primary" />
            <CardTitle>Курсы</CardTitle>
            <CardDescription>Продолжить обучение</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={ROUTES.COURSES}>
              <Button variant="outline">Перейти к курсам</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <FileCheck className="h-8 w-8 text-primary" />
            <CardTitle>История попыток</CardTitle>
            <CardDescription>Результаты проверок ИИ</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={ROUTES.ME_ATTEMPTS}>
              <Button variant="outline">Смотреть историю</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <MessageSquare className="h-8 w-8 text-primary" />
            <CardTitle>Чат с ИИ</CardTitle>
            <CardDescription>Задать вопрос по тесту</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={ROUTES.ASSISTANT}>
              <Button variant="outline">Открыть чат</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
