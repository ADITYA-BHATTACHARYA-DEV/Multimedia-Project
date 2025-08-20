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
};

export default function VideoPlayer({ src, poster, captions = [], title }: Props) {
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

    // clear old tracks (cast to any to access missing methods)
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
    <figure>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered rounded-xl overflow-hidden"
        poster={poster}
        aria-label={title}
      />
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  );
}
