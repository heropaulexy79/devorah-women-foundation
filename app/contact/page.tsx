import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Devorah Women Foundation for general inquiries, partnership proposals, volunteer applications, or media requests. We are based in Accra, Ghana.',
  keywords: [
    'contact Devorah Women Foundation',
    'NGO contact Ghana',
    'partner with us',
    'volunteer Ghana',
    'women foundation Accra',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | Devorah Women Foundation',
    description:
      'Reach out for general inquiries, partnership proposals, media requests, or volunteer interest. We would love to hear from you.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Devorah Women Foundation',
    description: 'Connect with Devorah Women Foundation — partnerships, volunteering, media & general inquiries.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
