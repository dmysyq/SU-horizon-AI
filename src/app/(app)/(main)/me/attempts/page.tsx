'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAttempts, type StoredAttempt } from '@/lib/attempts-store';
import { ROUTES } from '@/lib/constants';

export default function AttemptsPage() {
  const [attempts, setAttempts] = useState<StoredAttempt[]>([]);

  useEffect(() => {
    setAttempts(getAttempts());
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">История попыток</h1>
      <p className="text-muted-foreground">Результаты проверок заданий и тестов ИИ</p>
      <div className="space-y-4">
        {attempts.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Пока нет попыток. Пройдите тест в любом уроке.
            </CardContent>
          </Card>
        ) : (
          attempts.map((a) => (
            <Card key={a.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{a.courseTitle} — {a.lessonTitle}</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {a.type === 'test' ? 'Тест' : 'Отчёт'} • {a.score}/{a.maxScore} • {a.date}
                </span>
              </CardHeader>
              <CardContent>
                <Link href={ROUTES.ATTEMPT(a.id)} className="text-sm text-primary hover:underline">
                  Подробнее о результате →
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
