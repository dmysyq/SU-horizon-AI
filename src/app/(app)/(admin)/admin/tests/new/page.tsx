'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/lib/constants';

const optionSchema = z.string().min(1, 'Введите вариант ответа');

const questionSchema = z.object({
  text: z.string().min(1, 'Введите текст вопроса'),
  options: z.array(optionSchema).length(4, 'Должно быть 4 варианта'),
  correctIndex: z.number().min(0).max(3),
});

const schema = z.object({
  title: z.string().min(1, 'Введите название'),
  courseSlug: z.string().min(1, 'Выберите курс'),
  questions: z.array(questionSchema).min(1, 'Добавьте хотя бы один вопрос'),
});

type FormValues = z.infer<typeof schema>;

export default function NewTestPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      courseSlug: 'sql-basics',
      questions: [
        {
          text: '',
          options: ['', '', '', ''],
          correctIndex: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  const onSubmit = (values: FormValues) => {
    // TODO: сохранить в БД, когда она будет подключена
    console.log('Teacher test (mock save):', values);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Тест создан (мок)</h1>
        <p className="text-sm text-muted-foreground">В будущем здесь будет сохранение в БД и привязка к уроку.</p>
        <Link href={ROUTES.ADMIN}>
          <Button>Вернуться в админку</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <Link href={ROUTES.ADMIN} className="text-sm text-muted-foreground hover:text-foreground">
          ← Админ
        </Link>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Новый тест</h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Опишите тест и добавьте вопросы с четырьмя вариантами ответов. Один вариант всегда правильный.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Параметры теста</CardTitle>
          <CardDescription>Каждый вопрос: текст + 4 варианта, один правильный.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название теста</FormLabel>
                    <FormControl>
                      <Input placeholder="Тест по SELECT" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="courseSlug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Курс</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        {...field}
                      >
                        <option value="sql-basics">Основы SQL</option>
                        <option value="python-intro">Введение в Python</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Вопросы</h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      append({
                        text: '',
                        options: ['', '', '', ''],
                        correctIndex: 0,
                      })
                    }
                  >
                    Добавить вопрос
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <Card key={field.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-base">Вопрос {index + 1}</CardTitle>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="text-destructive"
                          >
                            Удалить
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <FormField
                        control={form.control}
                        name={`questions.${index}.text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Текст вопроса</FormLabel>
                            <FormControl>
                              <Input placeholder="Например: Что делает оператор SELECT?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <FormLabel>Варианты ответа (4)</FormLabel>
                        {Array.from({ length: 4 }).map((_, optionIndex) => (
                          <FormField
                            key={optionIndex}
                            control={form.control}
                            name={`questions.${index}.options.${optionIndex}`}
                            render={({ field }) => (
                              <FormItem className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  className="h-4 w-4 border-input text-primary"
                                  checked={form.watch(`questions.${index}.correctIndex`) === optionIndex}
                                  onChange={() =>
                                    form.setValue(`questions.${index}.correctIndex`, optionIndex, {
                                      shouldDirty: true,
                                    })
                                  }
                                />
                                <FormControl>
                                  <Input
                                    placeholder={`Вариант ${optionIndex + 1}`}
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button type="submit">Создать тест</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

