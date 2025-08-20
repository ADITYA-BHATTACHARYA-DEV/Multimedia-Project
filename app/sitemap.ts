import { MetadataRoute } from 'next';
import { allTopics } from '@/lib/topics';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const items = allTopics().map(t => ({ url: `${base}/topics/${t.slug}` }));
  return [{ url: base }, ...items];
}
