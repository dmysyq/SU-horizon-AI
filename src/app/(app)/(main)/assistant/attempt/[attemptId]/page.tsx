'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function AssistantAttemptPage() {
  const params = useParams();
  const attemptId = params.attemptId as string;
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: 'user', text: input }]);
    setInput('');
    // TODO(ai): вызвать API с контекстом attemptId — ИИ знает ошибки и рекомендации
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'ai', text: `Ответ ИИ по попытке #${attemptId}. TODO: здесь будет подробное объяснение ошибки и правильный подход.` }]);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Чат по попытке #{attemptId}</h1>
        <p className="text-muted-foreground mt-1">
          ИИ знает контекст вашей проверки — задайте вопросы по ошибкам и рекомендациям
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Контекст</CardTitle>
          <CardDescription>Попытка #{attemptId} — баллы, замечания и рекомендации переданы ИИ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-sm">Спросите у ИИ вопрос по пройденной попытке</p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                  <span className={msg.role === 'user' ? 'text-primary font-medium' : 'text-muted-foreground'}>{msg.role === 'user' ? 'Вы' : 'ИИ'}
                  </span>
                  <p className="mt-1 rounded-lg bg-muted p-3 text-sm">{msg.text}</p>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Textarea placeholder="Ваш вопрос..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' 
              && !e.shiftKey && (e.preventDefault(), handleSend())} rows={2} className="resize-none" />
            <Button onClick={handleSend} className="self-end">Отправить</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
