'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Wallet, ReceiptText, LogOut } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/income', label: 'Income', icon: Wallet },
  { href: '/dashboard/expenses', label: 'Expenses', icon: ReceiptText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card flex flex-col min-h-screen">
      <div className="p-6 h-16 flex items-center border-b">
        <h2 className="text-2xl font-bold tracking-tight">DevTrackr</h2>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t mt-auto">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={() => authService.logout()}>
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
