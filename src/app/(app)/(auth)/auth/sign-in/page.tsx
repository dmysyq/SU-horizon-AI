'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { useAuth } from '@/providers/auth-provider';
import { ROUTES } from '@/lib/constants';

const schema = z.object({
  email: z.string().min(1, 'Введите email').email('Неверный формат email'),
  password: z.string().min(1, 'Введите пароль'),
});

export default function SignInPage() {
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setError(null);
    try {
      await signIn(values.email, values.password);
      const from = searchParams.get('from') || ROUTES.HOME;
      window.location.href = from;
    } catch {
      setError('Ошибка входа. Попробуйте ещё раз.');
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="flex justify-center">
        <Logo />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Вход</CardTitle>
          <CardDescription>Введите email и пароль. Для роли преподавателя используйте email с &quot;teacher&quot; или &quot;admin&quot;.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="user@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
          </Form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Нет аккаунта?{' '}
            <Link href={ROUTES.SIGN_UP} className="text-primary hover:underline">
              Регистрация
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
