import { allTopics } from '@/lib/topics';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Homepage entry
  const homepage = { url: base };

  // Topic entries
  const topicItems = allTopics().map(t => ({
    url: `${base}/topics/${t.slug}`,
    lastModified: new Date().toISOString(), // optional, improves SEO
  }));

  return [homepage, ...topicItems];
}
