export function Settings() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-slate-400">
          Manage your application settings and preferences.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-slate-900 rounded-xl border border-slate-800">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-lg font-semibold text-white">General</h2>
            <p className="text-sm text-slate-400">Basic application settings</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Application Name
              </label>
              <input
                type="text"
                defaultValue="{{PROJECT_NAME}}"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Timezone
              </label>
              <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>UTC</option>
                <option>America/New_York</option>
                <option>America/Los_Angeles</option>
                <option>Europe/London</option>
                <option>Asia/Tokyo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className="bg-slate-900 rounded-xl border border-slate-800">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-lg font-semibold text-white">Database</h2>
            <p className="text-sm text-slate-400">Database connection and settings</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Connection URL
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  defaultValue="postgres://postgres:postgres@localhost:5432/{{PROJECT_NAME}}"
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  readOnly
                />
                <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Configure in <code className="text-blue-400">.env</code> file
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors">
                Run Migrations
              </button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors">
                Open Drizzle Studio
              </button>
            </div>
          </div>
        </div>

        {/* Monitoring Settings */}
        <div className="bg-slate-900 rounded-xl border border-slate-800">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-lg font-semibold text-white">Monitoring</h2>
            <p className="text-sm text-slate-400">BetterStack integration settings</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                BetterStack Heartbeat URL
              </label>
              <input
                type="text"
                placeholder="https://uptime.betterstack.com/api/v1/heartbeat/xxxxx"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-2 text-xs text-slate-500">
                Configure in <code className="text-blue-400">.env</code> as BETTERSTACK_HEARTBEAT_URL
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-400">Health endpoint active at</span>
              <a href="/api/health" target="_blank" className="text-sm text-blue-400 hover:underline">
                /api/health
              </a>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-slate-900 rounded-xl border border-red-900/50">
          <div className="px-6 py-4 border-b border-red-900/50">
            <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
            <p className="text-sm text-slate-400">Irreversible actions</p>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white">Reset Database</h3>
                <p className="text-sm text-slate-400">
                  Drop all tables and re-run migrations
                </p>
              </div>
              <button className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 text-sm font-medium rounded-lg border border-red-600/20 transition-colors">
                Reset Database
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
