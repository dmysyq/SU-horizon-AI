'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function AssistantPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: 'user', text: input }]);
    setInput('');
    // TODO(ai): вызвать API чата ИИ — POST /api/chat { message, attemptId?, courseSlug? }
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'ai', text: 'Ответ ИИ (мок). В продакшене — генерация по контексту теста и курса.' }]);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Чат с ИИ</h1>
        <p className="text-muted-foreground mt-1">
          Задайте вопросы по пройденным тестам.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Диалог</CardTitle>
          <CardDescription>Консультация по теме курса</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-sm">Напишите вопрос — ИИ ответит в контексте вашего обучения.</p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                  <span className={msg.role === 'user' ? 'text-primary font-medium' : 'text-muted-foreground'}>
                    {msg.role === 'user' ? 'Вы' : 'ИИ'}
                  </span>
                  <p className="mt-1 rounded-lg bg-muted p-3 text-sm">{msg.text}</p>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Textarea
              placeholder="Ваш вопрос..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              rows={2}
              className="resize-none"
            />
            <Button onClick={handleSend} className="self-end">
              Отправить
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
