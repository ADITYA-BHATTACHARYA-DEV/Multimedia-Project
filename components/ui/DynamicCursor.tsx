'use client';

import { useEffect, useRef } from "react";

export default function DynamicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const tailRef = useRef<HTMLDivElement[]>([]);
  const tailLength = 12;

  // Initialize positions array with default offscreen positions
  const positions = useRef<{ x: number; y: number }[]>(
    Array.from({ length: tailLength }, () => ({ x: -100, y: -100 }))
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Move main cursor
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      // Shift positions for tail
      positions.current.unshift({ x, y });
      if (positions.current.length > tailLength) positions.current.pop();

      // Update tail particles
      tailRef.current.forEach((tail, idx) => {
        if (!tail) return;

        // Ensure pos exists
        const pos = positions.current[idx] || { x: x, y: y };
        const intensity = 1 - idx / tailLength;

        tail.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scaleX(${1 + idx * 0.4}) scaleY(${0.4 + intensity * 0.6}) rotate(-15deg)`;
        tail.style.opacity = `${intensity}`;
        tail.style.backgroundColor = `rgba(0, 255, 255, ${intensity})`;
        tail.style.boxShadow = `0 0 ${12 * intensity}px ${6 * intensity}px rgba(0,255,255,${intensity})`;
        tail.style.borderRadius = "50% / 50%"; // elongated oval
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Main Pointer */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed w-6 h-6 rounded-full bg-cyan-400"
        style={{
          zIndex: 9999,
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
          transition: "transform 0.03s linear",
          boxShadow: "0 0 12px 6px rgba(0,255,255,0.8)"
        }}
      />

      {/* Comet Tail */}
      {Array.from({ length: tailLength }).map((_, idx) => (
        <div
          key={idx}
          ref={(el) => { if (el) tailRef.current[idx] = el; }}
          className="pointer-events-none fixed w-4 h-2 bg-cyan-400"
          style={{
            top: 0,
            left: 0,
            opacity: 0,
            zIndex: 9998,
            transition: "transform 0.03s linear, opacity 0.03s linear, box-shadow 0.03s linear",
          }}
        />
      ))}
    </>
  );
}
