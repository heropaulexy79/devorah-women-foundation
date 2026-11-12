import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/ChatWidget';

const BASE_URL = 'https://www.devorahwomenfoundation.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Devorah Women's Leadership & Empowerment Initiative",
    template: "%s | Devorah Women's Leadership & Empowerment Initiative",
  },
  description:
    '',
  keywords: [
    "Devorah Women's Leadership & Empowerment Initiative",
    'women empowerment',
    'girl-child development',
    'female leadership Africa',
    'Christian foundation Nigeria',
    'NGO Lagos Nigeria',
    'girls scholarship',
    'women mentorship',
    'faith-based NGO',
    'girls STEM',
    'vocational training women',
  ],
  authors: [{ name: "Devorah Women's Leadership & Empowerment Initiative", url: BASE_URL }],
  creator: "Devorah Women's Leadership & Empowerment Initiative",
  publisher: "Devorah Women's Leadership & Empowerment Initiative",
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
    locale: 'en_NG',
    url: BASE_URL,
    siteName: "Devorah Women's Leadership & Empowerment Initiative",
    title: "Devorah Women's Leadership & Empowerment Initiative",
    description:
      'A faith-driven nonprofit organization committed to raising spiritually grounded, purpose-driven, and socially impactful women',
    images: [
      {
        url: '/images/og-logo.png',
        width: 1200,
        height: 630,
        alt: "Devorah Women's Leadership & Empowerment Initiative",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Devorah Women's Leadership & Empowerment Initiative",
    description:
      'A faith-driven nonprofit organization committed to raising spiritually grounded, purpose-driven, and socially impactful women',
    images: ['/images/og-logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
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
      name: "Devorah Women's Leadership & Empowerment Initiative",
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/Devorah%20logo%20adj.%20Purple.png`,
        width: 400,
        height: 400,
      },
      image: `${BASE_URL}/images/og-logo.png`,
      description:
        "Devorah Women's Leadership & Empowerment Initiative is a faith-driven nonprofit organization committed to raising spiritually grounded, purpose-driven, and socially impactful women.",
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No 14, Esubiyi Street, Mende, Maryland',
        addressLocality: 'Lagos',
        addressRegion: 'Lagos State',
        addressCountry: 'NG',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'general enquiry',
          telephone: '08030526200',
          email: 'womendevorah@gmail.com',
          availableLanguage: 'English',
        },
      ],
      sameAs: [
        'https://www.instagram.com/devorahwomen',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Devorah Women's Leadership & Empowerment Initiative",
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
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FCFCF7] text-[#242024] selection:bg-[#E8DDF0] selection:text-[#3B214F]">
        <Navbar />
        <main id="main-content" className="flex-grow pt-20">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
