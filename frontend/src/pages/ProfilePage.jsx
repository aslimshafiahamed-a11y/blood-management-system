import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Building, ShieldCheck, Droplet, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Alert } from '../components/common/Alert';
import { Badge } from '../components/common/Badge';
import { authService } from '../services/authService';

export const ProfilePage = () => {
  const { user, role } = useAuth();
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone_number: user?.phone_number || '',
    blood_group: user?.blood_group || 'O+',
    organization_name: user?.organization_name || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      const res = await authService.updateProfile(formData);
      if (res.success) {
        setSuccessMsg('Profile details updated successfully.');
      } else {
        setErrorMsg(res.message || 'Failed to update profile.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Update failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">User Profile & Security Scope</h1>
          <p className="text-xs text-slate-500">Manage your profile information and review system authorization limits.</p>
        </div>
        <Badge variant={role === 'ADMIN' ? 'danger' : role === 'BLOOD_BANK_STAFF' ? 'blood' : 'secondary'} size="lg">
          {user?.role_display || role}
        </Badge>
      </div>

      {successMsg && <Alert type="success" onClose={() => setSuccessMsg(null)}>{successMsg}</Alert>}
      {errorMsg && <Alert type="error" onClose={() => setErrorMsg(null)}>{errorMsg}</Alert>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar */}
        <Card className="md:col-span-1 text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-600 mx-auto flex items-center justify-center font-black text-white text-3xl shadow-glow-teal">
            {user?.first_name ? user.first_name[0] : 'U'}
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">{user?.full_name}</h3>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-left">
            <div className="flex items-center justify-between text-slate-700">
              <span className="text-slate-500 font-medium">Security Verification:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="text-slate-500 font-medium">User ID (UUID):</span>
              <span className="font-mono text-[10px] text-slate-500 truncate max-w-[120px]">{user?.id}</span>
            </div>
          </div>
        </Card>

        {/* Right Column: Update Profile */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal & Professional Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  icon={User}
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                />
                <Input
                  label="Last Name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  icon={Phone}
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                />
                <Input
                  label="Hospital / Organization"
                  icon={Building}
                  value={formData.organization_name}
                  onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
                />
              </div>

              <Button type="submit" variant="primary" isLoading={isLoading} className="mt-4 shadow-md">
                Save Profile Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
