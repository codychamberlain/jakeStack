import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

// Placeholder data - replace with API calls
const placeholderUsers: User[] = [];

export function Users() {
  const [users] = useState<User[]>(placeholderUsers);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="mt-1 text-slate-400">
            Manage your application users.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        {users.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{user.email}</td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-12 text-center">
            <svg className="w-12 h-12 mx-auto text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-white">No users yet</h3>
            <p className="mt-2 text-slate-400">
              Get started by adding your first user.
            </p>
            <div className="mt-6">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                Add User
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-4">Implementation Guide</h2>
        <div className="prose prose-invert prose-sm max-w-none">
          <p className="text-slate-400">
            To connect this page to your API, create a users route in{" "}
            <code className="text-blue-400">server/routes/users.ts</code>:
          </p>
          <pre className="bg-slate-800 rounded-lg p-4 mt-4 overflow-x-auto">
            <code className="text-sm text-slate-300">{`import { Elysia } from "elysia";
import { db, users } from "../db";

export const userRoutes = new Elysia({ prefix: "/api/users" })
  .get("/", async () => {
    return await db.select().from(users);
  })
  .post("/", async ({ body }) => {
    return await db.insert(users).values(body).returning();
  });`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
