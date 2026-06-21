import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import AdminTable, { type AdminUser } from "./AdminTable";
import Link from "next/link";
import { Shield, KeyRound, ExternalLink } from "lucide-react";

const ADMIN_EMAIL = "mail.yosintv@gmail.com";

function MissingKeyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-orange-200 shadow-xl p-8 max-w-md w-full text-center">
        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <KeyRound className="w-7 h-7 text-orange-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Service Role Key Missing</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          To view admin data, add your Supabase service role key to your environment variables.
        </p>
        <ol className="text-left space-y-2 text-sm text-gray-700 mb-6">
          <li className="flex gap-2"><span className="font-bold text-blue-600 flex-shrink-0">1.</span> Open your Supabase Dashboard</li>
          <li className="flex gap-2"><span className="font-bold text-blue-600 flex-shrink-0">2.</span> Go to Settings → API</li>
          <li className="flex gap-2"><span className="font-bold text-blue-600 flex-shrink-0">3.</span> Copy the <code className="bg-gray-100 px-1 rounded text-xs">service_role</code> key</li>
          <li className="flex gap-2"><span className="font-bold text-blue-600 flex-shrink-0">4.</span> Add it to <code className="bg-gray-100 px-1 rounded text-xs">.env.local</code> as <code className="bg-gray-100 px-1 rounded text-xs">SUPABASE_SERVICE_ROLE_KEY</code></li>
          <li className="flex gap-2"><span className="font-bold text-blue-600 flex-shrink-0">5.</span> Also add it to your Vercel project's Environment Variables</li>
        </ol>
        <Link
          href="https://supabase.com/dashboard"
          target="_blank"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl transition-colors"
        >
          Open Supabase Dashboard <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default async function AdminPage() {
  // Auth check
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  // Service role key check
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return <MissingKeyPage />;
  }

  // Fetch all users + subscription counts via admin client
  const admin = createAdminClient();

  const [{ data: authData, error }, { data: subscriptions }] = await Promise.all([
    admin.auth.admin.listUsers({ perPage: 1000 }),
    admin.from("subscriptions").select("user_id"),
  ]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center max-w-sm">
          <Shield className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <h2 className="font-bold text-gray-900 mb-2">Failed to load users</h2>
          <p className="text-sm text-gray-500">{error.message}</p>
        </div>
      </div>
    );
  }

  const subCounts: Record<string, number> = {};
  subscriptions?.forEach((s) => {
    subCounts[s.user_id] = (subCounts[s.user_id] ?? 0) + 1;
  });

  const adminUsers: AdminUser[] = (authData?.users ?? []).map((u) => ({
    id: u.id,
    email: u.email ?? "unknown@—",
    created_at: u.created_at,
    last_sign_in_at: u.last_sign_in_at ?? null,
    provider: (u.app_metadata?.provider as string | undefined) ?? "email",
    subscriptions: subCounts[u.id] ?? 0,
  }));

  return <AdminTable users={adminUsers} currentUserEmail={user.email!} />;
}
