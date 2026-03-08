import { BottomNav } from '@/components/BottomNav';
import { NotificationProvider } from '@/components/NotificationProvider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-xl overflow-x-hidden pb-24">
        {children}
        <BottomNav />
      </div>
    </NotificationProvider>
  );
}
