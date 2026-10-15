import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, StudentProfile, RecruiterProfile } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<User>;
  registerStudent: (data: any) => Promise<User>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateProfileState: (profile: StudentProfile | RecruiterProfile) => void;
  // Global Toast notification
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
  // Active modal controls
  authModal: 'login' | 'register' | null;
  setAuthModal: (modal: 'login' | 'register' | null) => void;
  // Current view/route navigation
  currentRoute: string;
  navigate: (route: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_KEY = 'kmv_placement_auth_user';
const AUTH_TOKEN_KEY = 'kmv_placement_auth_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const [currentRoute, setCurrentRoute] = useState<string>('home');

  useEffect(() => {
    // Restore session on page refresh
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
        const storedUser = localStorage.getItem(AUTH_USER_KEY);
        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          // Fetch freshest user data from API
          try {
            const freshUser = await api.auth.getMe(parsedUser.id);
            setUser(freshUser);
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(freshUser));
          } catch {
            setUser(parsedUser);
          }
        }
      } catch (err) {
        console.error('Failed to restore auth session', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const clearToast = () => setToast(null);

  const login = async (email: string, pass: string): Promise<User> => {
    setIsLoading(true);
    try {
      const res = await api.auth.login(email, pass);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.user));
      localStorage.setItem(AUTH_TOKEN_KEY, res.token);
      setAuthModal(null);
      showToast(`Welcome back, ${res.user.name}!`, 'success');

      // Navigate to respective dashboard
      if (res.user.role === 'student') setCurrentRoute('student/dashboard');
      else if (res.user.role === 'recruiter') setCurrentRoute('recruiter/dashboard');
      else if (res.user.role === 'admin') setCurrentRoute('admin/dashboard');

      return res.user;
    } catch (err: any) {
      showToast(err.message || 'Login failed', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const registerStudent = async (data: any): Promise<User> => {
    setIsLoading(true);
    try {
      const res = await api.auth.registerStudent(data);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.user));
      localStorage.setItem(AUTH_TOKEN_KEY, res.token);
      setAuthModal(null);
      showToast('Registration successful! Welcome to KMV Placement Cell.', 'success');
      setCurrentRoute('student/dashboard');
      return res.user;
    } catch (err: any) {
      showToast(err.message || 'Registration failed', 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setCurrentRoute('home');
    showToast('Logged out successfully', 'info');
  };

  const refreshUser = async () => {
    if (!user) return;
    try {
      const fresh = await api.auth.getMe(user.id);
      setUser(fresh);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(fresh));
    } catch (err) {
      console.error('Refresh user error', err);
    }
  };

  const updateProfileState = (profile: StudentProfile | RecruiterProfile) => {
    if (!user) return;
    const updatedUser = { ...user, profile };
    setUser(updatedUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser));
  };

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        token,
        isLoading,
        login,
        registerStudent,
        logout,
        refreshUser,
        updateProfileState,
        toast,
        showToast,
        clearToast,
        authModal,
        setAuthModal,
        currentRoute,
        navigate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
