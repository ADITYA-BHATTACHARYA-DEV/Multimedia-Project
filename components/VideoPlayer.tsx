'use client';

import type { CaptionTrack } from '@/lib/topics';
import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

type Props = {
  src: string;
  poster?: string;
  captions?: CaptionTrack[];
  title: string;
  description?: string;
  photos?: string[]; // Array of image URLs
  discoveries?: string[]; // Array of latest discovery/update strings
};

export default function VideoPlayer({
  src,
  poster,
  captions = [],
  title,
  description,
  photos = [],
  discoveries = [],
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        preload: 'auto',
        fluid: true,
        responsive: true,
        html5: {
          vhs: { withCredentials: false }
        }
      });
    }

    const player = playerRef.current;

    // set source
    player.src({
      src,
      type: src.endsWith('.m3u8') ? 'application/x-mpegURL' : 'application/dash+xml'
    });

    // clear old tracks
    const existing = (player as any).remoteTextTracks?.();
    if (existing) {
      for (let i = existing.length - 1; i >= 0; i--) {
        (player as any).removeRemoteTextTrack(existing[i]);
      }
    }

    // add new captions
    captions.forEach(track => {
      (player as any).addRemoteTextTrack(
        {
          kind: 'captions',
          label: track.label,
          src: track.src,
          srclang: track.srclang,
          default: track.default ?? false
        },
        false
      );
    });
  }, [src, JSON.stringify(captions)]);

  return (
    <div className="space-y-8">
      {/* Video Section */}
      <figure>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered rounded-xl overflow-hidden w-full"
          poster={poster}
          aria-label={title}
        />
        <figcaption className="sr-only">{title}</figcaption>
      </figure>

      {/* Wikipedia-style Details Section */}
      <section className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 prose prose-invert max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>

        {/* Description */}
        {description && (
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-cyan-400">Description</h3>
            <p className="text-gray-300">{description}</p>
          </div>
        )}

        {/* Photos/Gallery */}
        {photos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-blue-400">Photos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {photos.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Photo ${idx + 1} of ${title}`}
                  className="rounded-lg object-cover w-full h-32 shadow-lg hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        )}

        {/* Latest Discoveries */}
        {discoveries.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-green-400">Latest Discoveries</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {discoveries.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
