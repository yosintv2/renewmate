"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
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
} from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Loader2, AlertCircle, ArrowLeft, X } from "lucide-react";
import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

// ─── Category definitions ────────────────────────────────────────────────────

type CategoryKey = "entertainment" | "living" | "tech" | "lifestyle" | "financial" | "other";

const CATEGORIES: {
  value: CategoryKey;
  label: string;
  desc: string;
  color: string;
  activeBg: string;
  borderAccent: string;
  badgeCls: string;
  presets: string[];
}[] = [
  {
    value: "entertainment",
    label: "Entertainment",
    desc: "Netflix, Spotify, Crunchyroll",
    color: "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100",
    activeBg: "bg-purple-600 text-white border-purple-600",
    borderAccent: "border-l-purple-400",
    badgeCls: "bg-purple-100 text-purple-700",
    presets: [
      "Netflix", "Amazon Prime", "Disney+", "YouTube Premium",
      "Apple TV+", "Crunchyroll", "Hulu", "HBO Max", "Plex", "MUBI",
      "Spotify", "Apple Music", "YouTube Music", "Tidal", "Deezer",
    ],
  },
  {
    value: "living",
    label: "Living Essentials",
    desc: "Rent, Electricity, Water",
    color: "border-green-200 bg-green-50 text-green-700 hover:bg-green-100",
    activeBg: "bg-green-600 text-white border-green-600",
    borderAccent: "border-l-green-400",
    badgeCls: "bg-green-100 text-green-700",
    presets: [
      "Rent", "Electricity", "Water Bill", "Gas",
      "Internet / WiFi", "Phone Bill", "Home Insurance",
      "Parking", "Trash / Waste", "Cleaning Service",
    ],
  },
  {
    value: "tech",
    label: "Tech & Tools",
    desc: "iCloud, OpenAI, Notion, Adobe",
    color: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100",
    activeBg: "bg-blue-600 text-white border-blue-600",
    borderAccent: "border-l-blue-400",
    badgeCls: "bg-blue-100 text-blue-700",
    presets: [
      "iCloud+", "Google One", "ChatGPT Plus", "Notion",
      "Adobe CC", "Microsoft 365", "Canva Pro", "Figma",
      "GitHub Pro", "Dropbox", "OneDrive", "Linear", "Vercel",
    ],
  },
  {
    value: "lifestyle",
    label: "Lifestyle",
    desc: "Gym, Fashion Box, Gaming",
    color: "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100",
    activeBg: "bg-orange-600 text-white border-orange-600",
    borderAccent: "border-l-orange-400",
    badgeCls: "bg-orange-100 text-orange-700",
    presets: [
      "Gym Membership", "Yoga / Fitness App", "Fashion Box",
      "Meal Kit", "Book Club", "Magazine",
      "Xbox Game Pass", "PlayStation Plus", "Nintendo Online",
      "Duolingo Plus", "Meditation App",
    ],
  },
  {
    value: "financial",
    label: "Financial Liabilities",
    desc: "Credit Cards, BNPL, Loan EMI",
    color: "border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
    activeBg: "bg-red-600 text-white border-red-600",
    borderAccent: "border-l-red-400",
    badgeCls: "bg-red-100 text-red-700",
    presets: [
      "Credit Card Bill", "BNPL / Pay Later",
      "Loan EMI", "Insurance Premium",
      "Phone / Device EMI", "Car Loan EMI",
      "Mortgage", "Student Loan",
    ],
  },
  {
    value: "other",
    label: "Other",
    desc: "Anything else",
    color: "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100",
    activeBg: "bg-gray-700 text-white border-gray-700",
    borderAccent: "border-l-gray-300",
    badgeCls: "bg-gray-100 text-gray-600",
    presets: [],
  },
];

function getCat(value: string) {
  return CATEGORIES.find((c) => c.value === value) ?? CATEGORIES[CATEGORIES.length - 1];
}

// ─── Types ───────────────────────────────────────────────────────────────────

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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function monthlyEquiv(price: number, cycle: string) {
  return cycle === "yearly" ? price / 12 : price;
}

function DaysTag({ days }: { days: number }) {
  const base = "inline-block text-xs font-bold px-2 py-0.5 rounded-full";
  if (days < 0) return <span className={cn(base, "bg-red-100 text-red-700")}>Overdue {Math.abs(days)}d</span>;
  if (days === 0) return <span className={cn(base, "bg-red-100 text-red-700")}>Due today</span>;
  if (days <= 3) return <span className={cn(base, "bg-red-100 text-red-700")}>{days}d left</span>;
  if (days <= 7) return <span className={cn(base, "bg-orange-100 text-orange-700")}>{days}d left</span>;
  if (days <= 30) return <span className={cn(base, "bg-yellow-100 text-yellow-700")}>{days}d left</span>;
  return <span className={cn(base, "bg-green-100 text-green-700")}>{days}d</span>;
}

// ─── Add dialog (3-step) ──────────────────────────────────────────────────────

type DialogStep = 1 | 2 | 3;

function AddDialog({
  open,
  onOpenChange,
  editItem,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editItem: Subscription | null;
  onSaved: () => void;
}) {
  const [step, setStep] = useState<DialogStep>(editItem ? 3 : 1);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { symbol } = useCurrency();

  useEffect(() => {
    if (!open) return;
    if (editItem) {
      setStep(3);
      setFormData({
        name: editItem.name,
        category: editItem.category,
        price: String(editItem.price),
        billing_cycle: editItem.billing_cycle,
        next_billing_date: editItem.next_billing_date,
        notes: editItem.notes ?? "",
      });
    } else {
      setStep(1);
      setFormData(EMPTY_FORM);
    }
    setError("");
  }, [open, editItem]);

  function selectCategory(cat: CategoryKey) {
    setFormData((p) => ({ ...p, category: cat, name: "" }));
    setStep(2);
  }

  function selectPreset(name: string) {
    setFormData((p) => ({ ...p, name }));
    setStep(3);
  }

  function goBack() {
    if (step === 2) setStep(1);
    if (step === 3 && !editItem) setStep(2);
  }

  function set(field: keyof FormData, value: string) {
    setFormData((p) => ({ ...p, [field]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price || !formData.next_billing_date) {
      setError("Name, category, price, and billing date are required.");
      return;
    }
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) { setError("Enter a valid price."); return; }

    setSaving(true);
    setError("");
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
      const { data: { user } } = await supabase.auth.getUser();
      ({ error: err } = await supabase.from("subscriptions").insert({ ...payload, user_id: user!.id }));
    }
    setSaving(false);
    if (err) { setError(err.message); return; }
    onOpenChange(false);
    onSaved();
  }

  const selectedCat = CATEGORIES.find((c) => c.value === formData.category);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="w-full max-w-sm sm:max-w-md mx-auto max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
          {(step > 1 && !editItem) && (
            <button
              onClick={goBack}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors -ml-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <DialogTitle className="flex-1 text-base font-bold text-gray-900">
            {editItem ? "Edit Subscription" : step === 1 ? "Choose Category" : step === 2 ? selectedCat?.label ?? "Choose Service" : "Add Details"}
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step indicator (add mode only) */}
        {!editItem && (
          <div className="flex gap-1 px-5 py-3 flex-shrink-0">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1 rounded-full flex-1 transition-colors",
                  s <= step ? "bg-blue-600" : "bg-gray-200"
                )}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {/* Step 1: Category */}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => selectCategory(cat.value)}
                  className={cn(
                    "flex flex-col items-start gap-1.5 p-4 rounded-2xl border-2 text-left transition-all active:scale-95",
                    cat.color
                  )}
                >
                  <span className="font-bold text-sm leading-tight">{cat.label}</span>
                  <span className="text-xs opacity-70 leading-snug">{cat.desc}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Preset */}
          {step === 2 && (
            <div className="pt-2 space-y-3">
              <p className="text-xs text-gray-400">Pick a service or add custom below</p>
              <div className="flex flex-wrap gap-2">
                {(selectedCat?.presets ?? []).map((name) => (
                  <button
                    key={name}
                    onClick={() => selectPreset(name)}
                    className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 active:scale-95 transition-all"
                  >
                    {name}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-400 mb-2">Or type a custom name</p>
                <div className="flex gap-2">
                  <Input
                    placeholder={`Custom ${selectedCat?.label} service...`}
                    className="h-11 border-gray-200 text-sm"
                    value={formData.name}
                    onChange={(e) => set("name", e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && formData.name) { e.preventDefault(); setStep(3); } }}
                  />
                  <Button
                    type="button"
                    disabled={!formData.name}
                    onClick={() => setStep(3)}
                    className="h-11 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex-shrink-0"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Details form */}
          {step === 3 && (
            <form id="sub-form" onSubmit={handleSave} className="space-y-4 pt-2">
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Service name</Label>
                <Input
                  className="mt-1.5 h-11 border-gray-200 text-sm"
                  value={formData.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="e.g. Netflix"
                  required
                />
              </div>

              {/* Category (editable on step 3) */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Category</Label>
                <Select value={formData.category} onValueChange={(v) => set("category", v)}>
                  <SelectTrigger className="mt-1.5 h-11 border-gray-200 text-sm">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price + Cycle */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Amount ({symbol})</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="mt-1.5 h-11 border-gray-200 text-sm"
                    value={formData.price}
                    onChange={(e) => set("price", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Billing cycle</Label>
                  <Select value={formData.billing_cycle} onValueChange={(v) => set("billing_cycle", v)}>
                    <SelectTrigger className="mt-1.5 h-11 border-gray-200 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Next billing date */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Next billing date</Label>
                <Input
                  type="date"
                  className="mt-1.5 h-11 border-gray-200 text-sm"
                  value={formData.next_billing_date}
                  onChange={(e) => set("next_billing_date", e.target.value)}
                  required
                />
              </div>

              {/* Notes */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Notes <span className="text-gray-400 font-normal">(optional)</span>
                </Label>
                <Input
                  placeholder="Plan details, account email..."
                  className="mt-1.5 h-11 border-gray-200 text-sm"
                  value={formData.notes}
                  onChange={(e) => set("notes", e.target.value)}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                form="sub-form"
                disabled={saving}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm mt-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : editItem ? "Save changes" : "Add subscription"}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete confirm ───────────────────────────────────────────────────────────

function DeleteDialog({
  name,
  onConfirm,
  onCancel,
}: {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open onOpenChange={(v) => { if (!v) onCancel(); }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Remove "{name}"?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">This will permanently delete this entry. Cannot be undone.</p>
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 h-11 rounded-xl" onClick={onCancel}>Cancel</Button>
          <Button className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white rounded-xl" onClick={onConfirm}>
            Remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Subscription | null>(null);
  const [deleteItem, setDeleteItem] = useState<Subscription | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { fmt } = useCurrency();

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

  useEffect(() => { fetchSubs(); }, [fetchSubs]);

  function openAdd() {
    setEditItem(null);
    setDialogOpen(true);
  }

  function openEdit(s: Subscription) {
    setEditItem(s);
    setDialogOpen(true);
  }

  async function handleDelete(s: Subscription) {
    const supabase = createClient();
    await supabase.from("subscriptions").delete().eq("id", s.id);
    setSubscriptions((prev) => prev.filter((x) => x.id !== s.id));
    setDeleteItem(null);
  }

  const filtered =
    activeFilter === "all"
      ? subscriptions
      : subscriptions.filter((s) => s.category === activeFilter);

  const totalMonthly = subscriptions.reduce((sum, s) => sum + monthlyEquiv(s.price, s.billing_cycle), 0);
  const dueSoon = subscriptions.filter((s) => { const d = daysUntil(s.next_billing_date); return d >= 0 && d <= 7; }).length;

  const filterTabs = [
    { key: "all", label: `All (${subscriptions.length})` },
    ...CATEGORIES.filter((c) => subscriptions.some((s) => s.category === c.value)).map((c) => ({
      key: c.value,
      label: c.label,
    })),
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Subscriptions & Bills</h1>
          {!loading && subscriptions.length > 0 && (
            <p className="text-gray-500 text-sm mt-0.5">
              {fmt(Math.round(totalMonthly))}/month
              {dueSoon > 0 && (
                <span className="ml-2 text-orange-600 font-semibold">· {dueSoon} due soon</span>
              )}
            </p>
          )}
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-4 h-10 rounded-xl shadow-md shadow-blue-200 transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-7 h-7 animate-spin text-blue-400" />
        </div>
      )}

      {/* Empty */}
      {!loading && subscriptions.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center py-20 text-center px-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Nothing tracked yet</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            Add Netflix, rent, loan payments and more. See everything you pay in one place.
          </p>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 h-12 rounded-xl shadow-md shadow-blue-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add first subscription
          </button>
        </div>
      )}

      {/* Filter tabs */}
      {!loading && subscriptions.length > 0 && (
        <>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={cn(
                  "flex-shrink-0 px-4 h-9 rounded-full text-sm font-semibold transition-colors",
                  activeFilter === tab.key
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {filtered.map((s) => {
              const days = daysUntil(s.next_billing_date);
              const cat = getCat(s.category);
              return (
                <div
                  key={s.id}
                  className={cn(
                    "bg-white rounded-2xl border border-l-4 shadow-sm transition-shadow hover:shadow-md",
                    cat.borderAccent
                  )}
                >
                  <div className="p-4">
                    {/* Row 1: name + price */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-bold text-gray-900 text-base leading-tight">{s.name}</p>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-gray-900 text-sm">{fmt(s.price)}</p>
                        <p className="text-[11px] text-gray-400">
                          /{s.billing_cycle === "monthly" ? "mo"
                            : s.billing_cycle === "yearly" ? "yr"
                            : s.billing_cycle === "weekly" ? "wk"
                            : "qtr"}
                        </p>
                      </div>
                    </div>

                    {/* Row 2: category badge + cycle equiv */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full", cat.badgeCls)}>
                        {cat.label}
                      </span>
                      {s.billing_cycle === "yearly" && (
                        <span className="text-[11px] text-gray-400">
                          ≈ {fmt(Math.round(s.price / 12))}/mo
                        </span>
                      )}
                    </div>

                    {/* Row 3: due date + status */}
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">Due {formatDate(s.next_billing_date)}</p>
                      <DaysTag days={days} />
                    </div>

                    {s.notes && (
                      <p className="text-[11px] text-gray-400 mt-2 truncate">{s.notes}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="border-t border-gray-50 flex divide-x divide-gray-50">
                    <button
                      onClick={() => openEdit(s)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-bl-2xl"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteItem(s)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors rounded-br-2xl"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm">No subscriptions in this category yet</p>
                <button onClick={openAdd} className="mt-3 text-sm font-semibold text-blue-600 hover:underline">
                  Add one
                </button>
              </div>
            )}
          </div>

          {/* Bottom total bar */}
          {subscriptions.length > 0 && (
            <div className="bg-gray-900 rounded-2xl p-5 mt-2">
              <p className="text-xs text-gray-400 mb-2">Total monthly spend</p>
              <p className="text-3xl font-bold text-white">{fmt(Math.round(totalMonthly))}</p>
              <p className="text-sm text-gray-400 mt-1">
                {fmt(Math.round(totalMonthly * 12))}/year · {subscriptions.length} subscriptions
              </p>
            </div>
          )}
        </>
      )}

      {/* Add / Edit dialog */}
      <AddDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editItem={editItem}
        onSaved={fetchSubs}
      />

      {/* Delete confirm */}
      {deleteItem && (
        <DeleteDialog
          name={deleteItem.name}
          onConfirm={() => handleDelete(deleteItem)}
          onCancel={() => setDeleteItem(null)}
        />
      )}

      {/* FAB (mobile) */}
      <div className="fixed bottom-6 right-4 lg:hidden">
        <button
          onClick={openAdd}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full shadow-xl shadow-blue-300 flex items-center justify-center transition-colors"
          aria-label="Add subscription"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
