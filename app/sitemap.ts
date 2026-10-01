import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devorahwomen.org';

  const routes = [
    '',
    '/about',
    '/programs',
    '/impact',
    '/gallery',
    '/resources',
    '/stories',
    '/partnerships',
    '/get-involved',
    '/donate',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
