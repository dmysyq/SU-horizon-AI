'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { addAttempt } from '@/lib/attempts-store';
import { ROUTES } from '@/lib/constants';
import { MOCK_COURSES } from '@/data/mock';
import { LessonInlineChat } from '@/components/lesson/lesson-inline-chat';

interface SubmitTaskFormProps {
  courseSlug: string;
  lessonSlug: string;
  type: 'test' | 'report';
}

/**
 * TODO(ai): Заменить на реальный API вызов к ИИ-сервису проверки.
 * Ожидаемый формат: POST /api/check { answer, courseSlug, lessonSlug, type }
 * Ответ: { score, maxScore, errors[], recommendations[] }
 */
function mockAICheck(_answer: string, type: 'test' | 'report'): { score: number; maxScore: number; errors: string[]; recommendations: string[] } {
  const score = Math.floor(Math.random() * 4) + 6; // 6-10
  const maxScore = 10;
  return {
    score,
    maxScore,
    errors: score < 8 ? ['Замечания от ии.'] : [],
    recommendations: score < 9 ? ['Рекомендации от ии.'] : [],
  };
}

export function SubmitTaskForm({ courseSlug, lessonSlug, type }: SubmitTaskFormProps) {
  const router = useRouter();
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; maxScore: number; errors: string[]; recommendations: string[] } | null>(null);
  const [lastAttemptId, setLastAttemptId] = useState<string | null>(null);

  const course = MOCK_COURSES.find((c) => c.slug === courseSlug);
  const lesson = course?.lessons.find((l) => l.slug === lessonSlug);

  const handleSubmit = async () => {
    if (!answer.trim() || !course || !lesson) return;
    setLoading(true);
    setResult(null);

    // TODO(ai): вызвать API — заменить setTimeout на fetch/axios
    await new Promise((r) => setTimeout(r, 1500));
    const aiResult = mockAICheck(answer, type);

    const id = crypto.randomUUID();
    const attempt = {
      id,
      courseSlug,
      courseTitle: course.title,
      lessonSlug,
      lessonTitle: lesson.title,
      type,
      studentAnswer: answer,
      score: aiResult.score,
      maxScore: aiResult.maxScore,
      errors: aiResult.errors,
      recommendations: aiResult.recommendations,
      date: new Date().toISOString().slice(0, 10),
    };

    addAttempt(attempt);
    setResult(aiResult);
    setLastAttemptId(id);
    setLoading(false);
  };

  if (result) {
    const percent = Math.round((result.score / result.maxScore) * 100);
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Результат проверки ИИ</CardTitle>
            <Progress value={percent} className="h-3" />
            <p className="text-2xl font-bold">
              {result.score} / {result.maxScore}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.errors.length > 0 && (
              <div>
                <h4 className="mb-2 font-medium">Замечания</h4>
                <ul className="space-y-1 pl-5 text-sm text-muted-foreground list-disc">
                  {result.errors.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.recommendations.length > 0 && (
              <div>
                <h4 className="mb-2 font-medium">Рекомендации</h4>
                <ul className="space-y-1 pl-5 text-sm list-disc">
                  {result.recommendations.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex gap-2">
              {/* <Button
                onClick={() => {
                  setResult(null);
                  setLastAttemptId(null);
                  setAnswer('');
                }}
              >
                Пересдать
              </Button> */}
              <Button variant="outline" onClick={() => router.push(ROUTES.ME_ATTEMPTS)}>
                История попыток
              </Button>
            </div>
          </CardContent>
        </Card>
        {lastAttemptId && course && lesson && (
          <LessonInlineChat
            attemptId={lastAttemptId}
            courseTitle={course.title}
            lessonTitle={lesson.title}
            score={result.score}
            maxScore={result.maxScore}
          />
        )}
      </>
    );
  }

  const title = type === 'test' ? 'Тест по теме' : 'Лабораторный отчёт';
  const placeholder = type === 'test' ? 'Ваш ответ (текст или код)...' : 'Текст отчёта...';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          {type === 'test' ? 'Введите ответ (текст или код)' : 'Вставьте текст отчёта'}
        </p>
        <Textarea
          placeholder={placeholder}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={type === 'report' ? 10 : 6}
          className="font-mono"
        />
        <Button
          onClick={handleSubmit}
          disabled={!answer.trim() || loading}
          isLoading={loading}
        >
          Отправить на проверку ИИ
        </Button>
        {loading && <p className="text-xs text-muted-foreground">ИИ анализирует ответ...</p>}
      </CardContent>
    </Card>
  );
}
