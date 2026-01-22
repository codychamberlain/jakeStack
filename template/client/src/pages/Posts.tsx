import { useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  createdAt: string;
}

// Placeholder data - replace with API calls
const placeholderPosts: Post[] = [];

export function Posts() {
  const [posts] = useState<Post[]>(placeholderPosts);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Posts</h1>
          <p className="mt-1 text-slate-400">
            Manage your content and publications.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          New Post
        </button>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    post.published
                      ? "bg-green-500/10 text-green-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
                <button className="text-slate-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
              <p className="text-slate-400 text-sm line-clamp-2">
                {post.content || "No content"}
              </p>
              <p className="text-xs text-slate-600 mt-4">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 rounded-xl border border-slate-800">
          <div className="px-6 py-12 text-center">
            <svg className="w-12 h-12 mx-auto text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-white">No posts yet</h3>
            <p className="mt-2 text-slate-400">
              Get started by creating your first post.
            </p>
            <div className="mt-6">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                New Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-4">Implementation Guide</h2>
        <div className="prose prose-invert prose-sm max-w-none">
          <p className="text-slate-400">
            To connect this page to your API, create a posts route in{" "}
            <code className="text-blue-400">server/routes/posts.ts</code>:
          </p>
          <pre className="bg-slate-800 rounded-lg p-4 mt-4 overflow-x-auto">
            <code className="text-sm text-slate-300">{`import { Elysia } from "elysia";
import { db, posts } from "../db";

export const postRoutes = new Elysia({ prefix: "/api/posts" })
  .get("/", async () => {
    return await db.select().from(posts);
  })
  .post("/", async ({ body }) => {
    return await db.insert(posts).values(body).returning();
  });`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
