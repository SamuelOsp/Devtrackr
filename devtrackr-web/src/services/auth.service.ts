import { api } from './api';
import { AuthUser } from '../types/api.types';

export const authService = {
  async login(email: string, password: string): Promise<void> {
    const response: any = await api.post('/auth/login', { email, password });
    if (response.access_token) {
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify({ 
        id: response.id, 
        email: response.email, 
        name: response.name 
      }));
      document.cookie = 'auth-token=true; path=/'; // For middleware
    }
  },
  
  async register(email: string, password: string, name?: string): Promise<void> {
    await api.post('/auth/register', { email, password, name });
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      window.location.href = '/login';
    }
  },

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  },

  getUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};
