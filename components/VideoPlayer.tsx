'use client';

import { useEffect, useRef } from 'react';
import videojs, { VideoJsPlayer } from 'video.js';
import 'video.js/dist/video-js.css';
import type { CaptionTrack } from '@/lib/topics';

type Props = {
  src: string;
  poster?: string;
  captions?: CaptionTrack[];
  title: string;
};

export default function VideoPlayer({ src, poster, captions = [], title }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    // Initialize only once
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

    // manage tracks
    // remove old
    const existing = player.remoteTextTracks();
    for (let i = existing.length - 1; i >= 0; i--) {
      player.removeRemoteTextTrack(existing[i]);
    }
    // add new
    captions.forEach(track => {
      player.addRemoteTextTrack({
        kind: 'captions',
        label: track.label,
        src: track.src,
        srclang: track.srclang,
        default: track.default ?? false
      }, false);
    });

    return () => {
      // do not dispose on unmount of page (Next fast refresh would dispose incorrectly)
    };
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
