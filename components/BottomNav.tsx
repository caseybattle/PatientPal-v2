'use client';

import { Home, FileText, Sparkles, Activity, User, Pill, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/medications', icon: Pill, label: 'Meds' },
    { href: '/explain', icon: Sparkles, label: 'AI Assist', isCenter: true },
    { href: '/reports', icon: FileText, label: 'Reports' },
    { href: '/prep', icon: ClipboardList, label: 'Prep' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-[#111821] border-t border-slate-200 dark:border-slate-800 px-4 pb-safe pt-2 z-50">
      <div className="flex justify-between items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 -mt-8">
                <div className={`p-4 rounded-full shadow-lg border-4 border-white dark:border-[#111821] transition-transform active:scale-95 ${isActive ? 'bg-blue-600 shadow-blue-600/40' : 'bg-primary shadow-primary/40'}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-[10px] font-medium mt-1 ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
              <Icon className={`w-6 h-6 ${isActive ? 'fill-primary/20' : ''}`} />
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
