import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary-50 border border-primary-200 flex items-center justify-center mx-auto text-primary-600 shadow-glow-teal">
          <Droplet className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900">404 - Page Not Found</h1>
          <p className="text-sm text-slate-500">The requested blood management route or resource does not exist.</p>
        </div>
        <Link to="/">
          <Button variant="primary" size="md" className="shadow-md">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Safety Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
