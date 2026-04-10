'use client';

import { useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { expensesService } from '@/services/expenses.service';
import { ExpenseForm } from '@/components/forms/expense-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import gsap from 'gsap';

export default function ExpensesPage() {
  const queryClient = useQueryClient();
  const listRef = useRef<HTMLDivElement>(null);

  const { data: expenses, isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => expensesService.getExpenses(),
  });

  useEffect(() => {
    if (!isLoading && expenses && expenses.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
  }, [expenses, isLoading]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => expensesService.deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Expenses Tracking</h1>
          <p className="text-slate-500 mt-1">Monitor where your money is going.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ExpenseForm />
        </div>
        
        <div className="lg:col-span-2 flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-4">Expense History</h2>
          <Card className="border-none shadow-sm rounded-xl bg-white flex-1">
            <CardContent className="p-0 sm:p-6" ref={listRef}>
              {isLoading ? (
                <div className="text-muted-foreground p-6">Loading expenses...</div>
              ) : !expenses || expenses.length === 0 ? (
                <div className="text-center p-12 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <TrendingDown className="text-red-500" size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-1">No expense records</h3>
                  <p className="text-slate-500 max-w-sm mx-auto mb-6">
                    You haven't recorded any expenses yet. Add your first spending using the form.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 p-4 sm:p-0">
                  {expenses.map((expense) => (
                    <div 
                      key={expense.id} 
                      className="list-item flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-red-200 hover:shadow-sm hover:bg-red-50/30 transition-all gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-900">{expense.description}</span>
                          {expense.category && (
                            <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 font-normal">
                              {expense.category.name}
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs font-medium text-slate-500">
                          {new Date(expense.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <span className="text-lg font-bold text-red-600 tracking-tight">
                          -${Number(expense.amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 shrink-0"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this expense?')) {
                              deleteMutation.mutate(expense.id);
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
