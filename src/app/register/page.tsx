"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const benefits = [
  "Track vehicle tax, bluebook, insurance & pollution test",
  "Get reminders 30 days before every renewal",
  "Store documents securely in the cloud",
  "Free for up to 2 vehicles — forever",
];

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        // After email confirmation, redirect here
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-500 text-sm mb-6">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
          </p>
          <Link href="/login" className="text-blue-600 text-sm font-medium hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 flex-col justify-between p-12">
        <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-white">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          RenewMate
        </Link>
        <div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Never miss a vehicle renewal again.
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Join 2,000+ Nepal vehicle owners who rely on RenewMate to stay on top of deadlines.
          </p>
          <ul className="space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-white">
                <CheckCircle2 className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                <span className="text-blue-100">{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-blue-300 text-sm">Built with care in Nepal 🇳🇵</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-900">Renew<span className="text-blue-600">Mate</span></span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your free account</h1>
          <p className="text-gray-500 text-sm mb-8">No credit card required. Up to 2 vehicles free.</p>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <Button
              variant="outline"
              type="button"
              className="w-full h-11 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 mb-6"
              onClick={handleGoogleLogin}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs text-gray-400 bg-white px-3">
                or sign up with email
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ramesh Shrestha"
                  className="mt-1.5 h-11 border-gray-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1.5 h-11 border-gray-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  className="mt-1.5 h-11 border-gray-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl mt-2"
                disabled={loading}
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {loading ? "Creating account..." : "Create free account"}
              </Button>

              <p className="text-xs text-gray-400 text-center">
                By signing up you agree to our{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">Terms</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              </p>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-medium hover:text-blue-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
