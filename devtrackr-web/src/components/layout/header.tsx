'use client';

import { useAuth } from '@/hooks/use-auth';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6">
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        {user ? (
          <span className="text-sm font-medium text-muted-foreground">
            {user.email}
          </span>
        ) : null}
      </div>
    </header>
  );
}
