import Link from "next/link";
import { Shield, Mail, MessageCircle } from "lucide-react";

const footerLinks = {
  Product: [
    { href: "/#features", label: "Features" },
    { href: "/blog", label: "Blog" },
    { href: "/#faq", label: "FAQ" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-white">
                Renew<span className="text-blue-400">Mate</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-5">
              Track every subscription, bill, and recurring payment in one place. Get reminded before they charge — stay in control of your money.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@renewmate.app"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Email us"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/renewmate"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} RenewMate. All rights reserved.
            </p>
            <span className="text-gray-700 text-xs hidden sm:inline">·</span>
            <p className="text-xs text-gray-600 hidden sm:inline">Free for everyone, forever.</p>
          </div>
          <p className="text-xs text-gray-600 italic">Never Miss a Payment.</p>
        </div>
      </div>
    </footer>
  );
}
