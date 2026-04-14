'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ROUTES } from '@/lib/constants';
import { useAuth } from '@/providers/auth-provider';

export function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="border-t bg-[hsl(var(--surface-dark))] dark:bg-black/20">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Logo whiteText />
          <nav className="flex flex-wrap gap-4 text-sm text-white/80">
            <Link href={ROUTES.COURSES} className="hover:text-white">
              Курсы
            </Link>
            {!isAuthenticated && (
              <Link href={ROUTES.SIGN_IN} className="hover:text-white">
                Войти
              </Link>
            )}
          </nav>
        </div>
        <p className="mt-6 text-sm text-white/70">
          © {new Date().getFullYear()} SU-Horizon AI. Платформа с ИИ для проверки заданий.
        </p>
      </div>
    </footer>
  );
}
