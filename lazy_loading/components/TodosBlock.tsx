import React from "react";

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

async function getTodos(): Promise<Todo[]> {
  // Simulate network delay of 3000 ms
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(
      "Erreur API: Impossible de charger la liste des tâches (todos).",
    );
  }

  return res.json();
}

export default async function TodosBlock() {
  const todos = await getTodos();

  const completedCount = todos.filter((t) => t.completed).length;
  const percentage = Math.round((completedCount / todos.length) * 100);

  return (
    <div className="flex flex-col h-full rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/50 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col border-b border-zinc-100 pb-4 mb-4 dark:border-zinc-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Tâches (Todos) ~3s
            </h3>
          </div>
          <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
            {completedCount}/{todos.length} ({percentage}%)
          </span>
        </div>

        {/* Simple Progress Bar */}
        <div className="mt-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-teal-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[350px] pr-1 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 rounded-xl border border-zinc-100/50 p-3 dark:border-zinc-900/60 transition-all duration-150 ${
                todo.completed
                  ? "bg-zinc-50/20 dark:bg-zinc-900/5 opacity-70"
                  : "bg-zinc-50/50 dark:bg-zinc-900/20 hover:bg-white dark:hover:bg-zinc-900/40"
              }`}
            >
              <div className="flex items-center justify-center shrink-0">
                {todo.completed ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-teal-500 text-white dark:bg-teal-600">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800" />
                )}
              </div>
              <p
                className={`text-sm font-medium flex-1 line-clamp-1 truncate ${
                  todo.completed
                    ? "text-zinc-400 dark:text-zinc-500 line-through"
                    : "text-zinc-800 dark:text-zinc-200"
                }`}
              >
                {todo.title}
              </p>
              <span
                className={`inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset ${
                  todo.completed
                    ? "bg-teal-50 text-teal-700 ring-teal-600/10 dark:bg-teal-500/10 dark:text-teal-400 dark:ring-teal-500/20"
                    : "bg-amber-50 text-amber-800 ring-amber-600/10 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20"
                }`}
              >
                {todo.completed ? "Fait" : "À faire"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
