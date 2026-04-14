import { ProtectedRoute } from '@/providers/protected-route';

export default function MeLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
