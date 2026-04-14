'use client';

import { ReactNode, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './auth-provider';
import { ROUTES } from '@/lib/constants';

interface ProtectedRouteProps {
  children: ReactNode;
  requireTeacher?: boolean;
}

export function ProtectedRoute({ children, requireTeacher }: ProtectedRouteProps) {
  const { user, isAuthenticated, isPending } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isPending) return;
    if (!isAuthenticated) {
      router.replace(`${ROUTES.SIGN_IN}?from=${encodeURIComponent(pathname)}`);
      return;
    }
    if (requireTeacher && user?.role !== 'teacher') {
      router.replace(ROUTES.ME);
    }
  }, [isPending, isAuthenticated, user, requireTeacher, router, pathname]);

  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!isAuthenticated) return null;
  if (requireTeacher && user?.role !== 'teacher') return null;

  return <>{children}</>;
}
