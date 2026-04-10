'use client';

import { useQuery } from '@tanstack/react-query';
import { summaryService } from '@/services/summary.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const incomeRef = useRef<HTMLDivElement>(null);
  const expensesRef = useRef<HTMLDivElement>(null);
  const balanceRef = useRef<HTMLDivElement>(null);

  const { data: summary, isLoading, isError } = useQuery({
    queryKey: ['summary'],
    queryFn: () => summaryService.getSummary(),
  });

  useEffect(() => {
    if (isLoading || isError || !summary) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Cards entrance
      gsap.from('.summary-card', {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Chart entrance
      gsap.from('.chart-container', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.out',
      });

      // Number counters
      if (incomeRef.current) animateCounter(incomeRef.current, summary.totalIncome, '$');
      if (expensesRef.current) animateCounter(expensesRef.current, summary.totalExpenses, '$');
      if (balanceRef.current) animateCounter(balanceRef.current, summary.balance, summary.balance >= 0 ? '$' : '-$');

    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, isError, summary]);

  const animateCounter = (element: HTMLElement, targetValue: number, prefix: string) => {
    const absValue = Math.abs(targetValue);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: absValue,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (element) element.innerHTML = prefix + obj.val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <div className="text-muted-foreground">Loading summary...</div>
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <div className="text-destructive bg-destructive/10 p-4 rounded-xl font-medium">Failed to load summary data.</div>
      </div>
    );
  }

  const chartData = [
    {
      name: 'Financial Overview',
      Income: summary.totalIncome,
      Expenses: summary.totalExpenses,
    },
  ];

  return (
    <div ref={containerRef} className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Income Card */}
        <Card className="summary-card border-none shadow-sm rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
          <div className="h-full border-l-4 border-l-green-500 bg-white">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500">Total Income</CardTitle>
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                <TrendingUp size={16} className="text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div ref={incomeRef} className="text-3xl font-bold text-slate-900">
                $0.00
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Expenses Card */}
        <Card className="summary-card border-none shadow-sm rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
          <div className="h-full border-l-4 border-l-red-500 bg-white">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500">Total Expenses</CardTitle>
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                <TrendingDown size={16} className="text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div ref={expensesRef} className="text-3xl font-bold text-slate-900">
                $0.00
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Balance Card */}
        <Card className="summary-card border-none shadow-sm rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 md:col-span-2 lg:col-span-1">
          <div className={`h-full border-l-4 bg-white ${summary.balance >= 0 ? 'border-l-blue-500' : 'border-l-red-500'}`}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500">Net Balance</CardTitle>
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <DollarSign size={16} className="text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div ref={balanceRef} className={`text-3xl font-bold ${summary.balance >= 0 ? 'text-slate-900' : 'text-red-600'}`}>
                $0.00
              </div>
            </CardContent>
          </div>
        </Card>
      </div>

      <div className="chart-container">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Financial Overview <span className="text-sm font-normal text-slate-500 ml-2">Income vs Expenses</span></h2>
        <Card className="border-none shadow-sm rounded-xl bg-white">
          <CardContent className="p-6">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    formatter={(value: number | string, name: string) => [`$${Number(value).toFixed(2)}`, name]}
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#0f172a', fontWeight: 500 }}
                  />
                  <Bar dataKey="Income" fill="#22c55e" radius={[6, 6, 0, 0]} maxBarSize={60} />
                  <Bar dataKey="Expenses" fill="#ef4444" radius={[6, 6, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
