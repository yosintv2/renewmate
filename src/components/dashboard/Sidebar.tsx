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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeAlert?: boolean;
};

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("...");
  const [userPlan, setUserPlan] = useState("free");
  const [vehicleCount, setVehicleCount] = useState(0);
  const [alertCount, setAlertCount] = useState(0);
  const [initials, setInitials] = useState("?");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const [{ data: authData }, { data: vehicles }, { data: profile }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from("vehicles").select("tax_expiry, bluebook_expiry, insurance_expiry, pollution_expiry"),
        supabase.from("profiles").select("name, plan").single(),
      ]);

      const displayName =
        profile?.name ||
        authData?.user?.user_metadata?.full_name ||
        authData?.user?.email ||
        "User";
      setUserName(displayName);
      setUserPlan(profile?.plan ?? "free");

      const parts = displayName.split(" ").filter(Boolean);
      setInitials(
        parts.length >= 2
          ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
          : displayName.slice(0, 2).toUpperCase()
      );

      if (vehicles) {
        setVehicleCount(vehicles.length);
        const alerts = vehicles.reduce((count, v) => {
          const days = [
            daysUntil(v.tax_expiry),
            daysUntil(v.bluebook_expiry),
            daysUntil(v.insurance_expiry),
            daysUntil(v.pollution_expiry),
          ].filter((d): d is number => d !== null);
          return count + days.filter((d) => d <= 30).length;
        }, 0);
        setAlertCount(alerts);
      }
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
    },
    {
      href: "/dashboard/reminders",
      label: "Reminders",
      icon: Bell,
      badge: alertCount > 0 ? String(alertCount) : undefined,
      badgeAlert: true,
    },
    { href: "/dashboard/documents", label: "Documents", icon: FileText },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  ];

  const planLabel =
    userPlan === "premium" ? "Premium" : userPlan === "fleet" ? "Fleet" : "Free plan";

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-gray-100 flex flex-col z-40">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-gray-900">
            Renew<span className="text-blue-600">Mate</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">
          Main
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon
                    className={cn("w-4 h-4", active ? "text-white" : "text-gray-400")}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge
                      className={cn(
                        "text-[10px] h-4 px-1.5 min-w-4 flex items-center justify-center",
                        active
                          ? "bg-white/20 text-white hover:bg-white/20"
                          : item.badgeAlert
                          ? "bg-red-100 text-red-600 hover:bg-red-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="p-3 border-t border-gray-100">
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer group"
          onClick={handleLogout}
          title="Sign out"
        >
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
            <p className="text-xs text-gray-400 truncate capitalize">{planLabel}</p>
          </div>
          <LogOut className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
        </div>
      </div>
    </aside>
  );
}
