import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import CTASection from '@/components/sections/CTASection';
import { GALLERY_ITEMS } from '@/lib/data';
import { Calendar, MapPin, ArrowLeft, Sparkles, Images } from 'lucide-react';

interface AlbumPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return GALLERY_ITEMS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const { slug } = await params;
  const album = GALLERY_ITEMS.find((item) => item.slug === slug);
  if (!album) {
    return {
      title: 'Album Not Found | Devorah Women Foundation',
    };
  }

  return {
    title: `${album.title} | Devorah Women Foundation Gallery`,
    description: album.caption,
    openGraph: {
      title: `${album.title} | Devorah Women Foundation`,
      description: album.caption,
      images: [album.imageUrl],
    },
  };
}

export default async function AlbumDetailPage({ params }: AlbumPageProps) {
  const { slug } = await params;
  const album = GALLERY_ITEMS.find((item) => item.slug === slug);

  if (!album) {
    notFound();
  }

  const photos = album.photos && album.photos.length > 0
    ? album.photos
    : [{ id: album.id, url: album.imageUrl, caption: album.caption }];

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Header Banner */}
      <PageHero
        eyebrow={`${album.category} ARCHIVE`}
        title={album.title}
        description={album.caption}
        breadcrumb={[
          { label: 'Media Gallery', href: '/gallery' },
          { label: album.title },
        ]}
      />

      {/* Album Metadata & Narrative Header */}
      <section className="py-12 bg-white border-b border-[#E8DDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-4 text-xs text-[#6E3A82] font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#A987C2]" />
                {album.location}
              </span>
              <span>&middot;</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#A987C2]" />
                {album.date}
              </span>
            </div>

            {album.impactHighlight && (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3B214F] pt-1">
                <Sparkles className="w-4 h-4 text-[#6E3A82]" />
                <span>{album.impactHighlight}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#524C55] font-mono flex items-center gap-1.5">
              <Images className="w-4 h-4 text-[#6E3A82]" />
              {photos.length} Photographs Documented
            </span>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6E3A82] hover:text-[#3B214F] border border-[#E8DDF0] hover:border-[#6E3A82]/40 px-4 py-2 rounded-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Gallery</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Photography Grid Collection */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              className="group bg-white rounded-sm overflow-hidden border border-[#E8DDF0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-[#1a0f22] overflow-hidden">
                <Image
                  src={photo.url}
                  alt={photo.caption || album.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {photo.caption && (
                <div className="p-4 border-t border-[#F4ECF7]">
                  <p className="text-xs text-[#524C55] leading-relaxed italic">
                    "{photo.caption}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
