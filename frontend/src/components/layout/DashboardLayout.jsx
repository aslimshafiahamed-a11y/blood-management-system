import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0 pl-20 sm:pl-64 transition-all duration-300">
        <Header />

        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>

        <footer className="py-4 px-6 border-t border-slate-200/80 bg-white text-center text-xs text-slate-500">
          BloodLine Healthcare SaaS Architecture &copy; 2026. All rights reserved.
        </footer>
      </div>
    </div>
  );
};
