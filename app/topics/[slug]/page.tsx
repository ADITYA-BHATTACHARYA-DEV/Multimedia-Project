import { notFound } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import { findTopic } from "@/lib/topics";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  // Static paths for local data; if you swap to CMS, remove this.
  const { allTopics } = require('@/lib/topics');
  return allTopics().map((t: any) => ({ slug: t.slug }));
}

export default function TopicPage({ params }: Props) {
  const topic = findTopic(params.slug);
  if (!topic) return notFound();

  return (
    <article className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">{topic.title}</h1>
        <p className="text-gray-600">{topic.summary}</p>
      </header>

      <section aria-label="Video">
        <VideoPlayer
          src={topic.videoUrl}
          poster={topic.posterUrl}
          captions={topic.captions}
          title={topic.title}
        />
        <div className="text-sm text-gray-600 mt-2">
          Use <kbd>k</kbd> to play/pause, <kbd>←</kbd>/<kbd>→</kbd> to seek.
        </div>
      </section>

      <section aria-label="Description" className="prose">
        <h2>Description</h2>
        <p>{topic.description}</p>
      </section>

      {topic.transcript ? (
        <section aria-label="Transcript" className="prose">
          <h2>Transcript</h2>
          <details>
            <summary className="cursor-pointer">Show transcript</summary>
            <pre className="whitespace-pre-wrap">{topic.transcript}</pre>
          </details>
        </section>
      ) : null}
    </article>
  );
}
