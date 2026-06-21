"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  Tv,
  Music,
  Zap,
  Cloud,
  Layers,
  Receipt,
  AlertTriangle,
  Clock,
} from "lucide-react";

type Subscription = {
  id: string;
  user_id: string;
  name: string;
  category: string;
  price: number;
  billing_cycle: string;
  next_billing_date: string;
  notes: string | null;
  created_at: string;
};

type FormData = {
  name: string;
  category: string;
  price: string;
  billing_cycle: string;
  next_billing_date: string;
  notes: string;
};

const EMPTY_FORM: FormData = {
  name: "",
  category: "",
  price: "",
  billing_cycle: "monthly",
  next_billing_date: "",
  notes: "",
};

const CATEGORIES = [
  { value: "streaming", label: "Streaming", icon: Tv },
  { value: "music", label: "Music", icon: Music },
  { value: "gaming", label: "Gaming", icon: Zap },
  { value: "bills", label: "Monthly Bills", icon: Receipt },
  { value: "cloud", label: "Cloud & Apps", icon: Cloud },
  { value: "other", label: "Other", icon: Layers },
];

const PRESETS = [
  { name: "Netflix", category: "streaming", emoji: "🎬" },
  { name: "Amazon Prime", category: "streaming", emoji: "📦" },
  { name: "Disney+", category: "streaming", emoji: "✨" },
  { name: "YouTube Premium", category: "streaming", emoji: "▶️" },
  { name: "Apple TV+", category: "streaming", emoji: "🍎" },
  { name: "Crunchyroll", category: "streaming", emoji: "🍥" },
  { name: "Spotify", category: "music", emoji: "🎵" },
  { name: "Apple Music", category: "music", emoji: "🎶" },
  { name: "YouTube Music", category: "music", emoji: "🎵" },
  { name: "Xbox Game Pass", category: "gaming", emoji: "🎮" },
  { name: "PlayStation Plus", category: "gaming", emoji: "🕹️" },
  { name: "Google One", category: "cloud", emoji: "☁️" },
  { name: "iCloud+", category: "cloud", emoji: "🍎" },
  { name: "Microsoft 365", category: "cloud", emoji: "💼" },
  { name: "Adobe CC", category: "cloud", emoji: "🎨" },
  { name: "ChatGPT Plus", category: "other", emoji: "🤖" },
  { name: "Canva Pro", category: "other", emoji: "🖌️" },
  { name: "Electricity Bill", category: "bills", emoji: "⚡" },
  { name: "Internet / WiFi", category: "bills", emoji: "🌐" },
  { name: "Phone Bill", category: "bills", emoji: "📱" },
  { name: "Water Bill", category: "bills", emoji: "💧" },
  { name: "Gas / Cylinder", category: "bills", emoji: "🔥" },
];

function getEmoji(name: string): string {
  const preset = PRESETS.find((p) => p.name.toLowerCase() === name.toLowerCase());
  return preset?.emoji ?? "📋";
}

function getCategoryInfo(cat: string) {
  return CATEGORIES.find((c) => c.value === cat) ?? CATEGORIES[CATEGORIES.length - 1];
}

function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function monthlyEquiv(price: number, cycle: string): number {
  return cycle === "yearly" ? price / 12 : price;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-NP", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ days }: { days: number }) {
  if (days < 0)
    return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs border-0">Overdue {Math.abs(days)}d</Badge>;
  if (days === 0)
    return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs border-0">Due today</Badge>;
  if (days <= 3)
    return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs border-0">{days}d left</Badge>;
  if (days <= 7)
    return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-xs border-0">{days}d left</Badge>;
  if (days <= 30)
    return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs border-0">{days}d left</Badge>;
  return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs border-0">{days}d</Badge>;
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Subscription | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [showPresets, setShowPresets] = useState(false);

  const fetchSubs = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("subscriptions")
      .select("*")
      .order("next_billing_date", { ascending: true });
    if (data) setSubscriptions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSubs();
  }, [fetchSubs]);

  function openAddModal() {
    setEditItem(null);
    setFormData(EMPTY_FORM);
    setFormError("");
    setShowPresets(true);
    setModalOpen(true);
  }

  function openEditModal(s: Subscription) {
    setEditItem(s);
    setFormData({
      name: s.name,
      category: s.category,
      price: String(s.price),
      billing_cycle: s.billing_cycle,
      next_billing_date: s.next_billing_date,
      notes: s.notes ?? "",
    });
    setFormError("");
    setShowPresets(false);
    setModalOpen(true);
  }

  function selectPreset(preset: (typeof PRESETS)[0]) {
    setFormData((prev) => ({ ...prev, name: preset.name, category: preset.category }));
    setShowPresets(false);
  }

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price || !formData.next_billing_date) {
      setFormError("Name, category, price, and billing date are required.");
      return;
    }
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setFormError("Please enter a valid price.");
      return;
    }
    setSaving(true);
    setFormError("");

    const payload = {
      name: formData.name.trim(),
      category: formData.category,
      price,
      billing_cycle: formData.billing_cycle,
      next_billing_date: formData.next_billing_date,
      notes: formData.notes || null,
    };

    const supabase = createClient();
    let err;
    if (editItem) {
      ({ error: err } = await supabase.from("subscriptions").update(payload).eq("id", editItem.id));
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      ({ error: err } = await supabase
        .from("subscriptions")
        .insert({ ...payload, user_id: user!.id }));
    }

    setSaving(false);
    if (err) {
      setFormError(err.message);
      return;
    }
    setModalOpen(false);
    await fetchSubs();
  }

  async function handleDelete(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from("subscriptions").delete().eq("id", id);
    if (!error) setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    setDeleteId(null);
  }

  const totalMonthly = subscriptions.reduce(
    (sum, s) => sum + monthlyEquiv(s.price, s.billing_cycle),
    0
  );
  const totalYearly = totalMonthly * 12;
  const dueSoon = subscriptions.filter((s) => {
    const d = daysUntil(s.next_billing_date);
    return d >= 0 && d <= 7;
  }).length;
  const overdue = subscriptions.filter((s) => daysUntil(s.next_billing_date) < 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Subscriptions & Bills</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {loading
              ? "Loading..."
              : `${subscriptions.length} tracked · Rs. ${Math.round(totalMonthly).toLocaleString()}/month total`}
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2 shadow-md shadow-blue-200 self-start sm:self-auto"
          onClick={openAddModal}
        >
          <Plus className="w-4 h-4" />
          Add subscription
        </Button>
      </div>

      {/* Stats */}
      {!loading && subscriptions.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              label: "Monthly Total",
              value: `Rs. ${Math.round(totalMonthly).toLocaleString()}`,
              icon: Receipt,
              color: "text-blue-600",
              bg: "bg-blue-50",
              border: "border-blue-100",
            },
            {
              label: "Yearly Total",
              value: `Rs. ${Math.round(totalYearly).toLocaleString()}`,
              icon: Layers,
              color: "text-indigo-600",
              bg: "bg-indigo-50",
              border: "border-indigo-100",
            },
            {
              label: "Due in 7 days",
              value: dueSoon,
              icon: Clock,
              color: "text-yellow-600",
              bg: "bg-yellow-50",
              border: "border-yellow-100",
            },
            {
              label: "Overdue",
              value: overdue,
              icon: AlertTriangle,
              color: "text-red-600",
              bg: "bg-red-50",
              border: "border-red-100",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`bg-white rounded-2xl border ${stat.border} p-4 sm:p-5 hover:shadow-md transition-shadow`}
            >
              <div
                className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}
              >
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-0.5">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      )}

      {/* Empty state */}
      {!loading && subscriptions.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <Tv className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No subscriptions yet</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            Track Netflix, Spotify, electricity bills and more. Never miss a payment.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2 shadow-md shadow-blue-200"
            onClick={openAddModal}
          >
            <Plus className="w-4 h-4" />
            Add your first subscription
          </Button>
        </div>
      )}

      {/* Grid */}
      {!loading && subscriptions.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {subscriptions.map((s) => {
            const days = daysUntil(s.next_billing_date);
            const catInfo = getCategoryInfo(s.category);
            const emoji = getEmoji(s.name);
            const borderColor =
              days < 0
                ? "border-red-200 hover:border-red-300"
                : days <= 7
                ? "border-orange-200 hover:border-orange-300"
                : "border-gray-100 hover:border-gray-200";

            return (
              <div
                key={s.id}
                className={`bg-white rounded-2xl border ${borderColor} shadow-sm hover:shadow-md transition-all p-5`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                      {emoji}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-base">{s.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{catInfo.label}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-900 text-sm">
                      Rs. {s.price.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      /{s.billing_cycle === "monthly" ? "mo" : "yr"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Next billing</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {formatDate(s.next_billing_date)}
                    </p>
                  </div>
                  <StatusBadge days={days} />
                </div>

                {s.billing_cycle === "yearly" && (
                  <p className="text-[11px] text-gray-400 mb-3">
                    ≈ Rs. {Math.round(s.price / 12).toLocaleString()}/month
                  </p>
                )}

                {s.notes && (
                  <p className="text-[11px] text-gray-400 mb-3 truncate">{s.notes}</p>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 h-8 text-xs border-gray-200 gap-1.5 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                    onClick={() => openEditModal(s)}
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 h-8 text-xs border-gray-200 gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                    onClick={() => setDeleteId(s.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}

          {/* Add card */}
          <button
            onClick={openAddModal}
            className="bg-white border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer group min-h-[180px] flex flex-col items-center justify-center gap-2 p-5"
          >
            <div className="w-12 h-12 rounded-2xl bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
              <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <p className="font-semibold text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
              Add subscription
            </p>
            <p className="text-xs text-gray-400">Track billing dates automatically</p>
          </button>
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg">
              {editItem ? "Edit Subscription" : "Add Subscription"}
            </DialogTitle>
          </DialogHeader>

          {/* Preset picker */}
          {showPresets && !editItem && (
            <div className="mt-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Quick add
              </p>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => selectPreset(p)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 transition-colors text-center"
                  >
                    <span className="text-lg">{p.emoji}</span>
                    <span className="text-[10px] font-medium text-gray-600 leading-tight">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400">or add custom</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            {formError && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {formError}
              </div>
            )}

            <div>
              <Label className="text-sm font-medium text-gray-700">Name *</Label>
              <Input
                placeholder="Netflix, Electricity Bill..."
                className="mt-1.5 h-10 border-gray-200"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => updateField("category", v)}
                >
                  <SelectTrigger className="mt-1.5 h-10 border-gray-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Billing Cycle *</Label>
                <Select
                  value={formData.billing_cycle}
                  onValueChange={(v) => updateField("billing_cycle", v)}
                >
                  <SelectTrigger className="mt-1.5 h-10 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Price (Rs.) *</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="299"
                  className="mt-1.5 h-10 border-gray-200"
                  value={formData.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Next Billing Date *</Label>
                <Input
                  type="date"
                  className="mt-1.5 h-10 border-gray-200"
                  value={formData.next_billing_date}
                  onChange={(e) => updateField("next_billing_date", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Notes (optional)</Label>
              <Input
                placeholder="Account email, plan name..."
                className="mt-1.5 h-10 border-gray-200"
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />
            </div>

            <DialogFooter className="pt-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={saving}
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {saving ? "Saving..." : editItem ? "Save changes" : "Add subscription"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Remove subscription?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            This will permanently delete this subscription. This cannot be undone.
          </p>
          <DialogFooter className="pt-2 gap-2">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              Yes, remove it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
