import Link from "next/link";
import { allTopics } from "@/lib/topics";

export default function HomePage() {
  const topics = allTopics();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Browse topics</h1>
      <ul className="grid sm:grid-cols-2 gap-4">
        {topics.map(t => (
          <li key={t.slug} className="border rounded-2xl overflow-hidden">
            <Link className="block no-underline focus:outline-none focus-visible:ring-2 ring-offset-2 p-4" href={`/topics/${t.slug}`}>
              <div className="space-y-2">
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                  {t.posterUrl ? <img src={t.posterUrl} alt="" className="w-full h-full object-cover" /> : null}
                </div>
                <div>
                  <h2 className="text-lg font-medium">{t.title}</h2>
                  <p className="text-sm text-gray-600">{t.summary}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
