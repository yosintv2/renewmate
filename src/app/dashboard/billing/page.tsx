import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CreditCard, Zap, Building2 } from "lucide-react";

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
    ],
    current: false,
    cta: "Upgrade to Fleet",
    highlight: false,
  },
];

const paymentMethods = [
  { name: "eSewa", icon: "🟢" },
  { name: "Khalti", icon: "🟣" },
  { name: "Credit / Debit card", icon: "💳" },
];

export default function BillingPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Plans</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your subscription and payment details</p>
      </div>

      {/* Current plan banner */}
      <Card className="border-gray-100 shadow-sm mb-8 bg-gray-50">
        <CardContent className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                You are on the{" "}
                <span className="text-blue-600">Free plan</span>
              </p>
              <p className="text-sm text-gray-500">
                2 of 2 vehicle slots used · Upgrade to add more vehicles and features.
              </p>
            </div>
          </div>
          <Badge className="bg-gray-200 text-gray-600 hover:bg-gray-200">Free</Badge>
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative overflow-hidden ${
              plan.highlight
                ? "border-blue-400 shadow-lg shadow-blue-50"
                : plan.current
                ? "border-gray-200 bg-gray-50"
                : "border-gray-200"
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
            <CardContent className="p-5">
              {plan.highlight && (
                <Badge className="mb-3 bg-blue-600 text-white hover:bg-blue-600 text-xs">
                  Recommended
                </Badge>
              )}
              {plan.current && (
                <Badge className="mb-3 bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                  Current plan
                </Badge>
              )}
              <p className="font-bold text-gray-900 text-lg">{plan.name}</p>
              <div className="flex items-baseline gap-1 mt-1 mb-1">
                <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>
              {"annualNote" in plan && (
                <p className="text-xs text-green-600 font-medium mb-3">{plan.annualNote}</p>
              )}
              <p className="text-xs text-gray-500 mb-4">{plan.description}</p>

              <Button
                className={`w-full mb-5 h-9 text-sm rounded-xl ${
                  plan.current
                    ? "bg-gray-200 text-gray-500 hover:bg-gray-200 cursor-default"
                    : plan.highlight
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment methods */}
      <Card className="border-gray-100 shadow-sm mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gray-400" />
            Accepted payment methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {paymentMethods.map((m) => (
              <div
                key={m.name}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700"
              >
                <span>{m.icon}</span>
                {m.name}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">Payments are secure and encrypted.</p>
        </CardContent>
      </Card>

      {/* Fleet CTA */}
      <Card className="border-gray-100 shadow-sm bg-gradient-to-r from-gray-900 to-gray-800">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-bold text-white mb-1">Running a transport business?</p>
            <p className="text-sm text-gray-400">
              Fleet plan is built for taxi operators, delivery companies, and schools.
              Get fleet-wide reports and team access.
            </p>
          </div>
          <Button className="bg-white text-gray-900 hover:bg-gray-100 flex-shrink-0">
            Contact sales
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
