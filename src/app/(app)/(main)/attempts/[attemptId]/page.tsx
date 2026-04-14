'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ROUTES } from '@/lib/constants';
import { getAttempt } from '@/lib/attempts-store';

export default function AttemptPage() {
  const params = useParams();
  const attemptId = params.attemptId as string;
  const [attempt, setAttempt] = useState<ReturnType<typeof getAttempt>>(null);

  useEffect(() => {
    setAttempt(getAttempt(attemptId));
  }, [attemptId]);

  if (attempt === null) return null; // loading
  if (!attempt) notFound();

  const percent = Math.round((attempt.score / attempt.maxScore) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Результат проверки</h1>
        <p className="text-muted-foreground">{attempt.courseTitle} — {attempt.lessonTitle}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Баллы</CardTitle>
          <Progress value={percent} className="h-3" />
          <p className="text-2xl font-bold">{attempt.score} / {attempt.maxScore}</p>
        </CardHeader>
      </Card>
      {attempt.studentAnswer && (
        <Card>
          <CardHeader>
            <CardTitle>Ваш ответ</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded bg-muted p-4 text-sm font-mono">{attempt.studentAnswer}</pre>
          </CardContent>
        </Card>
      )}
      {attempt.errors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Замечания ИИ</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              {attempt.errors.map((e, i) => (
                <li key={i} className="text-muted-foreground">{e}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      {attempt.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Рекомендации</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              {attempt.recommendations.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      <Link href={ROUTES.ASSISTANT_ATTEMPT(attemptId)}>
        <Button>Обсудить с ИИ в чате</Button>
      </Link>
    </div>
  );
}
