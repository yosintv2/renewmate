import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Shield, Trash2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account and preferences</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Profile */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-bold">RS</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">Ramesh Shrestha</p>
                <p className="text-sm text-gray-500">ramesh@example.com</p>
                <Badge className="mt-1 bg-gray-100 text-gray-600 hover:bg-gray-100 text-xs">
                  Free plan
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full name</Label>
                <Input
                  id="name"
                  defaultValue="Ramesh Shrestha"
                  className="mt-1.5 border-gray-200"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="ramesh@example.com"
                  className="mt-1.5 border-gray-200"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone number <span className="text-gray-400 font-normal">(optional)</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+977 98xxxxxxxx"
                  className="mt-1.5 border-gray-200"
                />
              </div>
            </div>

            <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
              Save changes
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-gray-400" />
              Notification preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                { label: "30 days before renewal", enabled: true },
                { label: "15 days before renewal", enabled: true },
                { label: "7 days before renewal", enabled: true },
                { label: "3 days before renewal", enabled: true },
                { label: "1 day before renewal", enabled: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <div className={`w-9 h-5 rounded-full flex items-center transition-colors cursor-pointer ${
                    item.enabled ? "bg-blue-600 justify-end" : "bg-gray-300 justify-start"
                  }`}>
                    <div className="w-4 h-4 rounded-full bg-white shadow-sm mx-0.5" />
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-5" />

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Telegram notifications
              </p>
              <p className="text-xs text-blue-600 mb-3">
                Connect your Telegram account to receive reminders instantly.
              </p>
              <Button size="sm" variant="outline" className="text-xs h-8 border-blue-200 text-blue-700 hover:bg-blue-100">
                Connect Telegram — Premium
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-gray-100 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-400" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password" className="text-sm font-medium text-gray-700">
                  Current password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1.5 border-gray-200"
                />
              </div>
              <div>
                <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                  New password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="At least 8 characters"
                  className="mt-1.5 border-gray-200"
                />
              </div>
            </div>
            <Button variant="outline" className="mt-4 border-gray-200">
              Update password
            </Button>
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-red-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-red-600 flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Danger zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Once you delete your account, all your vehicles, reminders, and documents will be permanently deleted. This cannot be undone.
            </p>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300">
              Delete account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
