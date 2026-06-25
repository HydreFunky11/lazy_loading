import React from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  // Simulate network delay of 2000 ms
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erreur API: Impossible de charger la liste des articles.");
  }

  const posts: Post[] = await res.json();
  return posts.slice(0, 10);
}

export default async function PostsBlock() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col h-full rounded-2xl border border-zinc-200 bg-white/70 p-6 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/50 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-4 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400">
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
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Derniers Articles ~2s
          </h3>
        </div>
        <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 dark:bg-zinc-800/80 dark:text-zinc-400 px-2.5 py-1 rounded-full">
          {posts.length} articles
        </span>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[350px] pr-1 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col justify-between rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 hover:border-pink-500/20 hover:bg-white dark:border-zinc-900 dark:bg-zinc-900/10 dark:hover:border-pink-500/20 dark:hover:bg-zinc-900/30 transition-all duration-200 group"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-pink-500 dark:text-pink-400">
                    Projet {post.id}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-200">
                  {post.title}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {post.body}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/60">
                <span className="text-[10px] text-zinc-400">ID: {post.id}</span>
                <span className="text-[10px] font-semibold text-pink-500 group-hover:underline flex items-center gap-0.5 cursor-pointer">
                  Lire plus
                  <svg
                    className="h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
