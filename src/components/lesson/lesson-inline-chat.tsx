'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LessonInlineChatProps {
  attemptId: string;
  courseTitle: string;
  lessonTitle: string;
  score: number;
  maxScore: number;
}

type ChatMessage = { role: 'user' | 'ai'; text: string };

/**
 * Инлайн-чат под тестом.
 * TODO(ai): заменить моковый ответ на вызов реального ИИ с контекстом попытки.
 */
export function LessonInlineChat({ attemptId, courseTitle, lessonTitle, score, maxScore }: LessonInlineChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'ai',
      text: `Контекст попытки #${attemptId} по уроку «${lessonTitle}» курса «${courseTitle}»: ${score}/${maxScore}. Задайте вопрос.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const question = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: question }]);

    // TODO(ai): вызвать API чата ИИ с контекстом attemptId.
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: 'TODO ответ ИИ. Здесь будет подробное объяснение ошибки и правильный подход на основе результата проверки.',
        },
      ]);
      setLoading(false);
    }, 800);
  };

  return (
    <Card className="mt-6 border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <CardHeader>
        <CardTitle>Объяснить ошибки с помощью ИИ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-64 space-y-3 overflow-y-auto rounded-md border border-border/40 bg-background/80 p-3 text-sm">
          {messages.map((m, idx) => (
            <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
              <div className="mb-0.5 text-xs font-semibold text-muted-foreground">
                {m.role === 'user' ? 'Вы' : 'ИИ'}
              </div>
              <div
                className={cn(
                  'inline-block max-w-full rounded-lg px-3 py-2 text-left',
                  m.role === 'user'
                    ? 'bg-secondary/20 text-foreground'
                    : 'bg-primary/10 text-foreground'
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-muted-foreground">Задайте вопрос по неверным ответам, и ИИ объяснит, в чём ошибка.</p>
          )}
        </div>
        <div className="flex gap-2">
          <textarea
            className="min-h-[44px] flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Например: «Объясни, почему мой ответ на запрос WHERE неверен»"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button onClick={handleSend} disabled={!input.trim() || loading} className="self-end">
            Отправить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

