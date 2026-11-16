import Hero from '@/components/sections/Hero';
import WhoWeAre from '@/components/sections/WhoWeAre';
import MissionVision from '@/components/sections/MissionVision';
import ProgramsGrid from '@/components/sections/ProgramsGrid';
import UpcomingEvents from '@/components/sections/UpcomingEvents';
import ImpactStrip from '@/components/sections/ImpactStrip';
import MediaGallery from '@/components/sections/MediaGallery';
import TestimonialsEditorial from '@/components/sections/TestimonialsEditorial';
import LatestNews from '@/components/sections/LatestNews';
import FeaturedResource from '@/components/sections/FeaturedResource';
import PartnerWithUs from '@/components/sections/PartnerWithUs';
import CTASection from '@/components/sections/CTASection';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Who We Are */}
      <WhoWeAre />

      {/* 3. Our Mission */}
      <MissionVision />

      {/* 4. Our Programs */}
      <ProgramsGrid />

      {/* 5. Upcoming Events & Outreaches */}
      <UpcomingEvents />

      {/* 6. Our Impact */}
      <ImpactStrip />

      {/* 7. Outreach & Conference Media Gallery */}
      <MediaGallery limit={2} />
      <div className="bg-[#FCFCF7] pb-16 text-center">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 bg-[#642B80] hover:bg-[#3B214F] text-white px-8 py-3.5 rounded-sm font-semibold text-xs uppercase tracking-widest transition-all shadow-sm"
        >
          <span>Explore Full Photo Gallery</span>
          <span>→</span>
        </Link>
      </div>

      {/* 8. Testimonials */}
      <TestimonialsEditorial />

      {/* 9. Latest News & Articles */}
      <LatestNews />

      {/* 10. Featured Resource */}
      <FeaturedResource />

      {/* 11. Partner With Us */}
      <PartnerWithUs />

      {/* 12. Final Call to Action */}
      <CTASection />
    </>
  );
}

