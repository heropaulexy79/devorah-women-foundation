import Hero from '@/components/sections/Hero';
import ImpactStrip from '@/components/sections/ImpactStrip';
import WhoWeAre from '@/components/sections/WhoWeAre';
import MissionVision from '@/components/sections/MissionVision';
import ProgramsGrid from '@/components/sections/ProgramsGrid';
import FeaturedStory from '@/components/sections/FeaturedStory';
import TestimonialsEditorial from '@/components/sections/TestimonialsEditorial';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactStrip />
      <WhoWeAre />
      <MissionVision />
      <ProgramsGrid />
      <FeaturedStory />
      <TestimonialsEditorial />
      <CTASection />
    </>
  );
}
