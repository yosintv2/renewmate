import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts, getBlogPost, getRelatedPosts, BlogSection } from "@/lib/blog";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Calendar, BookOpen, AlertTriangle, Lightbulb } from "lucide-react";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function renderSection(section: BlogSection, idx: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2 key={idx} className="text-xl sm:text-2xl font-bold text-gray-900 mt-10 mb-4">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={idx} className="text-lg font-bold text-gray-900 mt-8 mb-3">
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p key={idx} className="text-gray-600 leading-relaxed mb-4">
          {section.text}
        </p>
      );
    case "ul":
      return (
        <ul key={idx} className="space-y-2 mb-6">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={idx} className="space-y-3 mb-6">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <div key={idx} className="my-6 flex gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">Pro Tip</p>
            <p className="text-sm text-blue-700 leading-relaxed">{section.text}</p>
          </div>
        </div>
      );
    case "warning":
      return (
        <div key={idx} className="my-6 flex gap-3 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-yellow-900 mb-1">Important</p>
            <p className="text-sm text-yellow-700 leading-relaxed">{section.text}</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(params.slug, 3);
  const postIndex = blogPosts.findIndex((p) => p.slug === params.slug);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {formatDate(post.date)}
            </span>
          </div>

          <div className="flex items-start gap-5 mb-6">
            <span className="text-5xl sm:text-6xl">{post.coverEmoji}</span>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
          </div>

          <p className="text-lg text-gray-500 leading-relaxed border-l-4 border-blue-400 pl-5 py-1">
            {post.excerpt}
          </p>
        </header>

        {/* Divider */}
        <hr className="border-gray-100 mb-8" />

        {/* Content */}
        <article className="prose-sm">
          {post.content.map((section, idx) => renderSection(section, idx))}
        </article>

        {/* CTA */}
        <div className="mt-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-center">
          <BookOpen className="w-8 h-8 text-blue-200 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">
            Track all your vehicle renewals in one place
          </h3>
          <p className="text-blue-200 text-sm mb-5">
            RenewMate reminds you before every tax, bluebook, insurance, and pollution test deadline. Free to start.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Get started free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Prev / Next */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group flex flex-col gap-1 p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-all"
            >
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Previous
              </span>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 line-clamp-2">
                {prevPost.title}
              </span>
            </Link>
          ) : <div />}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group flex flex-col gap-1 p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-all text-right"
            >
              <span className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                Next <ArrowRight className="w-3 h-3" />
              </span>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          ) : <div />}
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">More articles</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="text-4xl mb-3">{p.coverEmoji}</div>
                  <p className="text-xs font-semibold text-blue-600 mb-1">{p.category}</p>
                  <h4 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                    {p.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
