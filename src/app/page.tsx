import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
} from "lucide-react";

const features = [
  {
    icon: Bell,
    title: "Smart Renewal Reminders",
    description:
      "Get notified 30, 15, 7, 3, and 1 day before every renewal. Via email, push notification, or Telegram — your choice.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: LayoutDashboard,
    title: "Unified Dashboard",
    description:
      "See all your vehicles and renewal status at a glance. Expired, expiring soon, and up-to-date — organized and clear.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: FileText,
    title: "Document Vault",
    description:
      "Store bluebook, insurance, and pollution certificates securely in the cloud. Access them anytime, anywhere.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Shield,
    title: "Track All 4 Renewals",
    description:
      "Vehicle tax, bluebook renewal, insurance expiry, and pollution test — all tracked in one place so nothing falls through the cracks.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Car,
    title: "Multi-Vehicle Support",
    description:
      "Manage your entire household fleet from one account. Add bikes, cars, jeeps, vans, or trucks.",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: Zap,
    title: "Fleet Management",
    description:
      "Built for taxi operators, delivery companies, and schools. Get fleet-wide reports and never let a vehicle go overdue.",
    color: "bg-yellow-50 text-yellow-600",
  },
];

const plans = [
  {
    name: "Free",
    price: "Free",
    period: "",
    description: "Perfect for individual vehicle owners getting started.",
    features: [
      "Up to 2 vehicles",
      "Basic renewal reminders",
      "Email notifications",
      "Web dashboard",
    ],
    cta: "Get started free",
    href: "/register",
    highlight: false,
  },
  {
    name: "Premium",
    price: "Rs. 99",
    period: "/month",
    annualNote: "or Rs. 999/year (save 16%)",
    description: "For serious vehicle owners who want full control.",
    features: [
      "Unlimited vehicles",
      "Push notifications",
      "Telegram notifications",
      "Document vault (cloud storage)",
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
    a: "RenewMate tracks all four critical renewal dates: vehicle tax, bluebook renewal, insurance expiry, and pollution test certificate. You will never miss any of them.",
  },
  {
    q: "How do reminders work?",
    a: "We send you reminders at 30, 15, 7, 3, and 1 day before each renewal deadline. You can receive them via email (Free), push notification, or Telegram (Premium).",
  },
  {
    q: "Is my data secure?",
    a: "Yes. All data is encrypted and stored securely on Supabase (PostgreSQL). Your documents are stored in private cloud storage accessible only by you.",
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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 text-sm px-4 py-1.5 rounded-full">
            Built for Nepal 🇳🇵 — Trusted by 2,000+ vehicle owners
          </Badge>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Never Miss a{" "}
            <span className="text-blue-600">Vehicle Renewal</span>
            {" "}Again.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Track vehicle tax, bluebook, insurance, and pollution test renewals for all your vehicles.
            Get timely reminders, store documents securely, and avoid costly late fees — all from one dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-base px-8 h-12 rounded-xl shadow-lg shadow-blue-100"
              asChild
            >
              <Link href="/register">
                Start for free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 h-12 rounded-xl border-gray-200"
              asChild
            >
              <Link href="#features">See how it works</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            {["No credit card required", "Free plan forever", "Set up in 2 minutes"].map(
              (t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {t}
                </span>
              )
            )}
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 relative">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200 p-6 overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-gray-400 font-mono">renewmate.com/dashboard</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Vehicles", value: "4", icon: Car, color: "text-blue-600" },
                { label: "Expiring Soon", value: "2", icon: Clock, color: "text-yellow-600" },
                { label: "Expired", value: "1", icon: AlertTriangle, color: "text-red-500" },
                { label: "All Good", value: "1", icon: CheckCircle2, color: "text-green-600" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700">Renewal Status</h3>
              {[
                { plate: "BA 1 JA 1234", type: "Car", item: "Bluebook Renewal", label: "Tomorrow!", color: "bg-red-50 border-red-200" },
                { plate: "BA 2 CHA 5678", type: "Bike", item: "Vehicle Tax", label: "14 days", color: "bg-yellow-50 border-yellow-200" },
                { plate: "GA 3 NA 9876", type: "Jeep", item: "Pollution Test", label: "Expired 3d ago", color: "bg-red-50 border-red-200" },
                { plate: "BA 4 DA 4321", type: "Scooter", item: "Insurance Expiry", label: "45 days", color: "bg-green-50 border-green-200" },
              ].map((v) => (
                <div
                  key={v.plate}
                  className={`flex items-center justify-between p-3 rounded-xl border ${v.color} text-sm`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold text-gray-800 bg-white px-2 py-0.5 rounded border text-xs">{v.plate}</span>
                    <span className="text-gray-500 text-xs">{v.type}</span>
                    <span className="font-medium text-gray-700">{v.item}</span>
                  </div>
                  <span className="font-semibold text-xs text-gray-700">{v.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-100">
            Everything you need
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Stop losing money to late fees
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            RenewMate gives you complete visibility over every vehicle renewal deadline — so you
            always know what is coming before it is too late.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-100">
              Simple setup
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Up and running in 2 minutes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Add your vehicles",
                desc: "Enter your vehicle number, type, province, and renewal dates. Takes under a minute per vehicle.",
                icon: Car,
              },
              {
                step: "02",
                title: "We track the deadlines",
                desc: "RenewMate monitors your tax, bluebook, insurance, and pollution test expiry dates automatically.",
                icon: Clock,
              },
              {
                step: "03",
                title: "Get timely reminders",
                desc: "Receive alerts 30, 15, 7, 3, and 1 day before each renewal — via email, push, or Telegram.",
                icon: Bell,
              },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-100">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-xs font-mono text-blue-600 font-bold mb-2">{step.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Works for every vehicle type
          </h2>
          <p className="text-gray-500">Whether you own one bike or a fleet of trucks, RenewMate has you covered.</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {[
            { label: "Bikes", icon: Bike },
            { label: "Scooters", icon: Bike },
            { label: "Cars", icon: Car },
            { label: "Jeeps", icon: Car },
            { label: "Vans", icon: Truck },
            { label: "Trucks", icon: Truck },
            { label: "Fleets", icon: Users },
          ].map((v) => (
            <div key={v.label} className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all">
              <v.icon className="w-6 h-6 text-gray-600" />
              <span className="text-xs font-medium text-gray-600">{v.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Nepal vehicle owners</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Ramesh Shrestha",
                role: "Car owner, Kathmandu",
                text: "I used to forget my bluebook renewal every year and pay the fine. RenewMate reminded me 2 weeks before — saved me Rs. 2,000 on the first try.",
                stars: 5,
              },
              {
                name: "Sita Tamang",
                role: "Taxi operator, Pokhara",
                text: "I manage 8 taxis. Keeping track of insurance for all of them was a nightmare. The fleet dashboard makes it easy — I see everything at once.",
                stars: 5,
              },
              {
                name: "Bikash Gurung",
                role: "Bike owner, Lalitpur",
                text: "Simple, fast, and useful. I got a Telegram reminder for my pollution test and renewed it the same day. Never been this organised.",
                stars: 5,
              },
            ].map((review) => (
              <Card key={review.name} className="border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-100">
            Simple pricing
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Start free. Upgrade anytime.</h2>
          <p className="text-lg text-gray-500">No hidden fees. No surprises. Cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden ${
                plan.highlight
                  ? "border-blue-500 shadow-xl shadow-blue-100 scale-[1.02]"
                  : "border-gray-200"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />
              )}
              <CardContent className="p-6">
                {plan.highlight && (
                  <Badge className="mb-3 bg-blue-600 text-white hover:bg-blue-600 text-xs">
                    Most popular
                  </Badge>
                )}
                <div className="mb-1 font-bold text-gray-900 text-lg">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                {"annualNote" in plan && (
                  <div className="text-xs text-green-600 font-medium mb-3">{plan.annualNote}</div>
                )}
                <p className="text-sm text-gray-500 mb-6">{plan.description}</p>

                <Button
                  className={`w-full mb-6 ${
                    plan.highlight
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border border-gray-200 bg-white hover:bg-gray-50 text-gray-900"
                  }`}
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-white rounded-xl border border-gray-200 p-5 cursor-pointer"
              >
                <summary className="flex justify-between items-center font-semibold text-gray-900 list-none">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-blue-600 rounded-3xl p-16 shadow-2xl shadow-blue-200">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to stop paying late fees?
          </h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Join 2,000+ Nepal vehicle owners who never miss a renewal deadline. Free to start, no credit card needed.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 text-base px-8 h-12 rounded-xl font-semibold shadow-lg"
            asChild
          >
            <Link href="/register">
              Get started for free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
