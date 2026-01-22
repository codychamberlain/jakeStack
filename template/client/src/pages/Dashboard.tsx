import { useEffect, useState } from "react";

interface HealthStatus {
  status: string;
  timestamp: string;
  checks: {
    database: string;
  };
}

interface ApiInfo {
  message: string;
  version: string;
}

interface StatCard {
  name: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
}

const stats: StatCard[] = [
  {
    name: "Total Users",
    value: "0",
    change: "Get started",
    changeType: "neutral",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    name: "Total Posts",
    value: "0",
    change: "Get started",
    changeType: "neutral",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    name: "API Version",
    value: "1.0.0",
    change: "Stable",
    changeType: "positive",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    name: "Database",
    value: "PostgreSQL",
    change: "Connected",
    changeType: "positive",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
];

export function Dashboard() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [healthRes, apiRes] = await Promise.all([
          fetch("/api/health"),
          fetch("/api"),
        ]);

        if (healthRes.ok) {
          setHealth(await healthRes.json());
        }
        if (apiRes.ok) {
          setApiInfo(await apiRes.json());
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-slate-400">
          Welcome to your {{PROJECT_NAME}} application.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-slate-900 rounded-xl p-6 border border-slate-800"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                {stat.icon}
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.changeType === "positive"
                    ? "bg-green-500/10 text-green-400"
                    : stat.changeType === "negative"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-slate-500/10 text-slate-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Status */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-lg font-semibold text-white mb-4">API Status</h2>
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              <div className="h-4 bg-slate-800 rounded w-1/2"></div>
            </div>
          ) : apiInfo ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-green-400">Online</span>
              </div>
              <p className="text-slate-400">{apiInfo.message}</p>
              <p className="text-sm text-slate-500">Version: {apiInfo.version}</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-red-400">Failed to connect to API</span>
            </div>
          )}
        </div>

        {/* Health Check */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-lg font-semibold text-white mb-4">Health Check</h2>
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              <div className="h-4 bg-slate-800 rounded w-1/2"></div>
            </div>
          ) : health ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    health.status === "healthy" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></span>
                <span
                  className={
                    health.status === "healthy"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {health.status.charAt(0).toUpperCase() + health.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Database</span>
                <span
                  className={
                    health.checks.database === "connected"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {health.checks.database}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Last checked: {new Date(health.timestamp).toLocaleString()}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-red-400">Health check failed</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <h3 className="font-medium text-white mb-2">1. Edit Schema</h3>
            <p className="text-sm text-slate-400">
              Define your database tables in{" "}
              <code className="text-blue-400">server/db/schema.ts</code>
            </p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <h3 className="font-medium text-white mb-2">2. Add Routes</h3>
            <p className="text-sm text-slate-400">
              Create API endpoints in{" "}
              <code className="text-blue-400">server/routes/</code>
            </p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <h3 className="font-medium text-white mb-2">3. Build UI</h3>
            <p className="text-sm text-slate-400">
              Add React components in{" "}
              <code className="text-blue-400">client/src/</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
