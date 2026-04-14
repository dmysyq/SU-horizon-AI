'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ClipboardList, FileQuestion, Home } from 'lucide-react';

import { ProtectedRoute } from '@/providers/protected-route';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Панель', icon: LayoutDashboard },
  { href: '/admin/tests/new', label: 'Новый тест', icon: ClipboardList },
  { href: '/admin/tasks/new', label: 'Новое задание', icon: FileQuestion },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <ProtectedRoute requireTeacher>
      <div className="grid min-h-[calc(100vh-3.5rem)] md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr] bg-gradient-to-br from-background to-background/80">
        {/* Левый сайдбар */}
        <aside className="relative hidden h-full border-r border-border/40 bg-background/90 pb-4 md:flex md:flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />
          <div className="relative z-10 flex h-14 items-center border-b border-border/40 px-4 lg:h-[60px] lg:px-6">
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                SU
              </div>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Horizon Admin
              </span>
            </Link>
          </div>
          <nav className="relative z-10 mt-4 space-y-1 px-2 lg:px-4 text-sm font-medium">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    active && 'bg-primary/10 text-primary'
                  )}
                >
                  <span className="relative z-10 flex h-5 w-5 items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Правая колонка */}
        <div className="flex flex-col">
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border/40 bg-background/90 px-4 backdrop-blur-sm lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-2 md:hidden">
              <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                <Home className="h-4 w-4" />
                На сайт
              </Link>
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="text-sm font-semibold text-foreground/80">Панель преподавателя</span>
            </div>
            <div className="hidden md:block w-20" />
          </header>
          <main className="relative flex-1 overflow-auto px-4 py-6 md:px-8 lg:px-10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            <div className="relative z-10 mx-auto w-full max-w-4xl space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

