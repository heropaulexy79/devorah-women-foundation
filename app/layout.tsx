import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/ChatWidget';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Devorah Women Foundation | Empowering Women, Shaping Girls',
  description: 'A Christian, women-focused foundation committed to empowering girls and women through education, mentorship, leadership development, community initiatives, and faith-anchored support.',
  openGraph: {
    title: 'Devorah Women Foundation',
    description: 'Empowering Women. Shaping Girls. Transforming Communities.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#242024] selection:bg-[#E8DDF0] selection:text-[#3B214F]">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
