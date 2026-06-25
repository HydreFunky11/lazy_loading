import React, { Suspense } from "react";
import Link from "next/link";
import UsersBlock from "@/components/UsersBlock";
import PostsBlock from "@/components/PostsBlock";
import TodosBlock from "@/components/TodosBlock";
import CommentsBlock from "@/components/CommentsBlock";
import ErrorBoundary from "@/components/CustomErrorBoundary";
import {
  UsersSkeleton,
  PostsSkeleton,
  TodosSkeleton,
  CommentsSkeleton,
} from "@/components/Skeletons";

// Disable static instant prefetch validation since searchParams are accessed dynamically
export const unstable_instant = false;

interface DashboardPageProps {
  searchParams: Promise<{ recover?: string }>;
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans pb-12 transition-colors duration-300">
      {/* Premium Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/20">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-zinc-50 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
                  Next.js Streaming Dashboard
                </h1>
              </div>
            </div>

            {/* Quick action buttons & status */}
            <div className="flex items-center gap-3">
              <Suspense
                fallback={
                  <div className="h-9 w-44 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                }
              >
                {searchParams.then((params) => {
                  const isRecoverMode = params.recover === "true";
                  return (
                    <Link
                      href={
                        isRecoverMode ? "/dashboard" : "/dashboard?recover=true"
                      }
                      className={`inline-flex items-center justify-center rounded-xl px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95 ${
                        isRecoverMode
                          ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                          : "bg-red-600 text-white hover:bg-red-700 shadow-red-500/10 dark:bg-red-700 dark:hover:bg-red-600"
                      }`}
                    >
                      {isRecoverMode ? "Déclencher Erreur" : "Résoudre Erreur"}
                    </Link>
                  );
                })}
              </Suspense>
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Layout */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* 2x2 Grid with individual boundaries and skeletons */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Block 1: Users (1000 ms) */}
          <div className="min-h-[400px]">
            <Suspense fallback={<UsersSkeleton />}>
              <ErrorBoundary title="Erreur : Chargement des Utilisateurs">
                <UsersBlock />
              </ErrorBoundary>
            </Suspense>
          </div>

          {/* Block 2: Comments (1500 ms) - Simulates error */}
          <div className="min-h-[400px]">
            <Suspense fallback={<CommentsSkeleton />}>
              <ErrorBoundary title="Erreur : Commentaires récents">
                {searchParams.then((params) => (
                  <CommentsBlock shouldFail={params.recover !== "true"} />
                ))}
              </ErrorBoundary>
            </Suspense>
          </div>

          {/* Block 3: Posts (2000 ms) */}
          <div className="min-h-[400px]">
            <Suspense fallback={<PostsSkeleton />}>
              <ErrorBoundary title="Erreur : Chargement des Articles">
                <PostsBlock />
              </ErrorBoundary>
            </Suspense>
          </div>

          {/* Block 4: Todos (3000 ms) */}
          <div className="min-h-[400px]">
            <Suspense fallback={<TodosSkeleton />}>
              <ErrorBoundary title="Erreur : Chargement des Tâches">
                <TodosBlock />
              </ErrorBoundary>
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}
