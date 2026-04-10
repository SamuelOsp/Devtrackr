'use client';

import { useAuth } from '@/hooks/use-auth';
import { Menu, TrendingUp } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100"
          >
            <Menu size={24} />
          </button>
        )}
        <div className="lg:hidden flex items-center gap-2 text-slate-900">
          <TrendingUp strokeWidth={2.5} size={20} />
          <span className="font-bold tracking-tight">DevTrackr</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-900">{user.name || 'User'}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-medium text-sm">
              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
