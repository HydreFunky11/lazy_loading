import React from "react";

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface CommentsBlockProps {
  shouldFail?: boolean;
}

async function getComments(shouldFail: boolean): Promise<Comment[]> {
  // Simulate network delay of 1500 ms
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simuler une erreur volontaire si demandée
  if (shouldFail) {
    throw new Error(
      "Échec simulé : Le service de commentaires (CommentsBlock) a renvoyé une erreur de base de données 500.",
    );
  }

  const res = await fetch(
    "https://jsonplaceholder.typicode.com/comments?postId=1",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Erreur API: Impossible de charger les commentaires.");
  }

  return res.json();
}

export default async function CommentsBlock({
  shouldFail = true,
}: CommentsBlockProps) {
  const comments = await getComments(shouldFail);

  return (
    <div className="flex flex-col h-full rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/50 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-4 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Commentaires récents ~1.5s
          </h3>
        </div>
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20 animate-pulse">
          En ligne
        </span>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[350px] pr-1 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 dark:border-zinc-900 dark:bg-zinc-900/10 hover:border-zinc-200 hover:bg-white dark:hover:border-zinc-800/80 dark:hover:bg-zinc-900/30 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 truncate max-w-[180px]">
                  {comment.name}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium truncate max-w-[120px]">
                  {comment.email.toLowerCase()}
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                "{comment.body}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
