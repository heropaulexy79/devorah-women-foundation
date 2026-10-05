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

const BASE_URL = 'https://devorahwomen.org';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Devorah Women Foundation | Empowering Women, Shaping Girls',
    template: '%s | Devorah Women Foundation',
  },
  description:
    'A Christian, women-focused foundation committed to empowering girls and women through education, mentorship, leadership development, community initiatives, and faith-anchored support across Ghana.',
  keywords: [
    'Devorah Women Foundation',
    'women empowerment Ghana',
    'girl-child development',
    'female leadership Africa',
    'Christian foundation Ghana',
    'girls scholarship Ghana',
    'women mentorship',
    'faith-based NGO',
    'girls STEM Ghana',
    'vocational training women',
  ],
  authors: [{ name: 'Devorah Women Foundation', url: BASE_URL }],
  creator: 'Devorah Women Foundation',
  publisher: 'Devorah Women Foundation',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: BASE_URL,
    siteName: 'Devorah Women Foundation',
    title: 'Devorah Women Foundation | Empowering Women, Shaping Girls',
    description:
      'Empowering Women. Shaping Girls. Transforming Communities. A faith-anchored foundation dedicated to holistic development across Ghana.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Devorah Women Foundation – Empowering Women, Shaping Girls',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devorah Women Foundation | Empowering Women, Shaping Girls',
    description:
      'A Christian foundation dedicated to empowering girls and women through education, mentorship, leadership, and faith-anchored community action.',
    images: ['/images/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  category: 'non-profit',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'NGO',
      '@id': `${BASE_URL}/#organization`,
      name: 'Devorah Women Foundation',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/Logo.png`,
        width: 400,
        height: 400,
      },
      image: `${BASE_URL}/images/og-image.png`,
      description:
        'A Christian, women-focused foundation committed to empowering girls and women through education, mentorship, leadership development, community initiatives, and faith-anchored support across Ghana.',
      foundingLocation: {
        '@type': 'Place',
        name: 'Accra, Ghana',
        addressCountry: 'GH',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Ghana',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'general enquiry',
          email: 'info@devorahwomen.org',
          availableLanguage: 'English',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'partnerships',
          email: 'partnerships@devorahwomen.org',
          availableLanguage: 'English',
        },
      ],
      sameAs: [
        'https://www.facebook.com/devorahwomenfoundation',
        'https://www.instagram.com/devorahwomenfoundation',
        'https://twitter.com/devorahwomen',
        'https://www.linkedin.com/company/devorahwomenfoundation',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Devorah Women Foundation',
      publisher: { '@id': `${BASE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/stories?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${plusJakarta.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#242024] selection:bg-[#E8DDF0] selection:text-[#3B214F]">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
