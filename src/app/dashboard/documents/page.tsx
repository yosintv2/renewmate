import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Eye, Download, Lock, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const documents = [
  { id: 1, vehicle: "BA 1 JA 1234", vehicleName: "Toyota Corolla", type: "Bluebook", uploadedAt: "15 Jan 2026", size: "1.2 MB", status: "current" },
  { id: 2, vehicle: "BA 1 JA 1234", vehicleName: "Toyota Corolla", type: "Insurance Certificate", uploadedAt: "10 Mar 2026", size: "856 KB", status: "current" },
  { id: 3, vehicle: "BA 2 CHA 5678", vehicleName: "Honda CB Shine", type: "Bluebook", uploadedAt: "5 Feb 2026", size: "980 KB", status: "current" },
];

const docEmoji: Record<string, string> = {
  Bluebook: "📋",
  "Insurance Certificate": "🛡️",
  "Pollution Certificate": "🌿",
};

const premiumFeatures = [
  "Upload & store bluebook, insurance, pollution certificates",
  "Access documents from any device, anywhere",
  "Share documents instantly with authorities",
  "Automatic document expiry tracking",
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Document Vault</h1>
          <p className="text-gray-500 text-sm mt-0.5">Store and access your vehicle documents securely</p>
        </div>
      </div>

      {/* Premium gate */}
      <div className="bg-white rounded-2xl border-2 border-blue-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-white text-lg">Document Vault</h3>
                <Badge className="bg-white/20 text-white hover:bg-white/20 border-0 text-xs">Premium</Badge>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                Securely store all your vehicle documents in the cloud. Access them anytime — from home or from the road.
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            {premiumFeatures.map((f) => (
              <div key={f} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">{f}</span>
              </div>
            ))}
          </div>
          <Link
            href="/dashboard/billing"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-blue-200"
          >
            <Zap className="w-4 h-4" />
            Upgrade to Premium — Rs. 99/month
          </Link>
        </div>
      </div>

      {/* Blurred preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">Preview — what you&apos;ll see after upgrading</h2>
          <Badge className="bg-gray-100 text-gray-500 border-0 text-xs">{documents.length} documents</Badge>
        </div>

        <div className="relative">
          {/* Blurred document cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 blur-sm pointer-events-none select-none opacity-70">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{docEmoji[doc.type] ?? "📄"}</div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-[10px] border-0">Current</Badge>
                </div>
                <p className="font-bold text-gray-900 text-sm mb-0.5">{doc.type}</p>
                <p className="text-xs font-mono text-gray-500 mb-0.5">{doc.vehicle}</p>
                <p className="text-xs text-gray-400 mb-4">{doc.vehicleName} · {doc.size}</p>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1 h-8 text-xs border border-gray-200 rounded-lg text-gray-600">
                    <Eye className="w-3 h-3" /> View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 h-8 text-xs border border-gray-200 rounded-lg text-gray-600">
                    <Download className="w-3 h-3" /> Download
                  </button>
                </div>
              </div>
            ))}

            {/* Upload placeholder */}
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl min-h-[160px] flex flex-col items-center justify-center gap-2 p-4">
              <Upload className="w-6 h-6 text-gray-300" />
              <p className="text-sm text-gray-400">Upload document</p>
            </div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8 text-center max-w-xs w-full mx-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <p className="font-bold text-gray-900 mb-1 text-lg">Unlock Document Vault</p>
              <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                Upgrade to Premium to store and access your vehicle documents securely from anywhere.
              </p>
              <Link
                href="/dashboard/billing"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
              >
                Upgrade now — Rs. 99/month
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
