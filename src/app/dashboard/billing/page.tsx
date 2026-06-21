import { Button } from "@/components/ui/button";
import { CheckCircle2, CreditCard, Zap, Building2, Star } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "Free",
    period: "",
    description: "For individual owners with up to 2 vehicles.",
    features: ["2 vehicles", "Email reminders", "Web dashboard"],
    current: true,
    cta: "Current plan",
    highlight: false,
  },
  {
    name: "Premium",
    price: "Rs. 99",
    period: "/month",
    annualNote: "or Rs. 999/year",
    description: "For individuals who need more vehicles and channels.",
    features: [
      "Unlimited vehicles",
      "Push notifications",
      "Telegram notifications",
      "Document vault",
      "Priority reminders",
      "Renewal history",
    ],
    current: false,
    cta: "Upgrade to Premium",
    highlight: true,
  },
  {
    name: "Fleet",
    price: "Rs. 999",
    period: "/month",
    description: "For businesses with multiple vehicles.",
    features: [
      "Unlimited vehicles",
      "Fleet dashboard & reports",
      "Team member access",
      "All Premium features",
      "Priority support",
    ],
    current: false,
    cta: "Upgrade to Fleet",
    highlight: false,
  },
];

const paymentMethods = [
  { name: "eSewa", emoji: "🟢" },
  { name: "Khalti", emoji: "🟣" },
  { name: "Credit / Debit card", emoji: "💳" },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Billing & Plans</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your subscription and payment details</p>
      </div>

      {/* Current plan banner */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-gray-900 text-sm sm:text-base">
            You are on the <span className="text-blue-600">Free plan</span>
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            2 of 2 vehicle slots used · Upgrade to add more vehicles and unlock premium features.
          </p>
        </div>
        <Link
          href="#plans"
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-md shadow-blue-200 self-start sm:self-auto"
        >
          <Star className="w-3.5 h-3.5" />
          Upgrade now
        </Link>
      </div>

      {/* Plans */}
      <div id="plans" className="grid sm:grid-cols-3 gap-4 sm:gap-5">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border overflow-hidden bg-white ${
              plan.highlight
                ? "border-blue-400 shadow-xl shadow-blue-50"
                : plan.current
                ? "border-gray-200 bg-gray-50/50"
                : "border-gray-200"
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
            )}
            <div className="p-5">
              {plan.highlight && (
                <span className="inline-block text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full mb-3">
                  RECOMMENDED
                </span>
              )}
              {plan.current && (
                <span className="inline-block text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full mb-3">
                  CURRENT PLAN
                </span>
              )}
              <p className="font-bold text-gray-900 text-lg">{plan.name}</p>
              <div className="flex items-baseline gap-1 mt-1 mb-1">
                <span className="text-2xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>
              {"annualNote" in plan && (
                <p className="text-xs text-green-600 font-semibold mb-2">{plan.annualNote}</p>
              )}
              <p className="text-xs text-gray-500 mb-5">{plan.description}</p>

              <Button
                className={`w-full mb-5 h-9 text-sm rounded-xl ${
                  plan.current
                    ? "bg-gray-100 text-gray-400 hover:bg-gray-100 cursor-default"
                    : plan.highlight
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200"
                    : "border border-gray-200 bg-white hover:bg-gray-50 text-gray-900"
                }`}
                disabled={plan.current}
              >
                {plan.cta}
              </Button>

              <ul className="space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Payment methods */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
          <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
            <CreditCard className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">Accepted payment methods</span>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-3">
            {paymentMethods.map((m) => (
              <div
                key={m.name}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700"
              >
                <span>{m.emoji}</span>
                {m.name}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">All payments are secure and encrypted.</p>
        </div>
      </div>

      {/* Fleet CTA */}
      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="font-bold text-white text-lg mb-1">Running a transport business?</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Fleet plan is built for taxi operators, delivery companies, and schools. Get fleet-wide reports and team access.
          </p>
        </div>
        <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-semibold flex-shrink-0">
          Contact sales
        </Button>
      </div>
    </div>
  );
}
