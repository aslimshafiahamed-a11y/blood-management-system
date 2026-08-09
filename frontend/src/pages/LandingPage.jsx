import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Droplet,
  ShieldCheck,
  Building2,
  Activity,
  HeartHandshake,
  ArrowRight,
  Clock,
  CheckCircle2,
  Zap,
  PhoneCall,
  Users
} from 'lucide-react';
import { BloodDonationHero } from '../assets/Illustrations';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { PageTransition } from '../components/layout/PageTransition';

export const LandingPage = () => {
  const bloodGroups = [
    { type: 'O-', units: '142 Units', status: 'CRITICAL NEED', urgent: true },
    { type: 'A+', units: '580 Units', status: 'STABLE', urgent: false },
    { type: 'B+', units: '310 Units', status: 'MODERATE', urgent: false },
    { type: 'AB-', units: '45 Units', status: 'CRITICAL NEED', urgent: true },
    { type: 'O+', units: '890 Units', status: 'SURPLUS', urgent: false },
    { type: 'A-', units: '98 Units', status: 'LOW STOCK', urgent: true },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Sub-Minute Emergency Dispatch',
      desc: 'Automated hospital-to-blood-bank routing algorithm ensuring emergency blood units reach trauma centers within critical windows.',
    },
    {
      icon: ShieldCheck,
      title: 'ISO-Certified Cold Chain Audit',
      desc: 'Real-time temperature telemetry monitoring for blood storage units from donor arm to recipient transfusion.',
    },
    {
      icon: Building2,
      title: 'Enterprise Multi-Tenant Hub',
      desc: 'Seamless role-based permissions connecting Central Health Ministries, Regional Blood Banks, Hospitals, and Donors.',
    },
    {
      icon: Activity,
      title: 'Predictive Inventory Analytics',
      desc: 'AI-driven demand forecasting preventing expiration waste and anticipating rare blood type shortages.',
    },
  ];

  return (
    <PageTransition className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      {/* Navigation Top Bar */}
      <header className="h-20 border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-subtle">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-600 flex items-center justify-center shadow-glow-teal">
              <Droplet className="w-6 h-6 text-white fill-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl text-slate-900 tracking-tight leading-none">
                Blood<span className="text-primary-500">Line</span>
              </span>
              <span className="font-caption uppercase tracking-wider text-slate-400">Healthcare SaaS</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-small text-slate-600">
            <a href="#inventory" className="hover:text-primary-600 transition-colors">Live Stock Ticker</a>
            <a href="#features" className="hover:text-primary-600 transition-colors">System Capabilities</a>
            <a href="#emergency" className="hover:text-primary-600 transition-colors">Emergency Protocol</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">Register Account</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 hero-gradient border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 font-caption shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping" />
              <span>Sprint 1 Enterprise SaaS Active</span>
            </div>

            <h1 className="font-h1 text-slate-900 leading-tight">
              Mission-Critical <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-blood-600 bg-clip-text text-transparent">
                Blood Supply Network
              </span>
            </h1>

            <p className="font-body text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Connecting hospitals, blood banks, emergency responders, and voluntary donors through an ultra-secure, role-governed healthcare platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                  <span>Enter System Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <span>Become a Donor</span>
                </Button>
              </Link>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div>
                <span className="block font-h2 text-slate-900">100k+</span>
                <span className="font-small text-slate-500">Units Tracked</span>
              </div>
              <div>
                <span className="block font-h2 text-primary-600">99.9%</span>
                <span className="font-small text-slate-500">Cold Chain Uptime</span>
              </div>
              <div>
                <span className="block font-h2 text-emerald-600">&lt; 15 min</span>
                <span className="font-small text-slate-500">Emergency Dispatch</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="w-full max-w-lg bg-white p-6 rounded-3xl border border-slate-200 shadow-xl relative">
              <BloodDonationHero className="w-full h-auto" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Inventory Ticker */}
      <section id="inventory" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-caption uppercase tracking-wider text-primary-600">Real-Time Telemetry</span>
              <h2 className="font-h2 text-slate-900">Central Regional Blood Reserve Status</h2>
            </div>
            <Badge variant="blood" pulse>Live Reserve Stream</Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {bloodGroups.map((item) => (
              <div
                key={item.type}
                className={`p-4 rounded-2xl border transition-all duration-200 ${
                  item.urgent
                    ? 'bg-red-50/60 border-red-200 shadow-sm'
                    : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-h2 text-slate-900">{item.type}</span>
                  <Droplet className={`w-5 h-5 ${item.urgent ? 'text-blood-600 fill-blood-600/20' : 'text-slate-400'}`} />
                </div>
                <span className="block font-small text-slate-700">{item.units}</span>
                <span className={`font-caption uppercase block mt-1 ${item.urgent ? 'text-blood-600 animate-pulse' : 'text-slate-500'}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise System Capabilities Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-caption uppercase tracking-wider text-secondary-600">Enterprise Stack</span>
            <h2 className="font-h2 text-slate-900">Engineered for Healthcare Reliability</h2>
            <p className="font-body text-slate-500">Built with Clean Architecture, JWT Role Isolation, and Django REST Framework backends.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="card-saas p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-h3 text-slate-900">{f.title}</h3>
                  <p className="font-small text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Callout Banner */}
      <section id="emergency" className="py-16 px-4 sm:px-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 text-white shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <Badge variant="danger" pulse>Emergency Response Unit</Badge>
            <h3 className="font-h2 text-white">Require Immediate Trauma Requisition?</h3>
            <p className="font-body text-slate-300 max-w-xl">Hospitals and certified trauma centers can bypass standard queues using prioritized dispatch keys.</p>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="blood" size="lg" className="shadow-lg">
                <PhoneCall className="w-5 h-5" />
                <span>Trigger Emergency Order</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-4 sm:px-6 border-t border-slate-200 bg-white font-caption text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Droplet className="w-4 h-4 text-primary-500" />
            <span className="font-bold text-slate-800">BloodLine System &copy; 2026</span>
          </div>
          <div className="flex gap-6 text-slate-600 font-medium">
            <Link to="/login" className="hover:text-primary-600">Admin Portal</Link>
            <Link to="/login" className="hover:text-primary-600">Blood Bank Staff</Link>
            <Link to="/login" className="hover:text-primary-600">Hospital Staff</Link>
            <Link to="/register" className="hover:text-primary-600">Donor Registration</Link>
          </div>
        </div>
      </footer>
    </PageTransition>
  );
};
