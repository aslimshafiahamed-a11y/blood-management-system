import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Phone, Building, Droplet, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Alert } from '../components/common/Alert';
import { Badge } from '../components/common/Badge';

export const RegisterPage = () => {
  const { register, isLoading, error: authError } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('DONOR');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    blood_group: 'O+',
    organization_name: '',
  });
  const [localError, setLocalError] = useState(null);

  const bloodGroupOptions = [
    { value: 'A+', label: 'A Positive (A+)' },
    { value: 'A-', label: 'A Negative (A-)' },
    { value: 'B+', label: 'B Positive (B+)' },
    { value: 'B-', label: 'B Negative (B-)' },
    { value: 'AB+', label: 'AB Positive (AB+)' },
    { value: 'AB-', label: 'AB Negative (AB-)' },
    { value: 'O+', label: 'O Positive (O+)' },
    { value: 'O-', label: 'O Negative (O-)' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (formData.password !== formData.confirm_password) {
      setLocalError('Passwords do not match.');
      return;
    }

    const payload = {
      ...formData,
      role,
    };

    const res = await register(payload);
    if (res.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-600 flex items-center justify-center shadow-glow-teal">
              <Droplet className="w-5 h-5 text-white fill-white/20" />
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">
              Blood<span className="text-primary-500">Line</span>
            </span>
          </Link>
          <Badge variant="primary">New User Account</Badge>
        </div>

        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
          <p className="text-xs text-slate-500">Select your role to configure appropriate access scopes.</p>
        </div>

        {/* Role Picker Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setRole('DONOR')}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
              role === 'DONOR'
                ? 'bg-primary-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Voluntary Donor
          </button>
          <button
            type="button"
            onClick={() => setRole('HOSPITAL_STAFF')}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
              role === 'HOSPITAL_STAFF'
                ? 'bg-secondary-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hospital Staff
          </button>
          <button
            type="button"
            onClick={() => setRole('BLOOD_BANK_STAFF')}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
              role === 'BLOOD_BANK_STAFF'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Blood Bank Staff
          </button>
        </div>

        {(localError || authError) && (
          <Alert type="error" className="mb-6" onClose={() => setLocalError(null)}>
            {localError || authError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="first_name"
              icon={User}
              placeholder="Alex"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <Input
              label="Last Name"
              name="last_name"
              placeholder="Morgan"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              name="email"
              icon={Mail}
              placeholder="alex@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone Number"
              name="phone_number"
              icon={Phone}
              placeholder="+1-800-555-0199"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          {role === 'DONOR' ? (
            <Select
              label="Blood Group"
              name="blood_group"
              icon={Droplet}
              options={bloodGroupOptions}
              value={formData.blood_group}
              onChange={handleChange}
              required
            />
          ) : (
            <Input
              label="Hospital / Organization Name"
              name="organization_name"
              icon={Building}
              placeholder={role === 'HOSPITAL_STAFF' ? "St. Jude General Hospital" : "Metropolitan Blood Storage Center"}
              value={formData.organization_name}
              onChange={handleChange}
              required
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Password"
              type="password"
              name="password"
              icon={Lock}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirm_password"
              icon={Lock}
              placeholder="••••••••"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full mt-4 shadow-md">
            <span>Complete Account Registration</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500 font-medium">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-primary-600 hover:text-primary-700">
            Sign In instead
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
