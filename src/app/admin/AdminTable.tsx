"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Users,
  Activity,
  UserCheck,
  Mail,
  Globe,
  Code2,
  CalendarDays,
  Clock,
  ArrowLeft,
  Shield,
  CreditCard,
} from "lucide-react";

export type AdminUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  provider: string;
  subscriptions: number;
};

function formatDate(iso: string | null): string {
  if (!iso) return "Never";
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function timeAgo(iso: string | null): string {
  if (!iso) return "Never";
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function isActiveInDays(iso: string | null, days: number): boolean {
  if (!iso) return false;
  return Date.now() - new Date(iso).getTime() < days * 86400000;
}

function ProviderBadge({ provider }: { provider: string }) {
  const p = provider.toLowerCase();
  if (p === "google")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100">
        <Globe className="w-3 h-3" /> Google
      </span>
    );
  if (p === "github")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full border border-gray-200">
        <Code2 className="w-3 h-3" /> GitHub
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
      <Mail className="w-3 h-3" /> Email
    </span>
  );
}

function StatusBadge({ lastSignIn }: { lastSignIn: string | null }) {
  if (isActiveInDays(lastSignIn, 7))
    return <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" />Active</span>;
  if (isActiveInDays(lastSignIn, 30))
    return <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full border border-yellow-200"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />Recent</span>;
  return <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />Inactive</span>;
}

function avatarColor(email: string): string {
  const colors = [
    "bg-blue-500", "bg-purple-500", "bg-green-500",
    "bg-pink-500", "bg-orange-500", "bg-teal-500",
  ];
  let hash = 0;
  for (const c of email) hash = (hash * 31 + c.charCodeAt(0)) % colors.length;
  return colors[Math.abs(hash) % colors.length];
}

export default function AdminTable({
  users,
  currentUserEmail,
}: {
  users: AdminUser[];
  currentUserEmail: string;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return q ? users.filter((u) => u.email.toLowerCase().includes(q)) : users;
  }, [users, search]);

  const active7d = users.filter((u) => isActiveInDays(u.last_sign_in_at, 7)).length;
  const newThisMonth = users.filter((u) => isActiveInDays(u.created_at, 30)).length;
  const totalSubs = users.reduce((s, u) => s + u.subscriptions, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">
              Renew<span className="text-blue-600">Mate</span>
            </span>
            <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full ml-1">
              ADMIN
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-gray-500">{currentUserEmail}</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> Back to site
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page title */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Monitor and track all registered users</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: users.length, icon: Users, color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
            { label: "Active (7 days)", value: active7d, icon: Activity, color: "bg-green-50 text-green-600", border: "border-green-100" },
            { label: "New (30 days)", value: newThisMonth, icon: UserCheck, color: "bg-purple-50 text-purple-600", border: "border-purple-100" },
            { label: "Total Subscriptions", value: totalSubs, icon: CreditCard, color: "bg-orange-50 text-orange-600", border: "border-orange-100" },
          ].map(({ label, value, icon: Icon, color, border }) => (
            <div key={label} className={`bg-white rounded-2xl border ${border} shadow-sm p-5`}>
              <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center mb-3`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Users table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">All Users</span>
              <span className="text-[11px] bg-gray-100 text-gray-500 font-semibold px-2 py-0.5 rounded-full">
                {filtered.length}
              </span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 w-full sm:w-64"
              />
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">User</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Provider</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Joined</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Last seen</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Subscriptions</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-sm text-gray-400">
                      No users match your search
                    </td>
                  </tr>
                ) : (
                  filtered.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${avatarColor(user.email)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                            {user.email[0].toUpperCase()}
                          </div>
                          <span className="text-gray-800 font-medium truncate max-w-[220px]">{user.email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5"><ProviderBadge provider={user.provider} /></td>
                      <td className="px-4 py-3.5">
                        <span className="text-gray-600 text-xs">{formatDate(user.created_at)}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-gray-600 text-xs">{timeAgo(user.last_sign_in_at)}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-semibold text-gray-800">{user.subscriptions}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge lastSignIn={user.last_sign_in_at} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-sm text-gray-400">No users match your search</div>
            ) : (
              filtered.map((user) => (
                <div key={user.id} className="p-4 flex gap-3">
                  <div className={`w-10 h-10 rounded-full ${avatarColor(user.email)} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {user.email[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <ProviderBadge provider={user.provider} />
                      <StatusBadge lastSignIn={user.last_sign_in_at} />
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" /> {formatDate(user.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {timeAgo(user.last_sign_in_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <CreditCard className="w-3 h-3" /> {user.subscriptions} sub{user.subscriptions !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50">
              <p className="text-xs text-gray-400">
                Showing {filtered.length} of {users.length} users
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
