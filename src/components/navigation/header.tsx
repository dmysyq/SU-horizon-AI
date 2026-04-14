'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, User } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/providers/auth-provider';
import { ROUTES } from '@/lib/constants';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, isPending, signOut, isTeacher } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Меню"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Logo />
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link href={ROUTES.HOME} className={pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}>
            Главная
          </Link>
          <Link href={ROUTES.COURSES} className={pathname?.startsWith('/courses') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}>
            Курсы
          </Link>
          {isAuthenticated && (
            <>
              <Link href={ROUTES.ME} className={pathname?.startsWith('/me') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}>
                Мой кабинет
              </Link>
              <Link href={ROUTES.ASSISTANT} className={pathname?.startsWith('/assistant') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}>
                Чат с ИИ
              </Link>
              {isTeacher && (
                <Link href={ROUTES.ADMIN} className={pathname?.startsWith('/admin') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}>
                  Админ
                </Link>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isPending ? (
            <div className="h-8 w-20 animate-pulse rounded bg-muted" />
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                    <span className="text-xs font-normal text-muted-foreground">{user.role === 'teacher' ? 'Преподаватель' : 'Студент'}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={ROUTES.ME}>
                  <DropdownMenuItem>Мой кабинет</DropdownMenuItem>
                </Link>
                <Link href={ROUTES.ME_ATTEMPTS}>
                  <DropdownMenuItem>История попыток</DropdownMenuItem>
                </Link>
                {isTeacher && (
                  <>
                    <DropdownMenuSeparator />
                    <Link href={ROUTES.ADMIN}>
                      <DropdownMenuItem>Создать задание / тест</DropdownMenuItem>
                    </Link>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={signOut}>
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href={ROUTES.SIGN_IN}>
                <Button variant="outline" size="sm">Войти</Button>
              </Link>
              <Link href={ROUTES.SIGN_UP}>
                <Button size="sm">Регистрация</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t bg-background px-4 py-3 space-y-2">
          <Link href={ROUTES.HOME} className="block py-2" onClick={() => setMobileOpen(false)}>Главная</Link>
          <Link href={ROUTES.COURSES} className="block py-2" onClick={() => setMobileOpen(false)}>Курсы</Link>
          {isAuthenticated && (
            <>
              <Link href={ROUTES.ME} className="block py-2" onClick={() => setMobileOpen(false)}>Мой кабинет</Link>
              <Link href={ROUTES.ASSISTANT} className="block py-2" onClick={() => setMobileOpen(false)}>Чат с ИИ</Link>
              {isTeacher && <Link href={ROUTES.ADMIN} className="block py-2" onClick={() => setMobileOpen(false)}>Админ</Link>}
            </>
          )}
        </div>
      )}
    </header>
  );
}
