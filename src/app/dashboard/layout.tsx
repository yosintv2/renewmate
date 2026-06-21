import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-60">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-8 sticky top-0 z-30">
          <p className="text-xs text-gray-400">{dateStr}</p>
        </header>

        {/* Page content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
