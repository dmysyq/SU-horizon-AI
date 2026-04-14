'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ROUTES } from '@/lib/constants';

const schema = z.object({
  title: z.string().min(1, 'Введите название'),
  description: z.string().optional(),
  criteria: z.string().min(1, 'Опишите критерии оценки'),
  courseSlug: z.string().min(1, 'Выберите курс'),
});

export default function NewTaskPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', description: '', criteria: '', courseSlug: 'sql-basics' },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log('Task:', values);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Задание создано (мок)</h1>
        <p className="text-muted-foreground">В продакшене здесь будет сохранение в БД и привязка к уроку</p>
        <Link href={ROUTES.ADMIN}>
          <Button>Вернуться в админку</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href={ROUTES.ADMIN} className="text-sm text-muted-foreground hover:text-foreground">← Админ</Link>
        <h1 className="text-3xl font-bold mt-1">Новое задание</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Параметры</CardTitle>
          <CardDescription>Критерии будут переданы ИИ для оценки</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Например: Написать SELECT запрос" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание (опционально)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Условие задачи..." {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="criteria" render={({ field }) => (
                <FormItem>
                  <FormLabel>Критерии оценки для ИИ</FormLabel>
                  <FormControl>
                    <Textarea placeholder="1. Корректность синтаксиса 2. Полнота ответа 3. ..." {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="courseSlug" render={({ field }) => (
                <FormItem>
                  <FormLabel>Курс</FormLabel>
                  <FormControl>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...field}>
                      <option value="sql-basics">Основы SQL</option>
                      <option value="python-intro">Введение в Python</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit">Создать задание</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
