'use client';

import { useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { incomeService } from '@/services/income.service';
import { IncomeForm } from '@/components/forms/income-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, PlusCircle, TrendingUp } from 'lucide-react';
import gsap from 'gsap';

export default function IncomePage() {
  const queryClient = useQueryClient();
  const listRef = useRef<HTMLDivElement>(null);

  const { data: incomes, isLoading } = useQuery({
    queryKey: ['incomes'],
    queryFn: () => incomeService.getIncomes(),
  });

  useEffect(() => {
    if (!isLoading && incomes && incomes.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const ctx = gsap.context(() => {
        gsap.from('.list-item', {
          opacity: 0,
          y: 15,
          stagger: 0.05,
          duration: 0.4,
          ease: 'power2.out',
        });
      }, listRef);
      return () => ctx.revert();
    }
  }, [incomes, isLoading]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => incomeService.deleteIncome(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Income Management</h1>
          <p className="text-slate-500 mt-1">Track and manage all your revenue streams.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <IncomeForm />
        </div>
        
        <div className="lg:col-span-2 flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Income History</h2>
          <Card className="border-none shadow-sm rounded-xl bg-white flex-1">
            <CardContent className="p-0 sm:p-6" ref={listRef}>
              {isLoading ? (
                <div className="text-muted-foreground p-6">Loading incomes...</div>
              ) : !incomes || incomes.length === 0 ? (
                <div className="text-center p-12 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="text-green-500" size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-1">No income records</h3>
                  <p className="text-slate-500 max-w-sm mx-auto mb-6">
                    You haven't recorded any income yet. Add your first revenue stream using the form.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 p-4 sm:p-0">
                  {incomes.map((income) => (
                    <div 
                      key={income.id} 
                      className="list-item flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-green-200 hover:shadow-sm hover:bg-green-50/30 transition-all gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{income.description}</span>
                          <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md whitespace-nowrap">
                            {new Date(income.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <span className="text-lg font-bold text-green-600 tracking-tight">
                          +${Number(income.amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 shrink-0"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this income?')) {
                              deleteMutation.mutate(income.id);
                            }
                          }}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
