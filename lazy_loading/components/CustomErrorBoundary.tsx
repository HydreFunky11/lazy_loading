'use client';

import React, { useState } from 'react';
import { unstable_catchError as catchError, type ErrorInfo } from 'next/error';

interface ErrorBoundaryProps {
  title: string;
}

function ErrorFallback(
  props: ErrorBoundaryProps,
  { error, unstable_retry }: ErrorInfo
) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    // Simulate a brief local animation state before triggering unstable_retry
    setTimeout(() => {
      unstable_retry();
      setIsRetrying(false);
    }, 400);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-rose-100 bg-white p-6 dark:border-rose-950/40 dark:bg-zinc-950/40 shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Header border matches other blocks */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-5 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500 dark:bg-rose-500/20">
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{props.title}</h3>
        </div>
        <span className="inline-flex items-center rounded-full bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 ring-1 ring-inset ring-rose-600/10 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20">
          Indisponible
        </span>
      </div>

      {/* Main Friendly Illustration & Message */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-3 space-y-4">
        {/* Soft, friendly visual indicator instead of code blocks */}
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-500">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-rose-500 border-2 border-white dark:border-zinc-950 animate-ping" />
        </div>

        <div className="space-y-1.5 max-w-sm">
          <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Une connexion a échoué
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Nous n'avons pas pu charger les données pour cette section. Le service est peut-être temporairement hors ligne.
          </p>
        </div>

        {/* Collapsible Technical Details (For advanced users/developers) */}
        <details className="w-full group">
          <summary className="text-[11px] font-semibold text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 cursor-pointer list-none flex items-center justify-center gap-1 transition-colors select-none">
            <span>Détails techniques</span>
            <svg className="h-3 w-3 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="mt-2 text-[10px] font-mono text-left bg-zinc-50 border border-zinc-100 rounded-lg p-2.5 text-zinc-500 dark:bg-zinc-900/40 dark:border-zinc-800 max-h-24 overflow-y-auto break-all">
            {error.message || 'Error digest: ' + ((error as any).digest || 'non spécifié')}
          </div>
        </details>
      </div>

      {/* Action Footer */}
      <div className="border-t border-zinc-100 pt-4 mt-4 dark:border-zinc-800/80">
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all duration-200"
        >
          <svg className={`h-3.5 w-3.5 ${isRetrying ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18" />
          </svg>
          {isRetrying ? 'Reconnexion en cours...' : 'Tenter de recharger le bloc'}
        </button>
        {/* Helper Tip */}
        <p className="text-[10px] text-zinc-400 text-center mt-2">
          Astuce : Vous pouvez aussi cliquer sur "Résoudre l'erreur" dans l'en-tête.
        </p>
      </div>
    </div>
  );
}

export default catchError(ErrorFallback);
