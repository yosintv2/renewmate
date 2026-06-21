import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Trash2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const notificationToggles = [
  { label: "30 days before renewal", enabled: true },
  { label: "15 days before renewal", enabled: true },
  { label: "7 days before renewal", enabled: true },
  { label: "3 days before renewal", enabled: true },
  { label: "1 day before renewal", enabled: true },
];

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <div
      className={`relative w-9 h-5 rounded-full flex items-center transition-colors cursor-pointer flex-shrink-0 ${enabled ? "bg-blue-600" : "bg-gray-300"}`}
    >
      <div
        className={`absolute w-4 h-4 rounded-full bg-white shadow-sm transition-all ${enabled ? "translate-x-4" : "translate-x-0.5"}`}
      />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your account and preferences</p>
      </div>

      <div className="max-w-2xl space-y-5">
        {/* Profile */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <span className="font-semibold text-gray-900 text-sm">Profile</span>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                RS
              </div>
              <div>
                <p className="font-bold text-gray-900">Ramesh Shrestha</p>
                <p className="text-sm text-gray-500">ramesh@example.com</p>
                <span className="inline-block text-[10px] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full mt-1">
                  Free plan
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full name</Label>
                <Input id="name" defaultValue="Ramesh Shrestha" className="mt-1.5 border-gray-200 h-10" />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</Label>
                <Input id="email" type="email" defaultValue="ramesh@example.com" className="mt-1.5 border-gray-200 h-10" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone <span className="text-gray-400 font-normal">(optional)</span>
                </Label>
                <Input id="phone" type="tel" placeholder="+977 98xxxxxxxx" className="mt-1.5 border-gray-200 h-10" />
              </div>
            </div>

            <Button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-200">
              Save changes
            </Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
            <div className="w-7 h-7 rounded-lg bg-yellow-50 flex items-center justify-center">
              <Bell className="w-3.5 h-3.5 text-yellow-600" />
            </div>
            <span className="font-semibold text-gray-900 text-sm">Notification preferences</span>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {notificationToggles.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <Toggle enabled={item.enabled} />
                </div>
              ))}
            </div>

            <Separator className="my-5" />

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-4">
              <p className="text-white text-sm font-bold mb-1">Telegram notifications</p>
              <p className="text-blue-200 text-xs mb-3">
                Connect your Telegram account to receive reminders instantly in chat.
              </p>
              <Link
                href="/dashboard/billing"
                className="inline-block text-xs font-semibold bg-white text-blue-700 hover:bg-blue-50 py-1.5 px-3 rounded-lg transition-colors"
              >
                Upgrade to enable Telegram →
              </Link>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
            <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-green-600" />
            </div>
            <span className="font-semibold text-gray-900 text-sm">Security</span>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password" className="text-sm font-medium text-gray-700">
                  Current password
                </Label>
                <Input id="current-password" type="password" placeholder="••••••••" className="mt-1.5 border-gray-200 h-10" />
              </div>
              <div>
                <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                  New password
                </Label>
                <Input id="new-password" type="password" placeholder="At least 8 characters" className="mt-1.5 border-gray-200 h-10" />
              </div>
            </div>
            <Button variant="outline" className="mt-5 border-gray-200 rounded-xl">
              Update password
            </Button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-red-100">
            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
            </div>
            <span className="font-semibold text-red-600 text-sm">Danger zone</span>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-500 mb-4">
              Once you delete your account, all your vehicles, reminders, and documents will be permanently deleted. This cannot be undone.
            </p>
            <Button
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl"
            >
              Delete account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
