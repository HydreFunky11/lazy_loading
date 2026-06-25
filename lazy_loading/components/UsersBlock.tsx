import React from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

async function getUsers(): Promise<User[]> {
  // Simulate network delay of 1000 ms
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      "Erreur API: Impossible de charger la liste des utilisateurs.",
    );
  }

  return res.json();
}

export default async function UsersBlock() {
  const users = await getUsers();

  return (
    <div className="flex flex-col h-full rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/50 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-4 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
            <svg
              className="h-4.5 w-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Utilisateurs ~1.0s
          </h3>
        </div>
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
          En ligne
        </span>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[350px] pr-1 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
        <div className="space-y-3.5">
          {users.map((user) => {
            const initials = user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={user.id}
                className="group flex items-center gap-3.5 rounded-xl border border-transparent bg-zinc-50/50 p-3 hover:border-zinc-200/50 hover:bg-white dark:bg-zinc-900/20 dark:hover:border-zinc-800/80 dark:hover:bg-zinc-900/40 transition-all duration-200"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-sm font-semibold text-white shadow-sm">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {user.name}
                    </p>
                    <span className="text-[10px] text-zinc-400 group-hover:text-zinc-500 dark:text-zinc-500">
                      @{user.username.toLowerCase()}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1 truncate">
                      <svg
                        className="h-3 w-3 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {user.email}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 truncate border-l border-zinc-200 pl-3 dark:border-zinc-800">
                      <svg
                        className="h-3 w-3 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      {user.company.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
