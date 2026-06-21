"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Car,
  Bell,
  FileText,
  Settings,
  CreditCard,
  Shield,
  LogOut,
  X,
  ChevronRight,
  Tv,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: "alert" | "count";
};

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("...");
  const [userPlan, setUserPlan] = useState("free");
  const [vehicleCount, setVehicleCount] = useState(0);
  const [alertCount, setAlertCount] = useState(0);
  const [subCount, setSubCount] = useState(0);
  const [initials, setInitials] = useState("?");
  const [avatarColor, setAvatarColor] = useState("bg-blue-500");

  const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-rose-500", "bg-orange-500"];

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const [{ data: authData }, { data: vehicles }, { data: profile }, { data: subs }] =
        await Promise.all([
          supabase.auth.getUser(),
          supabase
            .from("vehicles")
            .select("tax_expiry, bluebook_expiry, insurance_expiry, pollution_expiry"),
          supabase.from("profiles").select("name, plan").single(),
          supabase.from("subscriptions").select("next_billing_date"),
        ]);

      const displayName =
        profile?.name ||
        authData?.user?.user_metadata?.full_name ||
        authData?.user?.email ||
        "User";
      setUserName(displayName);
      setUserPlan(profile?.plan ?? "free");

      const parts = displayName.split(" ").filter(Boolean);
      const inits =
        parts.length >= 2
          ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
          : displayName.slice(0, 2).toUpperCase();
      setInitials(inits);

      // consistent color based on initials
      const colorIdx = (inits.charCodeAt(0) + (inits.charCodeAt(1) || 0)) % colors.length;
      setAvatarColor(colors[colorIdx]);

      if (vehicles) {
        setVehicleCount(vehicles.length);
        const vehicleAlerts = vehicles.reduce((count, v) => {
          const days = [
            daysUntil(v.tax_expiry),
            daysUntil(v.bluebook_expiry),
            daysUntil(v.insurance_expiry),
            daysUntil(v.pollution_expiry),
          ].filter((d): d is number => d !== null);
          return count + days.filter((d) => d <= 30).length;
        }, 0);
        const subAlerts = (subs ?? []).filter((s) => {
          const d = daysUntil(s.next_billing_date);
          return d !== null && d <= 7;
        }).length;
        setAlertCount(vehicleAlerts + subAlerts);
      }
      if (subs) setSubCount(subs.length);
    }
    load();
  }, [pathname]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const navItems: NavItem[] = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    {
      href: "/dashboard/vehicles",
      label: "Vehicles",
      icon: Car,
      badge: vehicleCount > 0 ? String(vehicleCount) : undefined,
      badgeVariant: "count",
    },
    {
      href: "/dashboard/subscriptions",
      label: "Subscriptions",
      icon: Tv,
      badge: subCount > 0 ? String(subCount) : undefined,
      badgeVariant: "count",
    },
    {
      href: "/dashboard/reminders",
      label: "Reminders",
      icon: Bell,
      badge: alertCount > 0 ? String(alertCount) : undefined,
      badgeVariant: "alert",
    },
    { href: "/dashboard/documents", label: "Documents", icon: FileText },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  ];

  const planLabel =
    userPlan === "premium" ? "Premium" : userPlan === "fleet" ? "Fleet" : "Free plan";

  const planBadgeClass =
    userPlan === "premium"
      ? "bg-yellow-100 text-yellow-700"
      : userPlan === "fleet"
      ? "bg-purple-100 text-purple-700"
      : "bg-gray-100 text-gray-500";

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-100 flex flex-col z-40 transition-transform duration-300 ease-in-out",
        "lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo + close button */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg" onClick={onClose}>
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-gray-900">
            Renew<span className="text-blue-600">Mate</span>
          </span>
        </Link>
        <button
          className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">
          Menu
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-4 h-4 flex-shrink-0",
                      active ? "text-white" : "text-gray-400 group-hover:text-gray-600"
                    )}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center",
                        active
                          ? "bg-white/25 text-white"
                          : item.badgeVariant === "alert"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  {!active && <ChevronRight className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Upgrade CTA for free users */}
        {userPlan === "free" && (
          <div className="mt-6 mx-1">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-4">
              <p className="text-white text-xs font-bold mb-1">Upgrade to Premium</p>
              <p className="text-blue-200 text-[11px] leading-relaxed mb-3">
                Unlimited vehicles, Telegram alerts & document storage.
              </p>
              <Link
                href="/dashboard/billing"
                onClick={onClose}
                className="block w-full text-center bg-white text-blue-700 text-xs font-bold py-1.5 px-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Rs. 99/month →
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
          <div
            className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0",
              avatarColor
            )}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate leading-none mb-0.5">
              {userName}
            </p>
            <span
              className={cn(
                "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                planBadgeClass
              )}
            >
              {planLabel}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
