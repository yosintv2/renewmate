"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
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
  Tv,
  ArrowRight,
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

type Subscription = {
  id: string;
  name: string;
  category: string;
  price: number;
  billing_cycle: string;
  next_billing_date: string;
};

type ReminderItem = {
  key: string;
  label: string;
  sublabel: string;
  type: string;
  days: number;
  expiry: string;
  kind: "vehicle" | "subscription";
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

function buildVehicleReminders(vehicles: Vehicle[]): ReminderItem[] {
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
          label: type,
          sublabel: `${v.vehicle_number} · ${name}`,
          type,
          days,
          expiry: expiry!,
          kind: "vehicle",
        });
      }
    }
  }
  return items;
}

function buildSubReminders(subs: Subscription[]): ReminderItem[] {
  return subs.map((s) => ({
    key: `sub-${s.id}`,
    label: s.name,
    sublabel: `Rs. ${s.price.toLocaleString()}/${s.billing_cycle === "monthly" ? "mo" : "yr"} · ${s.category}`,
    type: s.category,
    days: daysUntil(s.next_billing_date) ?? 0,
    expiry: s.next_billing_date,
    kind: "subscription" as const,
  }));
}

function ReminderRow({ r }: { r: ReminderItem }) {
  const isExpired = r.days < 0;
  const isCritical = r.days >= 0 && r.days <= 3;
  const isWarning = r.days > 3 && r.days <= 15;
  const isUpcoming = r.days > 15 && r.days <= 30;

  const bg =
    isExpired || isCritical
      ? "bg-red-50 border-red-100"
      : isWarning
      ? "bg-yellow-50 border-yellow-100"
      : isUpcoming
      ? "bg-orange-50 border-orange-100"
      : "bg-gray-50 border-gray-100";

  const icon =
    isExpired || isCritical ? (
      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
    ) : isWarning || isUpcoming ? (
      <Clock className="w-4 h-4 text-yellow-500 flex-shrink-0" />
    ) : (
      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
    );

  const daysLabel = isExpired
    ? `Expired ${Math.abs(r.days)}d ago`
    : r.days === 0
    ? "Due today"
    : r.days === 1
    ? "Tomorrow"
    : `${r.days} days left`;

  const daysColor =
    isExpired || isCritical
      ? "text-red-600"
      : isWarning
      ? "text-yellow-600"
      : isUpcoming
      ? "text-orange-500"
      : "text-gray-500";

  return (
    <div className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border ${bg} gap-3`}>
      <div className="flex items-center gap-3 min-w-0">
        {icon}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            {r.kind === "subscription" ? (
              <Tv className="w-3 h-3 text-gray-400 flex-shrink-0" />
            ) : (
              <Car className="w-3 h-3 text-gray-400 flex-shrink-0" />
            )}
            <p className="text-sm font-semibold text-gray-900 leading-none truncate">{r.label}</p>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{r.sublabel}</p>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className={`font-bold text-sm ${daysColor}`}>{daysLabel}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">Due {formatDate(r.expiry)}</p>
      </div>
    </div>
  );
}

export default function RemindersPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "vehicles" | "subscriptions">("all");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const [{ data: vehicleData }, { data: subData }] = await Promise.all([
        supabase.from("vehicles").select("*").order("created_at", { ascending: false }),
        supabase.from("subscriptions").select("*").order("next_billing_date", { ascending: true }),
      ]);
      if (vehicleData) setVehicles(vehicleData);
      if (subData) setSubscriptions(subData);
      setLoading(false);
    }
    load();
  }, []);

  const vehicleReminders = buildVehicleReminders(vehicles).sort((a, b) => a.days - b.days);
  const subReminders = buildSubReminders(subscriptions).sort((a, b) => a.days - b.days);

  const allReminders =
    activeTab === "vehicles"
      ? vehicleReminders
      : activeTab === "subscriptions"
      ? subReminders
      : [...vehicleReminders, ...subReminders].sort((a, b) => a.days - b.days);

  const active = allReminders.filter((r) => r.days <= 30);
  const upcoming = allReminders.filter((r) => r.days > 30);

  const hasData = vehicles.length > 0 || subscriptions.length > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Reminders</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {!hasData
            ? "Add vehicles or subscriptions to see reminders"
            : active.length === 0
            ? "All your renewals are on track"
            : `${active.length} renewal${active.length !== 1 ? "s" : ""} need your attention`}
        </p>
      </div>

      {/* Tabs */}
      {hasData && (
        <div className="flex gap-2 border-b border-gray-100 pb-1">
          {(
            [
              { key: "all", label: `All (${vehicleReminders.length + subReminders.length})` },
              { key: "vehicles", label: `Vehicles (${vehicleReminders.length})` },
              { key: "subscriptions", label: `Subscriptions (${subReminders.length})` },
            ] as { key: typeof activeTab; label: string }[]
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* No data */}
      {!hasData && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <Bell className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Nothing tracked yet</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            Add a vehicle or subscription and we&apos;ll track all renewal dates here.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-200"
              asChild
            >
              <Link href="/dashboard/vehicles">
                Add a vehicle <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-xl border-gray-200" asChild>
              <Link href="/dashboard/subscriptions">
                Add subscription <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {hasData && (
        <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Main: alerts */}
          <div className="lg:col-span-2 space-y-5">
            {/* Active alerts */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
                <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5 text-red-500" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Active Alerts</span>
                {active.length > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {active.length}
                  </span>
                )}
              </div>
              <div className="p-4">
                {active.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-green-400" />
                    <p className="text-sm font-medium text-gray-700">No urgent renewals right now!</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Great work keeping everything up to date
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {active.map((r) => (
                      <ReminderRow key={r.key} r={r} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming */}
            {upcoming.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">Upcoming (31–90 days)</span>
                  <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-[10px] border-0">
                    {upcoming.length}
                  </Badge>
                </div>
                <div className="p-4">
                  <div className="space-y-2.5">
                    {upcoming.slice(0, 8).map((r) => (
                      <ReminderRow key={r.key} r={r} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right panel */}
          <div className="space-y-5">
            {/* Notification channels */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <p className="font-semibold text-gray-900 text-sm">Notification channels</p>
              </div>
              <div className="p-4 space-y-3">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    desc: "Renewal reminders via email",
                    enabled: true,
                    premium: false,
                  },
                  {
                    icon: Smartphone,
                    label: "Push",
                    desc: "Browser & mobile push alerts",
                    enabled: false,
                    premium: true,
                  },
                  {
                    icon: MessageCircle,
                    label: "Telegram",
                    desc: "Reminders in Telegram",
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
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        ch.enabled ? "bg-blue-100" : "bg-gray-200"
                      }`}
                    >
                      <ch.icon
                        className={`w-4 h-4 ${ch.enabled ? "text-blue-600" : "text-gray-400"}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-semibold text-gray-900">{ch.label}</p>
                        {ch.premium && !ch.enabled && (
                          <span className="text-[9px] bg-yellow-100 text-yellow-700 font-bold px-1.5 py-0.5 rounded-full">
                            PRO
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400">{ch.desc}</p>
                    </div>
                    <div
                      className={`rounded-full flex items-center transition-colors flex-shrink-0 ${
                        ch.enabled ? "bg-blue-600 justify-end" : "bg-gray-300 justify-start"
                      }`}
                      style={{ width: "34px", height: "20px" }}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-sm mx-0.5" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 pb-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-4">
                  <p className="text-white text-xs font-bold mb-1">Unlock all channels</p>
                  <p className="text-blue-200 text-[11px] leading-relaxed mb-3">
                    Get Telegram and push notifications with Premium.
                  </p>
                  <Link
                    href="/dashboard/billing"
                    className="block w-full text-center bg-white text-blue-700 text-xs font-bold py-1.5 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Upgrade — Rs. 99/month
                  </Link>
                </div>
              </div>
            </div>

            {/* Reminder schedule */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm font-semibold text-gray-900 mb-4">Reminder schedule</p>
              <div className="space-y-3">
                {[
                  "30 days before",
                  "15 days before",
                  "7 days before",
                  "3 days before",
                  "1 day before",
                ].map((d) => (
                  <div key={d} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{d}</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
