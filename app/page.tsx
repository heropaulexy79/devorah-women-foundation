import Hero from '@/components/sections/Hero';
import WhoWeAre from '@/components/sections/WhoWeAre';
import MissionVision from '@/components/sections/MissionVision';
import ProgramsGrid from '@/components/sections/ProgramsGrid';
import ImpactStrip from '@/components/sections/ImpactStrip';
import TestimonialsEditorial from '@/components/sections/TestimonialsEditorial';
import LatestNews from '@/components/sections/LatestNews';
import FeaturedResource from '@/components/sections/FeaturedResource';
import PartnerWithUs from '@/components/sections/PartnerWithUs';
import CTASection from '@/components/sections/CTASection';

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

      {/* 5. Our Impact */}
      <ImpactStrip />

      {/* 6. Testimonials */}
      <TestimonialsEditorial />

      {/* 7. Latest News & Articles */}
      <LatestNews />

      {/* 8. Featured Resource */}
      <FeaturedResource />

      {/* 9. Partner With Us */}
      <PartnerWithUs />

      {/* 10. Final Call to Action */}
      <CTASection />
    </>
  );
}

