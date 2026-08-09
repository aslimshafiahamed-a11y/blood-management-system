import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, KeyRound, ArrowRight, CheckCircle2, Droplet } from 'lucide-react';
import { authService } from '../services/authService';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Alert } from '../components/common/Alert';

export const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await authService.requestPasswordReset(email);
      if (res.success) {
        setResetCode(res.data?.demo_reset_code || '884920');
        setMessage(`Verification code dispatched to ${email}. (Demo Code: ${res.data?.demo_reset_code || '884920'})`);
        setStep(2);
      } else {
        setError(res.message || 'Email address not found');
      }
    } catch (err) {
      setError(err.message || 'Password reset request failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    setError(null);
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      const res = await authService.confirmPasswordReset({
        email,
        reset_code: resetCode,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      if (res.success) {
        setMessage('Password updated successfully! You can now sign in.');
        setStep(3);
      } else {
        setError(res.message || 'Password update failed');
      }
    } catch (err) {
      setError(err.message || 'Password update failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 z-10"
      >
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-600 flex items-center justify-center shadow-glow-teal">
            <Droplet className="w-5 h-5 text-white fill-white/20" />
          </div>
          <span className="font-extrabold text-xl text-slate-900 tracking-tight">
            Blood<span className="text-primary-500">Line</span>
          </span>
        </div>

        {error && (
          <Alert type="error" className="mb-6" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {message && (
          <Alert type="success" className="mb-6">
            {message}
          </Alert>
        )}

        {step === 1 && (
          <form onSubmit={handleRequestReset} className="space-y-4">
            <div className="space-y-1 mb-4">
              <h2 className="text-xl font-bold text-slate-900">Reset Password</h2>
              <p className="text-xs text-slate-500">Enter your registered email address to receive a security verification code.</p>
            </div>

            <Input
              label="Registered Email"
              type="email"
              icon={Mail}
              placeholder="user@bloodline.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full mt-2 shadow-md">
              <span>Send Verification Code</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleConfirmReset} className="space-y-4">
            <div className="space-y-1 mb-4">
              <h2 className="text-xl font-bold text-slate-900">Set New Password</h2>
              <p className="text-xs text-slate-500">Enter code sent to {email} and choose your new password.</p>
            </div>

            <Input
              label="Verification Code"
              icon={KeyRound}
              placeholder="884920"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
            />

            <Input
              label="New Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full mt-2 shadow-md">
              <span>Confirm Password Reset</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-4 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-slate-900">Password Reset Completed</h3>
            <p className="text-xs text-slate-500">Your account security credentials have been updated successfully.</p>
            <Link to="/login">
              <Button variant="primary" size="md" className="w-full shadow-md">
                Proceed to Sign In
              </Button>
            </Link>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <Link to="/login" className="text-xs font-bold text-slate-500 hover:text-slate-800">
            &larr; Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
