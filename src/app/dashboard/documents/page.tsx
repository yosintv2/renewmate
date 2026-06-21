import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Eye, Download, Lock, Zap } from "lucide-react";

const documents = [
  {
    id: 1,
    vehicle: "BA 1 JA 1234",
    vehicleName: "Toyota Corolla",
    type: "Bluebook",
    uploadedAt: "15 Jan 2026",
    size: "1.2 MB",
    status: "current",
  },
  {
    id: 2,
    vehicle: "BA 1 JA 1234",
    vehicleName: "Toyota Corolla",
    type: "Insurance Certificate",
    uploadedAt: "10 Mar 2026",
    size: "856 KB",
    status: "current",
  },
  {
    id: 3,
    vehicle: "BA 2 CHA 5678",
    vehicleName: "Honda CB Shine",
    type: "Bluebook",
    uploadedAt: "5 Feb 2026",
    size: "980 KB",
    status: "current",
  },
];

const docTypeIcon: Record<string, string> = {
  Bluebook: "📋",
  "Insurance Certificate": "🛡️",
  "Pollution Certificate": "🌿",
};

export default function DocumentsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Vault</h1>
          <p className="text-gray-500 text-sm mt-1">
            Store and access your vehicle documents securely
          </p>
        </div>
      </div>

      {/* Premium gate */}
      <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 mb-8 shadow-none">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Lock className="w-7 h-7 text-blue-600" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
              <h3 className="font-bold text-gray-900">Document storage requires Premium</h3>
              <Badge className="bg-blue-600 text-white hover:bg-blue-600 text-xs">Premium</Badge>
            </div>
            <p className="text-sm text-gray-500">
              Upgrade to store bluebook, insurance certificates, and pollution certificates securely in the cloud. Access them anytime.
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2 flex-shrink-0">
            <Zap className="w-4 h-4" />
            Upgrade to Premium
          </Button>
        </CardContent>
      </Card>

      {/* Demo documents (blurred to show what premium looks like) */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          Your documents ({documents.length})
        </h2>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 blur-[2px] pointer-events-none select-none opacity-60">
            {documents.map((doc) => (
              <Card key={doc.id} className="border-gray-100 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-2xl">{docTypeIcon[doc.type] ?? "📄"}</div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                      Current
                    </Badge>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm mb-0.5">{doc.type}</p>
                  <p className="text-xs font-mono text-gray-500 mb-1">{doc.vehicle}</p>
                  <p className="text-xs text-gray-400 mb-4">{doc.vehicleName} · {doc.size}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1">
                      <Eye className="w-3 h-3" /> View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1">
                      <Download className="w-3 h-3" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Upload placeholder */}
            <Card className="border-2 border-dashed border-gray-200 shadow-none">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[160px]">
                <Upload className="w-6 h-6 text-gray-300 mb-2" />
                <p className="text-sm text-gray-400">Upload document</p>
              </CardContent>
            </Card>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 text-center max-w-xs">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <p className="font-semibold text-gray-900 mb-1">Unlock Document Vault</p>
              <p className="text-xs text-gray-500 mb-4">
                Upgrade to Premium to store and access your vehicle documents securely.
              </p>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs w-full">
                Upgrade now — Rs. 99/mo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
