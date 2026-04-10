'use client';

import { useEffect, useRef } from 'react';
import { LoginForm } from '@/components/forms/login-form';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import gsap from 'gsap';

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from('.brand-element', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
      });

      tl.from('.floating-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      }, '-=0.2');

      gsap.to('.floating-card', {
        y: -10,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        stagger: 0.5,
        delay: 1.2
      });

      gsap.from('.auth-form-container', {
        x: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="flex min-h-screen bg-white">
      {/* Left Panel - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-[60%] bg-slate-900 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50 pointer-events-none" />
        
        <div className="relative z-10 brand-element">
          <div className="flex items-center gap-2 text-white/90">
            <TrendingUp strokeWidth={2.5} />
            <span className="text-xl font-bold tracking-tight">DevTrackr</span>
          </div>
        </div>

        <div className="relative z-10 max-w-xl mt-20 mb-auto">
          <h1 className="brand-element text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Take control of your finances
          </h1>
          <p className="brand-element text-lg text-slate-300">
            Track income, expenses and profitability in one seamless dashboard designed for professionals.
          </p>

          {/* Floating Cards */}
          <div className="mt-16 space-y-4 max-w-sm">
            <div className="floating-card bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
              <div className="bg-green-500/20 p-3 rounded-full text-green-400">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Freelance income</p>
                <p className="text-xl font-bold text-white">+$4,200.00</p>
              </div>
            </div>
            
            <div className="floating-card bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl flex items-center gap-4 shadow-xl ml-12">
              <div className="bg-red-500/20 p-3 rounded-full text-red-400">
                <TrendingDown size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Monthly expenses</p>
                <p className="text-xl font-bold text-white">-$890.00</p>
              </div>
            </div>

            <div className="floating-card bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
              <div className="bg-blue-500/20 p-3 rounded-full text-blue-400">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Net profit</p>
                <p className="text-xl font-bold text-white">$3,310.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-[40%] flex flex-col items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-sm lg:hidden flex items-center gap-2 mb-12 text-slate-900 auth-form-container">
          <TrendingUp strokeWidth={2.5} className="text-slate-900" />
          <span className="text-xl font-bold tracking-tight">DevTrackr</span>
        </div>
        
        <div className="w-full auth-form-container">
          <LoginForm />
        </div>
        
        <div className="hidden lg:block absolute bottom-12 auth-form-container text-center">
          <p className="text-xs text-muted-foreground font-medium">
            Join developers tracking their finances
          </p>
        </div>
      </div>
    </main>
  );
}
