import topicsData from '../data/topics.json';

export type CaptionTrack = {
  label: string;
  src: string;
  srclang: string;
  default?: boolean;
};

export type Topic = {
  slug: string;
  title: string;
  summary: string;
  videoUrl: string;
  posterUrl?: string;
  captions?: CaptionTrack[];
  description?: string;
  transcript?: string;
  photos?: string[];
  discoveries?: string[];
};

export const allTopics = (): Topic[] => {
  // Convert JSON into typed objects
  return topicsData as Topic[];
};

export const getTopicBySlug = (slug: string): Topic | undefined => {
  return allTopics().find(t => t.slug === slug);
};
