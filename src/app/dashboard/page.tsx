"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Car,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Bell,
  Loader2,
  Plus,
  Zap,
  Calendar,
} from "lucide-react";

type Vehicle = {
  id: string;
  vehicle_number: string;
  vehicle_type: string;
  brand: string | null;
  model: string | null;
  tax_expiry: string | null;
  bluebook_expiry: string | null;
  insurance_expiry: string | null;
  pollution_expiry: string | null;
};

type RenewalItem = {
  key: string;
  plate: string;
  vehicle: string;
  type: string;
  days: number;
};

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function buildRenewals(vehicles: Vehicle[]): RenewalItem[] {
  const items: RenewalItem[] = [];
  for (const v of vehicles) {
    const vehicleName = [v.brand, v.model].filter(Boolean).join(" ") || v.vehicle_type;
    const pairs: [string, string | null][] = [
      ["Vehicle Tax", v.tax_expiry],
      ["Bluebook", v.bluebook_expiry],
      ["Insurance", v.insurance_expiry],
      ["Pollution Test", v.pollution_expiry],
    ];
    for (const [type, expiry] of pairs) {
      const days = daysUntil(expiry);
      if (days !== null) {
        items.push({ key: `${v.id}-${type}`, plate: v.vehicle_number, vehicle: vehicleName, type, days });
      }
    }
  }
  return items;
}

function StatusBadge({ days }: { days: number }) {
  if (days < 0)
    return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs border-0">Expired {Math.abs(days)}d ago</Badge>;
  if (days === 0)
    return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs border-0">Expires today</Badge>;
  if (days === 1)
    return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs border-0">Tomorrow</Badge>;
  if (days <= 7)
    return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs border-0">{days} days left</Badge>;
  if (days <= 15)
    return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs border-0">{days} days left</Badge>;
  if (days <= 30)
    return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-xs border-0">{days} days left</Badge>;
  return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs border-0">{days} days</Badge>;
}

export default function DashboardPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [userName, setUserName] = useState("there");
  const [userPlan, setUserPlan] = useState("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const [{ data: authData }, { data: vehicleData }, { data: profileData }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from("vehicles").select("*").order("created_at", { ascending: false }),
        supabase.from("profiles").select("name, plan").single(),
      ]);

      if (authData?.user) {
        const name =
          profileData?.name ||
          authData.user.user_metadata?.full_name ||
          authData.user.email ||
          "there";
        setUserName(name.split(" ")[0]);
      }
      if (profileData?.plan) setUserPlan(profileData.plan);
      if (vehicleData) setVehicles(vehicleData);
      setLoading(false);
    }
    load();
  }, []);

  const allRenewals = buildRenewals(vehicles).sort((a, b) => a.days - b.days);
  const urgentAlerts = allRenewals.filter((r) => r.days <= 30);
  const comingUp = allRenewals.filter((r) => r.days >= 0 && r.days <= 90).slice(0, 6);

  const expired = allRenewals.filter((r) => r.days < 0).length;
  const expiringSoon = allRenewals.filter((r) => r.days >= 0 && r.days <= 15).length;
  const allGood = allRenewals.filter((r) => r.days > 15).length;

  const FREE_LIMIT = 2;
  const vehiclePercent = Math.min(100, (vehicles.length / FREE_LIMIT) * 100);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 capitalize">
            {greeting}, {userName} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {urgentAlerts.length > 0 ? (
              <>
                You have{" "}
                <span className="font-semibold text-red-600">
                  {urgentAlerts.length} renewal{urgentAlerts.length !== 1 ? "s" : ""}
                </span>{" "}
                needing attention
              </>
            ) : vehicles.length === 0 ? (
              "Add your first vehicle to start tracking"
            ) : (
              "All renewals look good — keep it up!"
            )}
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2 shadow-md shadow-blue-200 self-start sm:self-auto"
          asChild
        >
          <Link href="/dashboard/vehicles">
            <Plus className="w-4 h-4" />
            Add vehicle
          </Link>
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Vehicles", value: vehicles.length, icon: Car, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
          { label: "Expired", value: expired, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50", border: "border-red-100" },
          { label: "Expiring Soon", value: expiringSoon, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-100" },
          { label: "All Clear", value: allGood, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-white rounded-2xl border ${stat.border} p-4 sm:p-5 hover:shadow-md transition-shadow`}
          >
            <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-0.5">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {vehicles.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-10 sm:p-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <Car className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No vehicles yet</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            Add your vehicles to start tracking tax, bluebook, insurance, and pollution test renewals.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2 shadow-md shadow-blue-200" asChild>
            <Link href="/dashboard/vehicles">
              <Plus className="w-4 h-4" />
              Add your first vehicle
            </Link>
          </Button>
        </div>
      )}

      {vehicles.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Left: Urgent + Vehicle list */}
          <div className="lg:col-span-2 space-y-5">
            {/* Urgent renewals */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                    <Bell className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">Urgent Renewals</span>
                  {urgentAlerts.length > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {urgentAlerts.length}
                    </span>
                  )}
                </div>
                <Link href="/dashboard/reminders" className="text-xs text-blue-600 hover:underline font-medium">
                  View all
                </Link>
              </div>
              <div className="p-4">
                {urgentAlerts.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-green-400" />
                    <p className="text-sm font-medium text-gray-700">All renewals are up to date!</p>
                    <p className="text-xs text-gray-400 mt-1">You have nothing expiring in the next 30 days</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {urgentAlerts.slice(0, 6).map((r) => (
                      <div
                        key={r.key}
                        className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-colors ${
                          r.days < 0 || r.days <= 3
                            ? "bg-red-50 border-red-100"
                            : r.days <= 7
                            ? "bg-orange-50 border-orange-100"
                            : "bg-yellow-50 border-yellow-100"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              r.days < 0 || r.days <= 3 ? "bg-red-500" : r.days <= 7 ? "bg-orange-500" : "bg-yellow-500"
                            }`}
                          />
                          <div className="min-w-0">
                            <p className="font-mono text-sm font-bold text-gray-900 leading-none">{r.plate}</p>
                            <p className="text-xs text-gray-500 mt-0.5 truncate">
                              {r.vehicle} · {r.type}
                            </p>
                          </div>
                        </div>
                        <StatusBadge days={r.days} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle list */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Car className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">All Vehicles</span>
                </div>
                <Link href="/dashboard/vehicles" className="text-xs text-blue-600 hover:underline font-medium">
                  Manage
                </Link>
              </div>
              <div className="divide-y divide-gray-50">
                {vehicles.map((v) => {
                  const days = [
                    daysUntil(v.tax_expiry),
                    daysUntil(v.bluebook_expiry),
                    daysUntil(v.insurance_expiry),
                    daysUntil(v.pollution_expiry),
                  ].filter((d): d is number => d !== null);
                  const worstDays = days.length ? Math.min(...days) : null;
                  return (
                    <div
                      key={v.id}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <Car className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-mono text-sm font-bold text-gray-900 leading-none">
                            {v.vehicle_number}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {[v.brand, v.model].filter(Boolean).join(" ") || v.vehicle_type}
                          </p>
                        </div>
                      </div>
                      {worstDays !== null ? (
                        <StatusBadge days={worstDays} />
                      ) : (
                        <Badge className="bg-gray-100 text-gray-400 hover:bg-gray-100 text-xs border-0">No dates</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Sidebar panels */}
          <div className="space-y-5">
            {/* Upgrade banner for free users */}
            {userPlan === "free" && (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-blue-200" />
                  <span className="text-sm font-bold">Free Plan</span>
                </div>
                <p className="text-blue-200 text-xs mb-1">{vehicles.length} of {FREE_LIMIT} vehicles</p>
                <Progress value={vehiclePercent} className="h-1.5 mb-4 bg-blue-500/40" />
                <p className="text-xs text-blue-200 leading-relaxed mb-4">
                  Upgrade for unlimited vehicles, Telegram alerts, and cloud document storage.
                </p>
                <Link
                  href="/dashboard/billing"
                  className="block w-full text-center bg-white text-blue-700 text-xs font-bold py-2 px-3 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Upgrade — Rs. 99/month
                </Link>
              </div>
            )}

            {/* Coming up */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
                <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-green-600" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Coming Up</span>
              </div>
              <div className="p-4">
                {comingUp.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">No renewals in the next 90 days</p>
                ) : (
                  <div className="space-y-3">
                    {comingUp.map((item) => {
                      const dotColor =
                        item.days <= 7 ? "bg-red-500" : item.days <= 30 ? "bg-yellow-500" : "bg-green-500";
                      return (
                        <div key={item.key} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-700 truncate font-medium">{item.type}</p>
                            <p className="text-[10px] text-gray-400 font-mono">{item.plate}</p>
                          </div>
                          <span className="text-xs text-gray-400 whitespace-nowrap font-semibold">
                            {item.days === 0 ? "Today" : item.days === 1 ? "Tomorrow" : `${item.days}d`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-sm font-semibold text-gray-900 mb-3">Quick actions</p>
              <div className="space-y-2">
                <Link
                  href="/dashboard/vehicles"
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                >
                  <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">Add new vehicle</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600" />
                </Link>
                <Link
                  href="/dashboard/reminders"
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                >
                  <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">View all reminders</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600" />
                </Link>
                <Link
                  href="/dashboard/billing"
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                >
                  <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">
                    <Zap className="w-3 h-3 inline mr-1 text-yellow-500" />
                    Upgrade to Premium
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
