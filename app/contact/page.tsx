import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Devorah Women's Leadership & Empowerment Initiative for general inquiries, partnership proposals, volunteer applications, or media requests. We are based in Lagos, Nigeria.',
  keywords: [
    'contact Devorah Women's Leadership & Empowerment Initiative',
    'NGO contact Nigeria',
    'partner with us',
    'volunteer Nigeria',
    'women foundation Lagos',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | Devorah Women's Leadership & Empowerment Initiative',
    description:
      'Reach out for general inquiries, partnership proposals, media requests, or volunteer interest. We would love to hear from you.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Devorah Women's Leadership & Empowerment Initiative',
    description: 'Connect with Devorah Women's Leadership & Empowerment Initiative — partnerships, volunteering, media & general inquiries.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
