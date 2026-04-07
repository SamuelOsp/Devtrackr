'use client';

import { useState, useEffect } from 'react';
import { AuthUser } from '../types/api.types';
import { authService } from '../services/auth.service';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(authService.getUser());
    setIsLoading(false);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout: authService.logout,
  };
}
