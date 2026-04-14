import { ProtectedRoute } from '@/providers/protected-route';

export default function AssistantLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
