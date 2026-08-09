import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Droplet, Sparkles, ArrowRight } from 'lucide-react';
import { DonorRegistration } from '../assets/Illustrations';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Alert } from '../components/common/Alert';
import { Badge } from '../components/common/Badge';

export const LoginPage = () => {
  const { login, demoLogin, isLoading, error: authError } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Please enter both email address and password.');
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      navigate('/dashboard');
    }
  };

  const handleDemoSelect = async (role) => {
    setLocalError(null);
    const res = await demoLogin(role);
    if (res.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Teal / Blue Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10"
      >
        {/* Left Side: Auth Form */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-600 flex items-center justify-center shadow-glow-teal">
                <Droplet className="w-5 h-5 text-white fill-white/20" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                Blood<span className="text-primary-500">Line</span>
              </span>
            </Link>

            <div className="space-y-1 mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
              <p className="text-xs text-slate-500">Authenticate to access your role-based blood management workspace.</p>
            </div>

            {(localError || authError) && (
              <Alert type="error" className="mb-6" onClose={() => setLocalError(null)}>
                {localError || authError}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                icon={Mail}
                placeholder="name@bloodline.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="space-y-1.5">
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    icon={Lock}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-8 text-slate-400 hover:text-slate-700 text-xs"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-xs font-bold text-primary-600 hover:text-primary-700">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full mt-2 shadow-md">
                <span>Sign In to System</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Quick Demo Switcher */}
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>1-Click Demo Quick Auto-Fill:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoSelect('ADMIN')}
                  className="px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-500 text-left text-xs transition-colors"
                >
                  <span className="font-bold text-red-600 block">System Admin</span>
                  <span className="text-[10px] text-slate-500">admin@bloodline.org</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoSelect('BLOOD_BANK_STAFF')}
                  className="px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-blood-500 text-left text-xs transition-colors"
                >
                  <span className="font-bold text-blood-600 block">Blood Bank Staff</span>
                  <span className="text-[10px] text-slate-500">bank@bloodline.org</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoSelect('HOSPITAL_STAFF')}
                  className="px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-secondary-500 text-left text-xs transition-colors"
                >
                  <span className="font-bold text-secondary-600 block">Hospital Staff</span>
                  <span className="text-[10px] text-slate-500">hospital@bloodline.org</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoSelect('DONOR')}
                  className="px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary-500 text-left text-xs transition-colors"
                >
                  <span className="font-bold text-primary-600 block">Donor Account</span>
                  <span className="text-[10px] text-slate-500">donor@bloodline.org</span>
                </button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-primary-600 hover:text-primary-700">
              Register as Donor or Staff
            </Link>
          </p>
        </div>

        {/* Right Side: Healthcare Graphic */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-slate-50 border-l border-slate-200 relative">
          <div className="space-y-4 z-10">
            <Badge variant="primary">Enterprise Role Isolation</Badge>
            <h3 className="text-3xl font-extrabold text-slate-900 leading-tight">
              JWT Authenticated Access Protocol
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every request is verified against strict permissions ensuring hospital requisitions, blood storage telemetry, and donor records remain isolated and compliant.
            </p>
          </div>

          <div className="my-auto py-6">
            <DonorRegistration className="w-full h-auto max-w-xs mx-auto drop-shadow-md" />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium z-10">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted 256-bit Token Validation</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
