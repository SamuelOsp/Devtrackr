'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, TrendingUp, Receipt, LogOut, X } from 'lucide-react';
import gsap from 'gsap';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/income', label: 'Income', icon: TrendingUp },
  { href: '/dashboard/expenses', label: 'Expenses', icon: Receipt },
];

interface SidebarProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen = false, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);
  const q = gsap.utils.selector(sidebarRef);

  useEffect(() => {
    // Initial mount animation for links
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const ctx = gsap.context(() => {
      gsap.from('.nav-item', {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.2
      });
    }, sidebarRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Handle mobile open/close
    // On desktop (>=1024px), we reset transform to none via CSS or GSAP
    if (window.innerWidth < 1024) {
      if (isOpen) {
        gsap.to(sidebarRef.current, { x: 0, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.to(sidebarRef.current, { x: -280, duration: 0.3, ease: 'power2.in' });
      }
    } else {
      // Clear transform on desktop
      gsap.set(sidebarRef.current, { clearProps: 'x' });
    }
    
    // Add resize listener to handle breakpoint changes
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        gsap.set(sidebarRef.current, { clearProps: 'x' });
      } else {
        gsap.set(sidebarRef.current, { x: isOpen ? 0 : -280 });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <aside 
      ref={sidebarRef}
      className={`fixed top-0 left-0 z-40 bg-slate-900 border-r border-slate-800 flex flex-col min-h-screen w-64 text-white
        lg:translate-x-0 ${!isOpen ? '-translate-x-full' : 'translate-x-0'} lg:!transform-none
      `}
    >
      <div className="p-6 h-16 flex items-center justify-between border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-white shrink-0" size={24} strokeWidth={2.5} />
          <h2 className="text-2xl font-bold tracking-tight text-white">DevTrackr</h2>
        </div>
        {setIsOpen && (
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen?.(false)}
              className={`nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'hover:bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800/60 mt-auto">
        <Button 
          variant="ghost" 
          className="nav-item w-full justify-start gap-3 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-xl" 
          onClick={() => authService.logout()}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
