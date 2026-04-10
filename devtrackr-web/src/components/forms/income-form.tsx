'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { incomeService } from '@/services/income.service';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Amount must be greater than 0',
    }),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
});

export function IncomeForm() {
  const queryClient = useQueryClient();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => incomeService.createIncome({
      amount: Number(data.amount),
      description: data.description,
      date: data.date,
    }),
    onSuccess: () => {
      form.reset({
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      queryClient.invalidateQueries({ queryKey: ['incomes'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createMutation.mutate(values);
  }

  return (
    <Card className="border-none shadow-sm rounded-xl bg-white overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
        <CardTitle className="text-lg font-bold text-slate-800">Add Income</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">Amount ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" className="rounded-xl h-11" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Salary, Freelance" className="rounded-xl h-11" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">Date</FormLabel>
                  <FormControl>
                    <Input type="date" className="rounded-xl h-11" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {createMutation.isError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                Failed to add income. Please try again.
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors mt-2"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Income'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}