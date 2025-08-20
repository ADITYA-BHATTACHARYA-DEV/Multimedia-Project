import topics from "@/data/topics.json";

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
  description: string;
  transcript?: string;
};

export function allTopics(): Topic[] {
  return topics as Topic[];
}

export function findTopic(slug: string): Topic | undefined {
  return (topics as Topic[]).find(t => t.slug === slug);
}
