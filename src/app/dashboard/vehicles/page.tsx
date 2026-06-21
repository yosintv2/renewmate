"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
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
import { Car, Plus, Edit2, Trash2, Loader2, AlertCircle } from "lucide-react";

type Vehicle = {
  id: string;
  user_id: string;
  vehicle_number: string;
  vehicle_type: string;
  province: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  tax_expiry: string | null;
  bluebook_expiry: string | null;
  insurance_expiry: string | null;
  pollution_expiry: string | null;
  created_at: string;
};

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function RenewalChip({ label, days }: { label: string; days: number | null }) {
  if (days === null)
    return (
      <div className="rounded-lg border px-2.5 py-1.5 bg-gray-50 border-gray-100">
        <p className="text-[10px] font-medium text-gray-400 mb-0.5">{label}</p>
        <p className="text-xs font-bold text-gray-300">N/A</p>
      </div>
    );

  const color =
    days < 0
      ? "bg-red-100 text-red-700 border-red-200"
      : days <= 15
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : "bg-green-100 text-green-700 border-green-200";

  return (
    <div className={`rounded-lg border px-2.5 py-1.5 ${color}`}>
      <p className="text-[10px] font-medium mb-0.5 opacity-70">{label}</p>
      <p className="text-xs font-bold">
        {days < 0 ? "Expired" : days === 0 ? "Today" : days === 1 ? "Tomorrow" : `${days}d`}
      </p>
    </div>
  );
}

const VEHICLE_TYPE_LABELS: Record<string, string> = {
  bike: "Bike",
  scooter: "Scooter",
  car: "Car",
  jeep: "Jeep",
  van: "Van",
  truck: "Truck",
  other: "Other",
};

const NEPAL_PROVINCES = [
  "Koshi",
  "Madhesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
];

const VEHICLE_TYPES = ["bike", "scooter", "car", "jeep", "van", "truck", "other"];

type FormData = {
  vehicle_number: string;
  vehicle_type: string;
  province: string;
  brand: string;
  model: string;
  year: string;
  tax_expiry: string;
  bluebook_expiry: string;
  insurance_expiry: string;
  pollution_expiry: string;
};

const EMPTY_FORM: FormData = {
  vehicle_number: "",
  vehicle_type: "",
  province: "",
  brand: "",
  model: "",
  year: "",
  tax_expiry: "",
  bluebook_expiry: "",
  insurance_expiry: "",
  pollution_expiry: "",
};

const RENEWAL_FIELDS: { label: string; field: keyof FormData }[] = [
  { label: "Vehicle Tax Expiry", field: "tax_expiry" },
  { label: "Bluebook Expiry", field: "bluebook_expiry" },
  { label: "Insurance Expiry", field: "insurance_expiry" },
  { label: "Pollution Test Expiry", field: "pollution_expiry" },
];

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setVehicles(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  function openAddModal() {
    setEditVehicle(null);
    setFormData(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  }

  function openEditModal(v: Vehicle) {
    setEditVehicle(v);
    setFormData({
      vehicle_number: v.vehicle_number,
      vehicle_type: v.vehicle_type,
      province: v.province,
      brand: v.brand ?? "",
      model: v.model ?? "",
      year: v.year ? String(v.year) : "",
      tax_expiry: v.tax_expiry ?? "",
      bluebook_expiry: v.bluebook_expiry ?? "",
      insurance_expiry: v.insurance_expiry ?? "",
      pollution_expiry: v.pollution_expiry ?? "",
    });
    setFormError("");
    setModalOpen(true);
  }

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.vehicle_number || !formData.vehicle_type || !formData.province) {
      setFormError("Vehicle number, type, and province are required.");
      return;
    }
    setSaving(true);
    setFormError("");

    const payload = {
      vehicle_number: formData.vehicle_number.toUpperCase().trim(),
      vehicle_type: formData.vehicle_type,
      province: formData.province,
      brand: formData.brand || null,
      model: formData.model || null,
      year: formData.year ? parseInt(formData.year) : null,
      tax_expiry: formData.tax_expiry || null,
      bluebook_expiry: formData.bluebook_expiry || null,
      insurance_expiry: formData.insurance_expiry || null,
      pollution_expiry: formData.pollution_expiry || null,
    };

    const supabase = createClient();
    let err;
    if (editVehicle) {
      ({ error: err } = await supabase
        .from("vehicles")
        .update(payload)
        .eq("id", editVehicle.id));
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      ({ error: err } = await supabase
        .from("vehicles")
        .insert({ ...payload, user_id: user!.id }));
    }

    setSaving(false);
    if (err) {
      setFormError(err.message);
      return;
    }
    setModalOpen(false);
    await fetchVehicles();
  }

  async function handleDelete(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from("vehicles").delete().eq("id", id);
    if (!error) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    }
    setDeleteId(null);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
          <p className="text-gray-500 text-sm mt-1">
            {loading
              ? "Loading..."
              : `${vehicles.length} vehicle${vehicles.length !== 1 ? "s" : ""} tracked`}
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2"
          onClick={openAddModal}
        >
          <Plus className="w-4 h-4" />
          Add vehicle
        </Button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      )}

      {/* Empty state */}
      {!loading && vehicles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <Car className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No vehicles yet</h3>
          <p className="text-sm text-gray-500 mb-6">
            Add your first vehicle to start tracking renewal dates.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2"
            onClick={openAddModal}
          >
            <Plus className="w-4 h-4" />
            Add your first vehicle
          </Button>
        </div>
      )}

      {/* Vehicle grid */}
      {!loading && vehicles.length > 0 && (
        <div className="grid md:grid-cols-2 gap-5">
          {vehicles.map((v) => {
            const renewalDays = {
              tax: daysUntil(v.tax_expiry),
              bluebook: daysUntil(v.bluebook_expiry),
              insurance: daysUntil(v.insurance_expiry),
              pollution: daysUntil(v.pollution_expiry),
            };
            const validDays = Object.values(renewalDays).filter(
              (d): d is number => d !== null
            );
            const worstDays = validDays.length ? Math.min(...validDays) : null;
            const borderColor =
              worstDays === null || worstDays > 15
                ? "border-gray-100"
                : worstDays < 0
                ? "border-red-200"
                : "border-yellow-200";

            return (
              <Card
                key={v.id}
                className={`border shadow-sm hover:shadow-md transition-shadow ${borderColor}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                        <Car className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-mono font-bold text-gray-900">{v.vehicle_number}</p>
                        <p className="text-xs text-gray-500">
                          {[
                            v.year,
                            v.brand,
                            v.model,
                            VEHICLE_TYPE_LABELS[v.vehicle_type],
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                    </div>
                    <Badge className="text-[10px] bg-gray-100 text-gray-600 hover:bg-gray-100 border-0">
                      {v.province}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <RenewalChip label="Tax" days={renewalDays.tax} />
                    <RenewalChip label="Bluebook" days={renewalDays.bluebook} />
                    <RenewalChip label="Insurance" days={renewalDays.insurance} />
                    <RenewalChip label="Pollution" days={renewalDays.pollution} />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-8 text-xs border-gray-200 gap-1.5"
                      onClick={() => openEditModal(v)}
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-8 text-xs border-gray-200 gap-1.5 text-red-500 hover:text-red-600 hover:border-red-200"
                      onClick={() => setDeleteId(v.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Add card */}
          <Card
            className="border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer group shadow-none"
            onClick={openAddModal}
          >
            <CardContent className="p-5 flex flex-col items-center justify-center h-full min-h-[200px]">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center mb-3 transition-colors">
                <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <p className="font-semibold text-gray-500 group-hover:text-blue-600 text-sm transition-colors">
                Add a vehicle
              </p>
              <p className="text-xs text-gray-400 mt-1">Track its renewals automatically</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add / Edit dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editVehicle ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 mt-1">
            {formError && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {formError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label className="text-sm font-medium text-gray-700">Vehicle Number *</Label>
                <Input
                  placeholder="BA 1 JA 1234"
                  className="mt-1.5 h-10 border-gray-200 uppercase"
                  value={formData.vehicle_number}
                  onChange={(e) => updateField("vehicle_number", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Vehicle Type *</Label>
                <Select
                  value={formData.vehicle_type}
                  onValueChange={(v) => updateField("vehicle_type", v)}
                >
                  <SelectTrigger className="mt-1.5 h-10 border-gray-200">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {VEHICLE_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {VEHICLE_TYPE_LABELS[t]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Province *</Label>
                <Select
                  value={formData.province}
                  onValueChange={(v) => updateField("province", v)}
                >
                  <SelectTrigger className="mt-1.5 h-10 border-gray-200">
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {NEPAL_PROVINCES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Brand</Label>
                <Input
                  placeholder="Toyota, Honda..."
                  className="mt-1.5 h-10 border-gray-200"
                  value={formData.brand}
                  onChange={(e) => updateField("brand", e.target.value)}
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Model</Label>
                <Input
                  placeholder="Corolla, CB Shine..."
                  className="mt-1.5 h-10 border-gray-200"
                  value={formData.model}
                  onChange={(e) => updateField("model", e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <Label className="text-sm font-medium text-gray-700">Year</Label>
                <Input
                  type="number"
                  placeholder={String(new Date().getFullYear())}
                  min="1980"
                  max={String(new Date().getFullYear() + 1)}
                  className="mt-1.5 h-10 border-gray-200"
                  value={formData.year}
                  onChange={(e) => updateField("year", e.target.value)}
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Renewal Dates
              </p>
              <div className="grid grid-cols-2 gap-4">
                {RENEWAL_FIELDS.map(({ label, field }) => (
                  <div key={field}>
                    <Label className="text-sm font-medium text-gray-700">{label}</Label>
                    <Input
                      type="date"
                      className="mt-1.5 h-10 border-gray-200"
                      value={formData[field]}
                      onChange={(e) => updateField(field, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="pt-2">
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
                {saving ? "Saving..." : editVehicle ? "Save changes" : "Add vehicle"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Remove vehicle?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            This will permanently delete the vehicle and all its renewal data. This action cannot
            be undone.
          </p>
          <DialogFooter className="pt-2">
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
