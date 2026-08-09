import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Droplet,
  Building2,
  Users,
  Activity,
  AlertTriangle,
  HeartHandshake,
  CheckCircle2,
  Clock,
  Plus,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { CountUpNumber } from '../components/common/CountUpNumber';
import { SkeletonCard, SkeletonTable } from '../components/common/Skeleton';
import { PageTransition } from '../components/layout/PageTransition';

export const DashboardOverviewPage = () => {
  const { user, role } = useAuth();
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isLoadingSim, setIsLoadingSim] = useState(false);

  const triggerSimulatedReload = () => {
    setIsLoadingSim(true);
    setTimeout(() => setIsLoadingSim(false), 800);
  };

  const getRoleMetrics = () => {
    if (role === 'ADMIN') {
      return [
        { title: 'Total Registered Users', value: '1,420', change: '+12% this week', icon: Users, color: 'text-secondary-600', bg: 'bg-secondary-50' },
        { title: 'Connected Blood Banks', value: '18 Hubs', change: '100% Operational', icon: Building2, color: 'text-primary-600', bg: 'bg-primary-50' },
        { title: 'Active Emergency Orders', value: '7 Orders', change: '3 Critical (O-)', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'System Security Health', value: '99.9%', change: 'JWT Scope Verified', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      ];
    }

    if (role === 'BLOOD_BANK_STAFF') {
      return [
        { title: 'Total Units in Bank', value: '1,850 Pints', change: '42 Units O- Available', icon: Droplet, color: 'text-blood-600', bg: 'bg-blood-50' },
        { title: 'Hospital Requisitions', value: '12 Orders', change: '4 Pending Dispatch', icon: Building2, color: 'text-secondary-600', bg: 'bg-secondary-50' },
        { title: 'Scheduled Donations', value: '34 Today', change: '+8 Walk-ins', icon: HeartHandshake, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Storage Temp Control', value: '4.2°C', change: 'Optimal Range', icon: Activity, color: 'text-primary-600', bg: 'bg-primary-50' },
      ];
    }

    if (role === 'HOSPITAL_STAFF') {
      return [
        { title: 'Active Requisitions', value: '5 Orders', change: '2 Dispatched in Transit', icon: Droplet, color: 'text-blood-600', bg: 'bg-blood-50' },
        { title: 'Available Bank Units', value: '850 Units', change: 'O- Priority Reserve', icon: Building2, color: 'text-secondary-600', bg: 'bg-secondary-50' },
        { title: 'Completed Transfusions', value: '128 Units', change: '0 Adverse Events', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Average Delivery Time', value: '14 Mins', change: '-2 mins faster', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
      ];
    }

    // Default Donor Metrics
    return [
      { title: 'Total Blood Donated', value: '6 Pints', change: '18 Lives Saved', icon: HeartHandshake, color: 'text-primary-600', bg: 'bg-primary-50' },
      { title: 'My Blood Group', value: user?.blood_group || 'O-', change: 'Universal Donor', icon: Droplet, color: 'text-blood-600', bg: 'bg-blood-50' },
      { title: 'Next Eligible Date', value: 'Aug 24, 2026', change: 'Eligible in 15 Days', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { title: 'Donor Passport Status', value: 'Verified', change: 'Gold Tier Donor', icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];
  };

  const metrics = getRoleMetrics();

  const emergencyRequests = [
    { id: 'REQ-9901', hospital: 'St. Jude Emergency Ward', type: 'O-', units: 4, urgency: 'CRITICAL', status: 'In Transit' },
    { id: 'REQ-9884', hospital: 'Metropolitan Surgery Center', type: 'AB-', units: 2, urgency: 'HIGH', status: 'Processing' },
    { id: 'REQ-9872', hospital: 'City Pediatric ICU', type: 'A-', units: 3, urgency: 'NORMAL', status: 'Fulfilled' },
  ];

  return (
    <PageTransition className="space-y-6 font-sans">
      {/* Gradient Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="font-caption uppercase tracking-wider text-teal-300">Healthcare Command Center</span>
            <Badge variant="primary" size="sm">Operational Active</Badge>
          </div>
          <h1 className="font-h1 text-white tracking-tight">
            Welcome back, {user?.full_name || 'System Operator'}
          </h1>
          <p className="font-small text-slate-300 max-w-xl">
            Role: <span className="text-white font-semibold">{user?.role_display || role}</span> | Workspace: <span className="text-white font-semibold">{user?.organization_name || 'Central Health Authority'}</span>
          </p>
        </div>

        <div className="z-10 flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={triggerSimulatedReload} className="bg-white/10 hover:bg-white/20 text-white border-white/20">
            <RefreshCw className={`w-4 h-4 ${isLoadingSim ? 'animate-spin' : ''}`} />
            <span>Telemetry Refresh</span>
          </Button>
          <Button variant="primary" size="md" onClick={() => setIsQuickActionOpen(true)} className="shadow-lg">
            <Plus className="w-4 h-4" />
            <span>New Action Workflow</span>
          </Button>
        </div>
      </div>

      {/* Animated Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoadingSim ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          metrics.map((m, idx) => {
            const IconComponent = m.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-caption text-slate-500 uppercase tracking-wider">{m.title}</span>
                    <div className={`p-2.5 rounded-xl ${m.bg} border border-slate-100`}>
                      <IconComponent className={`w-5 h-5 ${m.color}`} />
                    </div>
                  </div>
                  <div className="font-h2 text-slate-900 mb-1">
                    <CountUpNumber value={m.value} />
                  </div>
                  <div className="font-caption text-slate-500 font-semibold flex items-center gap-1">
                    <span>{m.change}</span>
                  </div>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Emergency Requisitions & Inventory Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emergency Orders Table */}
        <div className="lg:col-span-2 space-y-4">
          {isLoadingSim ? (
            <SkeletonTable rows={4} />
          ) : (
            <Card hoverEffect={false}>
              <CardHeader>
                <CardTitle>
                  <AlertTriangle className="w-5 h-5 text-blood-600" />
                  <span>Active Blood Requisition Pipeline</span>
                </CardTitle>
                <Badge variant="blood" pulse>Live Dispatch</Badge>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-small">
                    <thead className="font-caption uppercase tracking-wider text-slate-600 bg-slate-50 border-y border-slate-200">
                      <tr>
                        <th className="p-3.5">Order ID</th>
                        <th className="p-3.5">Requesting Unit</th>
                        <th className="p-3.5">Type</th>
                        <th className="p-3.5">Quantity</th>
                        <th className="p-3.5">Urgency</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {emergencyRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-slate-900">{req.id}</td>
                          <td className="p-3.5 font-semibold text-slate-700">{req.hospital}</td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-0.5 rounded font-black bg-red-50 text-red-700 border border-red-200">
                              {req.type}
                            </span>
                          </td>
                          <td className="p-3.5 font-bold text-slate-900">{req.units} Units</td>
                          <td className="p-3.5">
                            <Badge variant={req.urgency === 'CRITICAL' ? 'danger' : req.urgency === 'HIGH' ? 'warning' : 'neutral'} size="sm">
                              {req.urgency}
                            </Badge>
                          </td>
                          <td className="p-3.5 font-bold text-emerald-600">{req.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Reserve Quick View */}
        <div className="space-y-4">
          <Card hoverEffect={false}>
            <CardHeader>
              <CardTitle>
                <Droplet className="w-5 h-5 text-primary-600" />
                <span>Central Reserve Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { type: 'O- Negative', count: 42, pct: 25, status: 'Critical' },
                { type: 'A+ Positive', count: 580, pct: 85, status: 'Healthy' },
                { type: 'B+ Positive', count: 310, pct: 60, status: 'Normal' },
                { type: 'AB- Negative', count: 18, pct: 12, status: 'Low' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between font-small">
                    <span className="font-bold text-slate-900">{item.type}</span>
                    <span className="font-semibold text-slate-500">{item.count} Units</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.pct < 30 ? 'bg-red-500' : item.pct < 50 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Demo Action Modal */}
      <Modal
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
        title="Healthcare Action Gateway"
      >
        <div className="space-y-4 font-small">
          <p className="text-slate-600 leading-relaxed">
            Select an action trigger below to test light theme modal popover dialogs and design system components.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setIsQuickActionOpen(false)}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary-500 text-left font-semibold text-slate-900 transition-colors shadow-subtle"
            >
              <span className="block font-bold text-primary-600 mb-1">Simulate Emergency Request</span>
              <span className="font-caption text-slate-500">Triggers automated dispatch algorithm</span>
            </button>
            <button
              onClick={() => setIsQuickActionOpen(false)}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-secondary-500 text-left font-semibold text-slate-900 transition-colors shadow-subtle"
            >
              <span className="block font-bold text-secondary-600 mb-1">Log Donor Screening</span>
              <span className="font-caption text-slate-500">Audits blood temperature & safety</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setIsQuickActionOpen(false)}>
              Close Dialog
            </Button>
          </div>
        </div>
      </Modal>
    </PageTransition>
  );
};
