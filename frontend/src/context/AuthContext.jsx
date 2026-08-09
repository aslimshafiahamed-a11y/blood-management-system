import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.login(email, password);
      if (res.success && res.data) {
        const { access, refresh, user: userData } = res.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, user: userData };
      }
      throw new Error(res.message || 'Login failed');
    } catch (err) {
      const msg = err.message || err.errors?.detail || 'Invalid email or password';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.register(formData);
      if (res.success && res.data) {
        const { access, refresh, user: userData } = res.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, user: userData };
      }
      throw new Error(res.message || 'Registration failed');
    } catch (err) {
      const msg = err.message || err.errors?.detail || 'Registration failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async (role) => {
    const demoAccounts = {
      ADMIN: { email: 'admin@bloodline.org', pass: 'Admin@123456' },
      BLOOD_BANK_STAFF: { email: 'bank@bloodline.org', pass: 'Bank@123456' },
      HOSPITAL_STAFF: { email: 'hospital@bloodline.org', pass: 'Hospital@123456' },
      DONOR: { email: 'donor@bloodline.org', pass: 'Donor@123456' },
    };

    const target = demoAccounts[role];
    if (target) {
      return await login(target.email, target.pass);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    role: user?.role || null,
    isAdmin: user?.role === 'ADMIN',
    isBloodBankStaff: user?.role === 'BLOOD_BANK_STAFF',
    isHospitalStaff: user?.role === 'HOSPITAL_STAFF',
    isDonor: user?.role === 'DONOR',
    isLoading,
    error,
    login,
    register,
    demoLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
