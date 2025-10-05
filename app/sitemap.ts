import type { MetadataRoute } from 'next';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/', '/how-it-works', '/pricing', '/faq', '/contact',
    '/about', '/areas', '/services', '/services/removals', '/services/packing',
    '/services/storage', '/reviews', '/blog', '/privacy', '/terms', '/cookies',
    '/intake', '/thank-you'
  ];

  const blogs = ['/blog/moving-checklist-uk', '/blog/how-we-estimate'];
  const areas = ['/areas/glasgow', '/areas/dundee', '/areas/edinburgh'];

  const urls = [...staticRoutes, ...blogs, ...areas];

  const now = new Date();
  return urls.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
