import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCTAButtons from "@/components/HeroCTAButtons";
import Link from "next/link";
import {
  Bell,
  LayoutDashboard,
  Shield,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  Zap,
  Globe,
  ChevronDown,
  Star,
  BookOpen,
  Repeat2,
  WalletCards,
  TrendingDown,
} from "lucide-react";
import { blogPosts } from "@/lib/blog";

const features = [
  {
    icon: Bell,
    title: "Smart Payment Reminders",
    description:
      "Get notified 30, 15, 7, 3, and 1 day before every subscription or bill charges. Never get surprised by a payment again.",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    icon: LayoutDashboard,
    title: "All-in-One Dashboard",
    description:
      "See every subscription, bill, and liability at a glance — what's due, what's overdue, and your total monthly spend.",
    gradient: "from-purple-500 to-violet-700",
  },
  {
    icon: WalletCards,
    title: "5 Tracking Categories",
    description:
      "Entertainment, Living Essentials, Tech & Tools, Lifestyle, and Financial Liabilities — every payable tracked in one place.",
    gradient: "from-green-500 to-emerald-700",
  },
  {
    icon: Globe,
    title: "Multi-Currency Support",
    description:
      "Use any of 34 currencies. Switch anytime — USD, EUR, INR, NPR, GBP, SGD, and more. Your currency, your way.",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    icon: TrendingDown,
    title: "Spend Breakdown",
    description:
      "See exactly how much you're spending per category each month and year. Spot subscriptions you've forgotten about.",
    gradient: "from-red-500 to-pink-600",
  },
  {
    icon: Zap,
    title: "Mobile-First Design",
    description:
      "Built for your phone. Add a subscription in seconds, check what's due today, and manage everything on the go.",
    gradient: "from-yellow-500 to-amber-600",
  },
];

const categories = [
  { label: "Entertainment", examples: "Netflix, Spotify, Crunchyroll", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { label: "Living Essentials", examples: "Rent, Electricity, Water", color: "bg-green-100 text-green-700 border-green-200" },
  { label: "Tech & Tools", examples: "iCloud, ChatGPT Plus, Notion", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { label: "Lifestyle", examples: "Gym, Fashion Box, Gaming", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { label: "Financial Liabilities", examples: "Credit Cards, BNPL, Loan EMI", color: "bg-red-100 text-red-700 border-red-200" },
];

const faqs = [
  {
    q: "What can RenewMate track?",
    a: "RenewMate tracks subscriptions, monthly bills, rent, utilities, credit card payments, BNPL installments, loan EMIs, and any other recurring payment you have.",
  },
  {
    q: "How do reminders work?",
    a: "We send email reminders at 30, 15, 7, 3, and 1 day before each payment date. Push and Telegram notifications are coming soon.",
  },
  {
    q: "Is RenewMate free?",
    a: "Yes — completely free. No plans, no limits, no credit card required. We built it to be genuinely helpful, not to upsell you.",
  },
  {
    q: "Which currencies are supported?",
    a: "34 currencies including USD, EUR, GBP, INR, NPR, SGD, JPY, KRW, AUD, CAD, and more. You can switch currency anytime from the dashboard.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. All data is encrypted and stored securely on Supabase (PostgreSQL). Row-level security ensures only you can access your data.",
  },
];

const stats = [
  { label: "Subscriptions tracked", value: "10,000+" },
  { label: "Users worldwide", value: "2,000+" },
  { label: "Categories supported", value: "5" },
  { label: "Currencies supported", value: "34" },
];

const testimonials = [
  {
    name: "Aryan Mehta",
    role: "Student, Mumbai",
    text: "I had no idea I was spending $180/month on subscriptions until I added them all to RenewMate. Cancelled 4 I'd completely forgotten about.",
    avatar: "AM",
    avatarColor: "bg-blue-500",
    stars: 5,
  },
  {
    name: "Sophie Laurent",
    role: "Freelancer, Paris",
    text: "I track my rent, Netflix, Adobe CC, and gym all in one place. The reminder 7 days before my credit card bill is a lifesaver.",
    avatar: "SL",
    avatarColor: "bg-purple-500",
    stars: 5,
  },
  {
    name: "Kai Tanaka",
    role: "Developer, Tokyo",
    text: "Simple, clean, and actually useful. I added all my SaaS tools and now I know exactly what hits my card each month. No more surprises.",
    avatar: "KT",
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 rounded-full mb-6 border border-blue-200">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Free for everyone — no credit card needed
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-5 tracking-tight">
            Never Miss a<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Subscription Payment
            </span>{" "}
            Again.
          </h1>

          <p className="text-base sm:text-xl text-gray-500 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Track every subscription, bill, rent, and financial liability in one place. Get reminded before payments hit — so you&apos;re always in control of your money.
          </p>

          <HeroCTAButtons />

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-gray-500 mt-6">
            {["100% free", "No credit card required", "34 currencies supported"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="mt-14 sm:mt-20 max-w-5xl mx-auto relative">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-2xl shadow-gray-300/50 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-100">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-3 flex-1 bg-white rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-400 font-mono max-w-xs">
                renewmate.app/dashboard
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {/* Dark spend card */}
              <div className="bg-gray-900 rounded-2xl p-5 mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Monthly spend</p>
                  <p className="text-3xl font-bold text-white">$284.50</p>
                  <p className="text-xs text-gray-400 mt-1">$3,414/yr across 12 subscriptions</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-red-500/20 text-red-400 text-xs font-semibold px-2.5 py-1 rounded-full">2 overdue</span>
                </div>
              </div>

              {/* Subscription list */}
              <div className="space-y-2">
                {[
                  { name: "Netflix", cat: "Entertainment", price: "$15.99/mo", days: "Tomorrow!", color: "border-l-purple-400 bg-red-50" },
                  { name: "Rent", cat: "Living Essentials", price: "$950/mo", days: "5 days", color: "border-l-green-400 bg-yellow-50" },
                  { name: "ChatGPT Plus", cat: "Tech & Tools", price: "$20/mo", days: "18 days", color: "border-l-blue-400 bg-white" },
                  { name: "Gym Membership", cat: "Lifestyle", price: "$35/mo", days: "22 days", color: "border-l-orange-400 bg-white" },
                ].map((s) => (
                  <div key={s.name} className={`flex items-center justify-between p-3 rounded-xl border border-gray-100 border-l-4 ${s.color}`}>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.cat} · {s.price}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-500 flex-shrink-0 ml-3">{s.days}</span>
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
              Stop losing money to forgotten payments
            </h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
              The average person wastes $300/year on unused subscriptions. RenewMate keeps you aware so every dollar you spend is intentional.
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

      {/* ── Categories ── */}
      <section className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">
              5 categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Track every type of recurring payment
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From streaming services to rent to BNPL installments — if it repeats, RenewMate tracks it.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <div key={cat.label} className={`border rounded-2xl p-5 ${cat.color}`}>
                <p className="font-bold text-base mb-1">{cat.label}</p>
                <p className="text-sm opacity-75">{cat.examples}</p>
              </div>
            ))}
            <div className="border border-dashed border-gray-300 rounded-2xl p-5 text-gray-400 flex items-center gap-3">
              <Repeat2 className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-gray-600">+ Custom</p>
                <p className="text-xs">Add anything with a custom name</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">
              Simple setup
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Up and running in 2 minutes
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                step: "01",
                title: "Add your subscriptions",
                desc: "Pick a category, choose from presets or type a custom name, set the price and next billing date. Done in seconds.",
                icon: CreditCard,
                color: "from-blue-600 to-blue-700",
              },
              {
                step: "02",
                title: "We track every deadline",
                desc: "RenewMate monitors all your payment dates and calculates your monthly and yearly totals automatically.",
                icon: LayoutDashboard,
                color: "from-indigo-600 to-purple-700",
              },
              {
                step: "03",
                title: "Get timely reminders",
                desc: "Receive alerts 30, 15, 7, 3, and 1 day before each payment via email. Push and Telegram coming soon.",
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

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              People who actually use it
            </h2>
            <p className="text-gray-500">Join thousands who never miss a payment.</p>
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

      {/* ── Blog preview ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">From the blog</h2>
              <p className="text-gray-500 text-sm mt-1">Guides on managing subscriptions and saving money</p>
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
      <section id="faq" className="py-16 sm:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
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
            <Shield className="w-12 h-12 text-blue-300 mx-auto mb-5" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Take control of your subscriptions today
            </h2>
            <p className="text-blue-200 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Free forever. No limits. Add everything — from Netflix to your rent to your credit card bill.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 text-base font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
