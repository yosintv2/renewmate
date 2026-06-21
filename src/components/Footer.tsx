import Link from "next/link";
import { Shield } from "lucide-react";

const footerLinks = {
  Product: [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "/changelog", label: "Changelog" },
    { href: "/roadmap", label: "Roadmap" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-white">
                Renew<span className="text-blue-400">Mate</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Nepal&apos;s trusted vehicle renewal reminder platform. Never pay a late fee again.
            </p>
            <p className="text-xs mt-4 text-gray-600">
              Built with care in Nepal 🇳🇵
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} RenewMate. All rights reserved.
          </p>
          <p className="text-xs">Never Miss a Renewal.</p>
        </div>
      </div>
    </footer>
  );
}
