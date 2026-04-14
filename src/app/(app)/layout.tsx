import { AuthProvider } from '@/providers/auth-provider';
import { Header } from '@/components/navigation/header';
import { Footer } from '@/components/navigation/footer';
import { Toaster } from '@/components/ui/sonner';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </AuthProvider>
  );
}
