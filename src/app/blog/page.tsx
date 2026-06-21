import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

const categoryColors: Record<string, string> = {
  Guide: "bg-blue-100 text-blue-700",
  Insurance: "bg-green-100 text-green-700",
  Tips: "bg-yellow-100 text-yellow-700",
  Knowledge: "bg-purple-100 text-purple-700",
  "Electric Vehicles": "bg-emerald-100 text-emerald-700",
  "Road Safety": "bg-red-100 text-red-700",
  Costs: "bg-orange-100 text-orange-700",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
            <BookOpen className="w-4 h-4" />
            RenewMate Blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Nepal Vehicle Renewal<br className="hidden sm:block" /> Knowledge Base
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Guides, tips, and resources to help every Nepal vehicle owner stay on top of renewals, understand the law, and never pay a late fee again.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group block mb-14"
        >
          <div className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-200 transition-all duration-300">
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 text-white`}>
                  {featured.category}
                </span>
                <span className="text-xs text-blue-200 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {featured.readTime}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug group-hover:underline underline-offset-2">
                {featured.title}
              </h2>
              <p className="text-blue-200 text-sm leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-300">{formatDate(featured.date)}</span>
                <span className="inline-flex items-center gap-1.5 text-white text-sm font-semibold group-hover:gap-3 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center bg-white/10 p-10">
              <span className="text-9xl">{featured.coverEmoji}</span>
            </div>
          </div>
        </Link>

        {/* All posts grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200"
              >
                {/* Card top */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-10 text-6xl">
                  {post.coverEmoji}
                </div>
                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${categoryColors[post.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {post.category}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                    <span className="text-xs font-semibold text-blue-600 group-hover:gap-2 flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Never miss a vehicle renewal
          </h3>
          <p className="text-blue-200 mb-6 max-w-lg mx-auto">
            RenewMate tracks all your renewal dates and sends you reminders before every deadline. Free for up to 2 vehicles.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Start for free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
