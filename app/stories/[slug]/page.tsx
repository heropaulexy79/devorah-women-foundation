import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/lib/data';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* Header Banner */}
      <section className="py-12 bg-gradient-to-b from-[#F7F3F8] to-[#FAF8F5] border-b border-[#E8DDF0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#6E3A82] hover:text-[#3B214F]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </Link>
          <span className="block px-3 py-1 rounded-full bg-[#E8DDF0] text-[#6E3A82] text-xs font-semibold uppercase tracking-widest w-fit">
            {article.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3B214F] leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#716A73] pt-2 border-t border-[#E8DDF0]">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#6E3A82]" />
              <span className="font-semibold text-[#3B214F]">{article.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#6E3A82]" />
              <span>{article.publishedAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#6E3A82]" />
              <span>{article.readingTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <article className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#3B214F]">
          <Image src={article.featuredImageUrl} alt={article.title} fill className="object-cover" />
        </div>

        <div className="prose prose-lg text-[#242024] leading-relaxed space-y-6 max-w-none">
          {article.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-base sm:text-lg text-[#716A73] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="p-6 rounded-2xl bg-white border border-[#E8DDF0] flex items-center gap-4 mt-12">
          {article.author.avatarUrl && (
            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-[#6E3A82]">
              <Image src={article.author.avatarUrl} alt={article.author.name} fill className="object-cover" />
            </div>
          )}
          <div>
            <h4 className="font-serif text-lg font-bold text-[#3B214F]">{article.author.name}</h4>
            <p className="text-xs text-[#6E3A82] font-semibold">{article.author.role}</p>
          </div>
        </div>
      </article>

      <CTASection />
    </div>
  );
}
