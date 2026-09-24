import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/lib/data';
import { ArrowLeft, Clock, Calendar, User, Share2, Link as LinkIcon } from 'lucide-react';
import CTASection from '@/components/sections/CTASection';
import PageHero from '@/components/ui/PageHero';

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
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={`By ${article.author.name} · ${article.publishedAt} · ${article.readingTime}`}
        breadcrumb={[
          { label: 'Stories & Insights', href: '/stories' },
          { label: article.title }
        ]}
      />

      {/* Main Content Area */}
      <article className="py-16 lg:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Featured Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#3B214F]">
          <Image src={article.featuredImageUrl} alt={article.title} fill className="object-cover" />
        </div>

        {/* Article Meta Bar & Social Sharing */}
        <div className="flex flex-wrap items-center justify-between gap-6 py-4 border-y border-[#E8DDF0]">
          <div className="flex items-center gap-4 text-xs text-[#716A73]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#6E3A82]" />
              <span>{article.publishedAt}</span>
            </div>
            <span>&middot;</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#6E3A82]" />
              <span>{article.readingTime}</span>
            </div>
          </div>

          {/* Social Sharing Buttons */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#6E3A82] uppercase tracking-wider flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share:</span>
            </span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-[#E8DDF0] flex items-center justify-center text-[#3B214F] hover:bg-[#6E3A82] hover:text-white transition-colors"
              title="Share on Twitter/X"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-[#E8DDF0] flex items-center justify-center text-[#3B214F] hover:bg-[#6E3A82] hover:text-white transition-colors"
              title="Share on Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-[#E8DDF0] flex items-center justify-center text-[#3B214F] hover:bg-[#6E3A82] hover:text-white transition-colors"
              title="Share on LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="prose prose-lg text-[#242024] leading-relaxed space-y-6 max-w-none">
          {article.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-base sm:text-lg text-[#716A73] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8DDF0] shadow-sm flex flex-col sm:flex-row items-center gap-6">
          {article.author.avatarUrl && (
            <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#6E3A82] shadow-sm">
              <Image src={article.author.avatarUrl} alt={article.author.name} fill className="object-cover" />
            </div>
          )}
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6E3A82]">WRITTEN BY</span>
            <h4 className="font-serif text-xl font-bold text-[#3B214F]">{article.author.name}</h4>
            <p className="text-xs text-[#716A73] font-medium">{article.author.role}</p>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="pt-12 border-t border-[#E8DDF0] space-y-8">
            <h3 className="font-serif text-2xl font-bold text-[#3B214F]">Related Articles & Insights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/stories/${rel.slug}`}
                  className="group block rounded-2xl overflow-hidden bg-white border border-[#E8DDF0] p-6 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#3B214F] mb-4">
                    <Image src={rel.featuredImageUrl} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#E8DDF0] text-[#6E3A82]">
                    {rel.category}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#3B214F] group-hover:text-[#6E3A82] transition-colors mt-2 leading-snug">
                    {rel.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>

      <CTASection />
    </div>
  );
}
