"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, Shield, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { CurrencyProvider, useCurrency, CURRENCIES } from "@/lib/currency";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function CurrencySelector() {
  const { code, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors"
      >
        {code}
        <ChevronDown className="w-3 h-3" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm max-h-[80vh] flex flex-col" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Choose Currency</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto -mx-6 px-6 py-2">
            <div className="space-y-0.5">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => { setCurrency(c.code); setOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-colors ${
                    code === c.code
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold w-8 text-center">{c.symbol}</span>
                    <div>
                      <p className="text-sm font-semibold leading-none">{c.code}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{c.label}</p>
                    </div>
                  </div>
                  {code === c.code && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        <header className="h-14 bg-white border-b border-gray-100 flex items-center px-4 sm:px-6 sticky top-0 z-20 gap-3">
          <button
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="lg:hidden flex items-center gap-1.5 font-bold text-base">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-gray-900">Renew<span className="text-blue-600">Mate</span></span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <CurrencySelector />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <Shell>{children}</Shell>
    </CurrencyProvider>
  );
}
