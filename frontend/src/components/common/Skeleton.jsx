import React from 'react';

export const SkeletonCard = () => (
  <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-subtle space-y-4">
    <div className="flex items-center justify-between">
      <div className="h-4 w-28 skeleton-shimmer rounded-lg" />
      <div className="h-9 w-9 skeleton-shimmer rounded-xl" />
    </div>
    <div className="h-8 w-20 skeleton-shimmer rounded-lg" />
    <div className="h-3 w-36 skeleton-shimmer rounded-md" />
  </div>
);

export const SkeletonTable = ({ rows = 4 }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-subtle space-y-4">
    <div className="h-6 w-48 skeleton-shimmer rounded-lg mb-4" />
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-2 border-b border-slate-100">
          <div className="h-4 w-20 skeleton-shimmer rounded-md" />
          <div className="h-4 w-36 skeleton-shimmer rounded-md flex-1" />
          <div className="h-4 w-16 skeleton-shimmer rounded-md" />
          <div className="h-6 w-20 skeleton-shimmer rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonForm = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-6">
    <div className="h-6 w-40 skeleton-shimmer rounded-lg" />
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="h-3 w-24 skeleton-shimmer rounded-md" />
        <div className="h-10 w-full skeleton-shimmer rounded-xl" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-28 skeleton-shimmer rounded-md" />
        <div className="h-10 w-full skeleton-shimmer rounded-xl" />
      </div>
    </div>
    <div className="h-10 w-full skeleton-shimmer rounded-xl" />
  </div>
);
