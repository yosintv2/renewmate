import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Bell,
  FileText,
  LayoutDashboard,
  Shield,
  CheckCircle2,
  ArrowRight,
  Car,
  Bike,
  Truck,
  AlertTriangle,
  Clock,
  ChevronDown,
  Star,
  Zap,
  Users,
  BookOpen,
} from "lucide-react";
import { blogPosts } from "@/lib/blog";

const features = [
  {
    icon: Bell,
    title: "Smart Renewal Reminders",
    description:
      "Get notified 30, 15, 7, 3, and 1 day before every renewal via email, push notification, or Telegram.",
    gradient: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
  },
  {
    icon: LayoutDashboard,
    title: "Unified Dashboard",
    description:
      "See all vehicles and their renewal status at a glance — expired, expiring soon, and all clear.",
    gradient: "from-green-500 to-emerald-700",
    bg: "bg-green-50",
  },
  {
    icon: FileText,
    title: "Document Vault",
    description:
      "Store bluebook, insurance, and pollution certificates securely in the cloud. Access anytime, anywhere.",
    gradient: "from-purple-500 to-violet-700",
    bg: "bg-purple-50",
  },
  {
    icon: Shield,
    title: "Track All 4 Renewals",
    description:
      "Vehicle tax, bluebook, insurance, and pollution test — all tracked in one place, nothing falls through the cracks.",
    gradient: "from-orange-500 to-red-600",
    bg: "bg-orange-50",
  },
  {
    icon: Car,
    title: "Multi-Vehicle Support",
    description:
      "Manage your entire household fleet from one account. Add bikes, cars, jeeps, vans, or trucks.",
    gradient: "from-red-500 to-pink-600",
    bg: "bg-red-50",
  },
  {
    icon: Zap,
    title: "Fleet Management",
    description:
      "Built for taxi operators, delivery companies, and schools. Fleet-wide reports and never let a vehicle go overdue.",
    gradient: "from-yellow-500 to-amber-600",
    bg: "bg-yellow-50",
  },
];

const plans = [
  {
    name: "Free",
    price: "Free",
    period: "",
    description: "Perfect for individual owners getting started.",
    features: ["Up to 2 vehicles", "Basic renewal reminders", "Email notifications", "Web dashboard"],
    cta: "Get started free",
    href: "/register",
    highlight: false,
  },
  {
    name: "Premium",
    price: "Rs. 99",
    period: "/month",
    annualNote: "or Rs. 999/year (save 16%)",
    description: "For serious owners who want full control.",
    features: [
      "Unlimited vehicles",
      "Push notifications",
      "Telegram notifications",
      "Document vault",
      "Priority reminders",
      "Renewal history",
    ],
    cta: "Start Premium",
    href: "/register?plan=premium",
    highlight: true,
  },
  {
    name: "Fleet",
    price: "Rs. 999",
    period: "/month",
    description: "For businesses managing multiple vehicles.",
    features: [
      "Unlimited vehicles",
      "Fleet dashboard",
      "Monthly reports",
      "Team member access",
      "Priority support",
      "All Premium features",
    ],
    cta: "Contact sales",
    href: "/contact",
    highlight: false,
  },
];

const faqs = [
  {
    q: "What renewal dates can RenewMate track?",
    a: "RenewMate tracks all four critical renewal dates: vehicle tax, bluebook renewal, insurance expiry, and pollution test certificate.",
  },
  {
    q: "How do reminders work?",
    a: "We send reminders at 30, 15, 7, 3, and 1 day before each renewal deadline via email (Free), push notification, or Telegram (Premium).",
  },
  {
    q: "Is my data secure?",
    a: "Yes. All data is encrypted and stored securely on Supabase (PostgreSQL). Documents are in private cloud storage accessible only by you.",
  },
  {
    q: "Can I manage multiple vehicles?",
    a: "Free plan supports up to 2 vehicles. Premium and Fleet plans support unlimited vehicles.",
  },
  {
    q: "Which payment methods are accepted?",
    a: "We accept eSewa, Khalti, and international cards via Stripe.",
  },
];

const stats = [
  { label: "Vehicle owners served", value: "2,000+" },
  { label: "Renewals tracked", value: "12,000+" },
  { label: "Late fees prevented", value: "Rs. 4L+" },
  { label: "Uptime", value: "99.9%" },
];

const testimonials = [
  {
    name: "Ramesh Shrestha",
    role: "Car owner, Kathmandu",
    text: "I used to forget my bluebook renewal every year and pay the fine. RenewMate reminded me 2 weeks before — saved me Rs. 2,000 on the first try.",
    avatar: "RS",
    avatarColor: "bg-blue-500",
    stars: 5,
  },
  {
    name: "Sita Tamang",
    role: "Taxi operator, Pokhara",
    text: "I manage 8 taxis. Keeping track of insurance for all of them was a nightmare. The fleet dashboard makes it easy — I see everything at once.",
    avatar: "ST",
    avatarColor: "bg-purple-500",
    stars: 5,
  },
  {
    name: "Bikash Gurung",
    role: "Bike owner, Lalitpur",
    text: "Simple, fast, and useful. Got a Telegram reminder for my pollution test and renewed it the same day. Never been this organised.",
    avatar: "BG",
    avatarColor: "bg-green-500",
    stars: 5,
  },
];

const recentPosts = blogPosts.slice(0, 3);

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 rounded-full mb-6 border border-blue-200">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Built for Nepal 🇳🇵 — Trusted by 2,000+ vehicle owners
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-5 tracking-tight">
            Never Miss a<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Vehicle Renewal
            </span>{" "}
            Again.
          </h1>

          <p className="text-base sm:text-xl text-gray-500 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Track vehicle tax, bluebook, insurance, and pollution test renewals for all your vehicles. Get timely reminders and avoid costly late fees — all from one dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10 sm:mb-14">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-6 sm:px-8 py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#features"
              className="inline-flex items-center justify-center gap-2 text-base font-semibold text-gray-700 border border-gray-200 px-6 sm:px-8 py-3.5 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              See how it works
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-gray-500">
            {["No credit card required", "Free plan forever", "Set up in 2 minutes"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="mt-14 sm:mt-20 max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 rounded-3xl -z-10 blur-xl opacity-80" />
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-2xl shadow-gray-300/50 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-100">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-3 flex-1 bg-white rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-400 font-mono max-w-xs">
                renewmate.vercel.app/dashboard
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { label: "Total Vehicles", value: "4", icon: Car, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Expiring Soon", value: "2", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
                  { label: "Expired", value: "1", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
                  { label: "All Good", value: "1", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100 shadow-sm">
                    <div className={`w-8 h-8 rounded-xl ${stat.bg} flex items-center justify-center mb-2`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Vehicle list */}
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-gray-500 mb-3">Renewal Status</p>
                {[
                  { plate: "BA 1 JA 1234", type: "Car", item: "Bluebook Renewal", label: "Tomorrow!", color: "border-red-200 bg-red-50 text-red-700" },
                  { plate: "BA 2 CHA 5678", type: "Bike", item: "Vehicle Tax", label: "14 days", color: "border-yellow-200 bg-yellow-50 text-yellow-700" },
                  { plate: "GA 3 NA 9876", type: "Jeep", item: "Pollution Test", label: "Expired 3d ago", color: "border-red-200 bg-red-50 text-red-700" },
                  { plate: "BA 4 DA 4321", type: "Scooter", item: "Insurance Expiry", label: "45 days", color: "border-green-200 bg-green-50 text-green-700" },
                ].map((v) => (
                  <div
                    key={v.plate}
                    className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm ${v.color.split(" ").slice(0, 2).join(" ")} border-opacity-60`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <span className="font-mono font-semibold text-gray-800 bg-white px-1.5 py-0.5 rounded border text-[10px] sm:text-xs shrink-0">
                        {v.plate}
                      </span>
                      <span className="text-gray-400 text-[10px] hidden sm:inline">{v.type}</span>
                      <span className="font-medium text-gray-700 truncate">{v.item}</span>
                    </div>
                    <span className={`font-bold text-[10px] sm:text-xs shrink-0 ml-2 ${v.color.split(" ")[2]}`}>
                      {v.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">
              Everything you need
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Stop losing money to late fees
            </h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
              Complete visibility over every vehicle renewal deadline — so you always know what&apos;s coming before it&apos;s too late.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 sm:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">
              Simple setup
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Up and running in 2 minutes
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-12 relative">
            {/* Connection line */}
            <div className="hidden sm:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-blue-300 bg-dashed" />

            {[
              {
                step: "01",
                title: "Add your vehicles",
                desc: "Enter vehicle number, type, province, and renewal dates. Takes under a minute per vehicle.",
                icon: Car,
                color: "from-blue-600 to-blue-700",
              },
              {
                step: "02",
                title: "We track the deadlines",
                desc: "RenewMate monitors your tax, bluebook, insurance, and pollution test expiry dates automatically.",
                icon: Clock,
                color: "from-indigo-600 to-purple-700",
              },
              {
                step: "03",
                title: "Get timely reminders",
                desc: "Receive alerts 30, 15, 7, 3, and 1 day before each renewal via email, push, or Telegram.",
                icon: Bell,
                color: "from-green-600 to-emerald-700",
              },
            ].map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-xl`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-xs font-mono text-blue-600 font-bold mb-2 tracking-widest">{step.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vehicle types ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Works for every vehicle type
            </h2>
            <p className="text-gray-500">Whether you own one bike or a fleet of trucks, RenewMate has you covered.</p>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
            {[
              { label: "Bikes", icon: Bike },
              { label: "Scooters", icon: Bike },
              { label: "Cars", icon: Car },
              { label: "Jeeps", icon: Car },
              { label: "Vans", icon: Truck },
              { label: "Trucks", icon: Truck },
              { label: "Fleets", icon: Users },
            ].map((v) => (
              <div
                key={v.label}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all cursor-default group"
              >
                <v.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                <span className="text-[10px] sm:text-xs font-medium text-gray-500 group-hover:text-blue-700 transition-colors">{v.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Trusted by Nepal vehicle owners
            </h2>
            <p className="text-gray-500">Join thousands who never miss a renewal deadline.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((review) => (
              <div key={review.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${review.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">
              Simple pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Start free. Upgrade anytime.
            </h2>
            <p className="text-base sm:text-lg text-gray-500">No hidden fees. No surprises. Cancel anytime.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl overflow-hidden border ${
                  plan.highlight
                    ? "border-blue-500 shadow-2xl shadow-blue-100 scale-[1.03]"
                    : "border-gray-200"
                } bg-white`}
              >
                {plan.highlight && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        MOST POPULAR
                      </span>
                    </div>
                  </>
                )}
                <div className="p-6">
                  <div className="font-bold text-gray-900 text-xl mb-1">{plan.name}</div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 text-sm">{plan.period}</span>
                  </div>
                  {"annualNote" in plan && (
                    <div className="text-xs text-green-600 font-semibold mb-3">{plan.annualNote}</div>
                  )}
                  <p className="text-sm text-gray-500 mb-6">{plan.description}</p>

                  <Link
                    href={plan.href}
                    className={`block w-full text-center py-2.5 rounded-xl font-semibold text-sm mb-6 transition-all ${
                      plan.highlight
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200"
                        : "border border-gray-200 hover:bg-gray-50 text-gray-900"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog preview ── */}
      <section className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">From the blog</h2>
              <p className="text-gray-500 text-sm mt-1">Vehicle renewal guides and tips for Nepal owners</p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              All articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-8 text-5xl">
                  {post.coverEmoji}
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-blue-600 mb-1">{post.category}</p>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
              <BookOpen className="w-4 h-4" /> View all articles
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-white rounded-xl border border-gray-200 p-5 cursor-pointer"
              >
                <summary className="flex justify-between items-center font-semibold text-gray-900 list-none text-sm sm:text-base">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-open:rotate-180 flex-shrink-0 ml-4" />
                </summary>
                <p className="mt-3 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-10 sm:p-16 shadow-2xl shadow-blue-300/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/10 rounded-full blur-xl" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to stop paying late fees?
            </h2>
            <p className="text-blue-200 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Join 2,000+ Nepal vehicle owners who never miss a renewal deadline. Free to start, no credit card needed.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 text-base font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
            >
              Get started for free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
