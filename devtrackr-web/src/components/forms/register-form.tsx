'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { authService } from '@/services/auth.service';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export function RegisterForm() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setErrorMsg(null);
    try {
      await authService.register(values.email, values.password, values.name);
      router.push('/login');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setErrorMsg(error.response?.data?.message || 'Registration failed. Try again.');
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="space-y-2 mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight">Create account</h1>
        <p className="text-muted-foreground">Enter your details below to create your account</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-destructive/15 text-destructive text-sm font-medium">
              {errorMsg}
            </div>
          )}
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" className="rounded-xl h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80">Email address</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" type="email" className="rounded-xl h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80">Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" className="rounded-xl h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80">Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" className="rounded-xl h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-base mt-4 transition-colors" 
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating account...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-8 text-center sm:text-left">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-slate-900 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
        <p className="text-xs text-muted-foreground mt-4 sm:hidden">
          Join developers tracking their finances
        </p>
      </div>
    </div>
  );
}
