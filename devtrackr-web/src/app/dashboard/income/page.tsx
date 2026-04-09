'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { incomeService } from '@/services/income.service';
import { IncomeForm } from '@/components/forms/income-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function IncomePage() {
  const queryClient = useQueryClient();

  const { data: incomes, isLoading } = useQuery({
    queryKey: ['incomes'],
    queryFn: () => incomeService.getIncomes(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => incomeService.deleteIncome(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Income</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <IncomeForm />
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Income History</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-muted-foreground">Loading incomes...</div>
              ) : !incomes || incomes.length === 0 ? (
                <div className="text-center p-6 text-muted-foreground border rounded-lg border-dashed">
                  No income records found. Add your first income using the form.
                </div>
              ) : (
                <div className="space-y-4">
                  {incomes.map((income) => (
                    <div key={income.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{income.description}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(income.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                        <span className="font-bold text-green-600">
                          +${Number(income.amount).toFixed(2)}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
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
