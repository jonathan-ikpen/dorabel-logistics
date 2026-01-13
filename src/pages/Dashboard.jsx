import React, { useEffect, useState } from "react";
import { fetchDashboardSummary } from "../api/mockApi";
import { useStore } from "../store/useStore";
import { useSeo } from "../utils/seo";

export default function Dashboard() {
  useSeo({
    title: "Dashboard",
    description: "Dashboard overview for Dorabel International (mock).",
  });
  const user = useStore((s) => s.user);
  const signIn = useStore((s) => s.signIn);
  const signOut = useStore((s) => s.signOut);

  const [summary, setSummary] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchDashboardSummary().then((s) => mounted && setSummary(s));
    return () => (mounted = false);
  }, []);

  function handleSignIn() {
    signIn({ name: "Operator", email: "ops@dorabel.co.uk" });
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {!user ? (
          <button
            onClick={handleSignIn}
            className="px-3 py-2 rounded-md bg-emerald-600 text-white"
          >
            Sign in (demo)
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <div className="text-sm">
              Signed in as <strong>{user.name}</strong>
            </div>
            <button
              onClick={signOut}
              className="px-3 py-2 rounded-md bg-slate-200 dark:bg-slate-800"
            >
              Sign out
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Properties"
          value={summary ? summary.properties : "—"}
        />
        <StatCard
          title="Active Jobs"
          value={summary ? summary.activeJobs : "—"}
        />
        <StatCard
          title="Inspections (M)"
          value={summary ? summary.inspectionsThisMonth : "—"}
        />
        <StatCard
          title="Pending Quotes"
          value={summary ? summary.pendingQuotes : "—"}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <div className="mt-3 glass rounded-xl p-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            This is a demo dashboard. Activity logs, job details and property
            lists would appear here.
          </p>
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="glass rounded-lg p-4">
      <div className="text-sm text-slate-500 dark:text-slate-300">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  );
}
