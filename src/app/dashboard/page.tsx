"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        items.push({
          key: `${v.id}-${type}`,
          plate: v.vehicle_number,
          vehicle: vehicleName,
          type,
          days,
        });
      }
    }
  }
  return items;
}

function StatusBadge({ days }: { days: number }) {
  if (days < 0)
    return (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">
        Expired {Math.abs(days)}d ago
      </Badge>
    );
  if (days <= 1)
    return (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">
        {days === 0 ? "Expires today" : "Tomorrow"}
      </Badge>
    );
  if (days <= 15)
    return (
      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs">
        {days} days left
      </Badge>
    );
  return (
    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">{days} days</Badge>
  );
}

export default function DashboardPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [userName, setUserName] = useState("there");
  const [userPlan, setUserPlan] = useState("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const [{ data: authData }, { data: vehicleData }, { data: profileData }] =
        await Promise.all([
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
  const comingUp = allRenewals.filter((r) => r.days >= 0 && r.days <= 90).slice(0, 5);

  const expired = allRenewals.filter((r) => r.days < 0).length;
  const expiringSoon = allRenewals.filter((r) => r.days >= 0 && r.days <= 15).length;
  const allGood = allRenewals.filter((r) => r.days > 15).length;

  const FREE_LIMIT = 2;
  const vehicleUsed = vehicles.length;
  const vehiclePercent = Math.min(100, (vehicleUsed / FREE_LIMIT) * 100);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 capitalize">
            {greeting}, {userName} 👋
          </h1>
          {urgentAlerts.length > 0 ? (
            <p className="text-gray-500 text-sm mt-1">
              You have{" "}
              <span className="font-semibold text-red-600">
                {urgentAlerts.length} renewal{urgentAlerts.length !== 1 ? "s" : ""}
              </span>{" "}
              that need your attention.
            </p>
          ) : vehicles.length === 0 ? (
            <p className="text-gray-500 text-sm mt-1">
              Add your first vehicle to start tracking renewals.
            </p>
          ) : (
            <p className="text-gray-500 text-sm mt-1">
              All your renewals look good. Keep it up!
            </p>
          )}
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl" asChild>
          <Link href="/dashboard/vehicles">
            Add vehicle
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Vehicles",
            value: vehicles.length,
            icon: Car,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Expired",
            value: expired,
            icon: AlertTriangle,
            color: "text-red-500",
            bg: "bg-red-50",
          },
          {
            label: "Expiring Soon",
            value: expiringSoon,
            icon: Clock,
            color: "text-yellow-600",
            bg: "bg-yellow-50",
          },
          {
            label: "All Clear",
            value: allGood,
            icon: CheckCircle2,
            color: "text-green-600",
            bg: "bg-green-50",
          },
        ].map((stat) => (
          <Card key={stat.label} className="border-gray-100 shadow-sm">
            <CardContent className="p-5">
              <div
                className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}
              >
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No vehicles empty state */}
      {vehicles.length === 0 && (
        <Card className="border-dashed border-2 border-gray-200 shadow-none">
          <CardContent className="p-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Car className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No vehicles yet</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              Add your vehicles to start tracking tax, bluebook, insurance, and pollution test
              renewals.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2" asChild>
              <Link href="/dashboard/vehicles">
                <Plus className="w-4 h-4" />
                Add your first vehicle
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {vehicles.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Urgent renewals + vehicle list */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-red-500" />
                  Urgent Renewals
                  {urgentAlerts.length > 0 && (
                    <Badge className="bg-red-100 text-red-600 hover:bg-red-100 text-xs ml-1">
                      {urgentAlerts.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {urgentAlerts.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-400" />
                    All renewals are up to date!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {urgentAlerts.slice(0, 6).map((r) => (
                      <div
                        key={r.key}
                        className={`flex items-center justify-between p-4 rounded-xl border ${
                          r.days < 0 || r.days <= 3
                            ? "bg-red-50 border-red-200"
                            : "bg-yellow-50 border-yellow-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              r.days < 0 || r.days <= 3 ? "bg-red-500" : "bg-yellow-500"
                            }`}
                          />
                          <div>
                            <p className="font-mono text-sm font-semibold text-gray-900">
                              {r.plate}
                            </p>
                            <p className="text-xs text-gray-500">
                              {r.vehicle} · {r.type}
                            </p>
                          </div>
                        </div>
                        <StatusBadge days={r.days} />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Vehicle list */}
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="pb-3 flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900">
                  All Vehicles
                </CardTitle>
                <Link
                  href="/dashboard/vehicles"
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  Manage
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
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
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                            <Car className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-mono text-sm font-semibold text-gray-900">
                              {v.vehicle_number}
                            </p>
                            <p className="text-xs text-gray-500">
                              {[v.brand, v.model].filter(Boolean).join(" ") || v.vehicle_type}
                            </p>
                          </div>
                        </div>
                        {worstDays !== null ? (
                          <StatusBadge days={worstDays} />
                        ) : (
                          <Badge className="bg-gray-100 text-gray-400 hover:bg-gray-100 text-xs">
                            No dates
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side panel */}
          <div className="space-y-6">
            {/* Plan card */}
            {userPlan === "free" && (
              <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-900">Free Plan</span>
                  </div>
                  <p className="text-xs text-blue-700 mb-3">
                    {vehicleUsed} of {FREE_LIMIT} vehicles used
                  </p>
                  <Progress value={vehiclePercent} className="h-1.5 mb-4 bg-blue-200" />
                  <p className="text-xs text-gray-600 mb-4">
                    Upgrade to Premium for unlimited vehicles, Telegram notifications, and document
                    storage.
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 rounded-lg"
                    asChild
                  >
                    <Link href="/dashboard/billing">Upgrade to Premium — Rs. 99/mo</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Coming up */}
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-gray-900">
                  Coming up
                </CardTitle>
              </CardHeader>
              <CardContent>
                {comingUp.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">
                    No renewals in the next 90 days
                  </p>
                ) : (
                  <div className="space-y-4">
                    {comingUp.map((item) => {
                      const dotColor =
                        item.days <= 7
                          ? "bg-red-500"
                          : item.days <= 30
                          ? "bg-yellow-500"
                          : "bg-green-500";
                      return (
                        <div key={item.key} className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-700 truncate">
                              {item.type} ({item.plate})
                            </p>
                          </div>
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {item.days === 0
                              ? "Today"
                              : item.days === 1
                              ? "Tomorrow"
                              : `${item.days}d`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
