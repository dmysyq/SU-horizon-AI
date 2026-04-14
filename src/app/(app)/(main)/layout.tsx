import { ProtectedRoute } from '@/providers/protected-route';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        {children}
      </div>
    </ProtectedRoute>
  );
}
