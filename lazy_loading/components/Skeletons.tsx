import React from 'react';

// Container card helper for skeletons
function SkeletonCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full rounded-2xl border border-zinc-200 bg-white/50 p-6 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/40 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-4 dark:border-zinc-800/80">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
        <div className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700 animate-pulse" />
      </div>
      <div className="flex-1 animate-pulse space-y-4">
        {children}
      </div>
    </div>
  );
}

export function UsersSkeleton() {
  return (
    <SkeletonCard title="Utilisateurs">
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonCard>
  );
}

export function PostsSkeleton() {
  return (
    <SkeletonCard title="Derniers Articles">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-900 dark:bg-zinc-900/20 space-y-3">
            <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="h-3.5 w-1/4 rounded bg-zinc-200 dark:bg-zinc-800 mt-2" />
          </div>
        ))}
      </div>
    </SkeletonCard>
  );
}

export function TodosSkeleton() {
  return (
    <SkeletonCard title="Tâches (Todos)">
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg p-2">
            <div className="h-5 w-5 rounded bg-zinc-200 dark:bg-zinc-800 shrink-0" />
            <div className="h-3.5 flex-1 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800 shrink-0" />
          </div>
        ))}
      </div>
    </SkeletonCard>
  );
}

export function CommentsSkeleton() {
  return (
    <SkeletonCard title="Commentaires récents">
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl bg-zinc-50/50 p-4 dark:bg-zinc-900/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonCard>
  );
}
