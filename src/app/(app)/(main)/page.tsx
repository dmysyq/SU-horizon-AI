'use client';

import Link from 'next/link';
import { BookOpen, Bot, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/lib/constants';
import { useAuth } from '@/providers/auth-provider';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Обучение с мгновенной обратной связью от ИИ
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Сдавайте тесты и отчёты — получайте оценку, разбор ошибок и рекомендации по материалам в один клик.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={ROUTES.COURSES}>
            <Button size="lg">Курсы</Button>
          </Link>
          {!isAuthenticated && (
            <Link href={ROUTES.SIGN_IN}>
              <Button variant="outline" size="lg">
                Войти
              </Button>
            </Link>
          )}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <BookOpen className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Курсы и тесты</CardTitle>
            <CardDescription>Изучайте материал и проходите задания по разным дисциплинам</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Bot className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Проверка ИИ</CardTitle>
            <CardDescription>Автоматическая оценка по критериям, разбор ошибок и рекомендации</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CheckCircle className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Чат-консультация</CardTitle>
            <CardDescription>Задавайте вопросы по пройденному тесту — ИИ объясняет на вашем уровне</CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
