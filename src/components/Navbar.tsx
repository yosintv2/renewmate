"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Shield, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loadingHref, setLoadingHref] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (href: string) => {
    setLoadingHref(href);
    router.push(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-900">
              Renew<span className="text-blue-600">Mate</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate("/login")}
              disabled={loadingHref !== null}
              className="inline-flex items-center justify-center gap-2 min-w-[75px] text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors disabled:pointer-events-none"
            >
              {loadingHref === "/login" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
            <button
              onClick={() => navigate("/register")}
              disabled={loadingHref !== null}
              className="inline-flex items-center justify-center gap-2 min-w-[140px] text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors shadow-sm disabled:opacity-90 disabled:pointer-events-none"
            >
              {loadingHref === "/register" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Get started free"
              )}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-300",
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between text-sm font-medium text-gray-700 hover:text-blue-600 py-3 px-3 rounded-xl hover:bg-blue-50 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          ))}
          <div className="pt-3 pb-1 border-t border-gray-100 space-y-2">
            <button
              onClick={() => { setOpen(false); navigate("/login"); }}
              disabled={loadingHref !== null}
              className="w-full inline-flex items-center justify-center text-sm font-medium text-gray-700 border border-gray-200 py-2.5 px-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              {loadingHref === "/login" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
            <button
              onClick={() => { setOpen(false); navigate("/register"); }}
              disabled={loadingHref !== null}
              className="w-full inline-flex items-center justify-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 py-2.5 px-4 rounded-xl transition-colors"
            >
              {loadingHref === "/register" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Get started free"
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
