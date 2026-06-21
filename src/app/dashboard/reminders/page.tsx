"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Mail,
  MessageCircle,
  Smartphone,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Loader2,
  Car,
} from "lucide-react";
import Link from "next/link";

type Vehicle = {
  id: string;
  vehicle_number: string;
  brand: string | null;
  model: string | null;
  vehicle_type: string;
  tax_expiry: string | null;
  bluebook_expiry: string | null;
  insurance_expiry: string | null;
  pollution_expiry: string | null;
};

type ReminderItem = {
  key: string;
  plate: string;
  vehicle: string;
  type: string;
  days: number;
  expiry: string;
};

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-NP", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function buildReminders(vehicles: Vehicle[]): ReminderItem[] {
  const items: ReminderItem[] = [];
  for (const v of vehicles) {
    const name = [v.brand, v.model].filter(Boolean).join(" ") || v.vehicle_type;
    const pairs: [string, string | null][] = [
      ["Vehicle Tax", v.tax_expiry],
      ["Bluebook Renewal", v.bluebook_expiry],
      ["Insurance Expiry", v.insurance_expiry],
      ["Pollution Test", v.pollution_expiry],
    ];
    for (const [type, expiry] of pairs) {
      const days = daysUntil(expiry);
      if (days !== null) {
        items.push({
          key: `${v.id}-${type}`,
          plate: v.vehicle_number,
          vehicle: name,
          type,
          days,
          expiry: expiry!,
        });
      }
    }
  }
  return items.sort((a, b) => a.days - b.days);
}

function SeverityIcon({ days }: { days: number }) {
  if (days < 0 || days <= 3) return <AlertTriangle className="w-4 h-4 text-red-500" />;
  if (days <= 30) return <Clock className="w-4 h-4 text-yellow-500" />;
  return <CheckCircle2 className="w-4 h-4 text-green-500" />;
}

function DaysLabel({ days }: { days: number }) {
  if (days < 0)
    return (
      <span className="font-semibold text-red-600 text-sm">
        Expired {Math.abs(days)}d ago
      </span>
    );
  if (days === 0)
    return <span className="font-semibold text-red-600 text-sm">Expires today</span>;
  if (days === 1)
    return <span className="font-semibold text-red-600 text-sm">Expires tomorrow</span>;
  if (days <= 15)
    return <span className="font-semibold text-yellow-600 text-sm">{days} days left</span>;
  if (days <= 30)
    return <span className="font-semibold text-yellow-500 text-sm">{days} days left</span>;
  return <span className="font-semibold text-gray-500 text-sm">{days} days left</span>;
}

function ReminderRow({ r }: { r: ReminderItem }) {
  const isUrgent = r.days <= 3;
  const isWarning = r.days > 3 && r.days <= 30;
  const bgClass = isUrgent
    ? "bg-red-50 border-red-200"
    : isWarning
    ? "bg-yellow-50 border-yellow-200"
    : "bg-gray-50 border-gray-100";

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border ${bgClass}`}>
      <div className="flex items-center gap-3">
        <SeverityIcon days={r.days} />
        <div>
          <p className="text-sm font-semibold text-gray-900">{r.type}</p>
          <p className="text-xs text-gray-500">
            <span className="font-mono">{r.plate}</span> · {r.vehicle}
          </p>
        </div>
      </div>
      <div className="text-right">
        <DaysLabel days={r.days} />
        <p className="text-xs text-gray-400 mt-0.5">Due {formatDate(r.expiry)}</p>
      </div>
    </div>
  );
}

export default function RemindersPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("vehicles")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setVehicles(data);
      setLoading(false);
    }
    load();
  }, []);

  const allReminders = buildReminders(vehicles);
  const active = allReminders.filter((r) => r.days <= 30);
  const upcoming = allReminders.filter((r) => r.days > 30);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reminders</h1>
        <p className="text-gray-500 text-sm mt-1">
          {vehicles.length === 0
            ? "Add vehicles to see renewal reminders"
            : active.length === 0
            ? "All your renewals are on track"
            : `${active.length} renewal${active.length !== 1 ? "s" : ""} require your attention`}
        </p>
      </div>

      {/* No vehicles */}
      {vehicles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <Car className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No vehicles added yet</h3>
          <p className="text-sm text-gray-500 mb-6">
            Add a vehicle first and we&apos;ll track all its renewal dates here.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl" asChild>
            <Link href="/dashboard/vehicles">Add a vehicle</Link>
          </Button>
        </div>
      )}

      {vehicles.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Active alerts */}
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-red-500" />
                  Active Alerts
                  <Badge className="bg-red-100 text-red-600 hover:bg-red-100 text-xs ml-1">
                    {active.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {active.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-400" />
                    No urgent renewals right now — great work!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {active.map((r) => (
                      <ReminderRow key={r.key} r={r} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming */}
            {upcoming.length > 0 && (
              <Card className="border-gray-100 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-gray-900">
                    Upcoming (31–90 days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcoming.slice(0, 8).map((r) => (
                      <ReminderRow key={r.key} r={r} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Notification settings panel */}
          <div>
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-gray-900">
                  Notification channels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      description: "Renewal reminders via email",
                      enabled: true,
                      premium: false,
                    },
                    {
                      icon: Smartphone,
                      label: "Push notifications",
                      description: "Browser and mobile push alerts",
                      enabled: false,
                      premium: true,
                    },
                    {
                      icon: MessageCircle,
                      label: "Telegram",
                      description: "Get reminders directly in Telegram",
                      enabled: false,
                      premium: true,
                    },
                  ].map((ch) => (
                    <div
                      key={ch.label}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${
                        ch.enabled
                          ? "border-blue-200 bg-blue-50"
                          : "border-gray-100 bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          ch.enabled ? "bg-blue-100" : "bg-gray-200"
                        }`}
                      >
                        <ch.icon
                          className={`w-4 h-4 ${ch.enabled ? "text-blue-600" : "text-gray-400"}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-medium text-gray-900">{ch.label}</p>
                          {ch.premium && !ch.enabled && (
                            <Badge className="text-[9px] bg-yellow-100 text-yellow-700 hover:bg-yellow-100 px-1.5">
                              Premium
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">{ch.description}</p>
                      </div>
                      <div
                        className={`w-9 h-5 rounded-full flex items-center transition-colors ${
                          ch.enabled ? "bg-blue-600 justify-end" : "bg-gray-300 justify-start"
                        }`}
                      >
                        <div className="w-4 h-4 rounded-full bg-white shadow-sm mx-0.5" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-xs font-semibold text-blue-900 mb-1">
                    Unlock all channels
                  </p>
                  <p className="text-xs text-blue-600 mb-3">
                    Get Telegram and push notifications with a Premium plan.
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 rounded-lg"
                    asChild
                  >
                    <Link href="/dashboard/billing">Upgrade — Rs. 99/month</Link>
                  </Button>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-700 mb-3">Reminder schedule</p>
                  <div className="space-y-2">
                    {[
                      "30 days before",
                      "15 days before",
                      "7 days before",
                      "3 days before",
                      "1 day before",
                    ].map((d) => (
                      <div key={d} className="flex items-center justify-between text-xs text-gray-600">
                        <span>{d}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
