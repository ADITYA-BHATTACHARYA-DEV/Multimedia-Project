"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export const Vortex = ({
  children,
  className,
  containerClassName,
  particleCount = 800,
  baseHue = 200,
  hueRange = 60,
  baseSpeed = 0.001,
  speedRange = 0.02,
  baseRadius = 1,
  radiusRange = 2,
  backgroundColor = "rgba(0,0,0,0.1)", // semi-transparent black for trails
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  baseHue?: number;
  hueRange?: number;
  baseSpeed?: number;
  speedRange?: number;
  baseRadius?: number;
  radiusRange?: number;
  backgroundColor?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Create particles with random angles, distances, speed, radius, and hue
    const particles = Array.from({ length: particleCount }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * Math.min(canvas.width, canvas.height) * 0.5;
      return {
        angle,
        distance,
        speed: baseSpeed + Math.random() * speedRange,
        radius: baseRadius + Math.random() * radiusRange,
        hue: baseHue + Math.random() * hueRange,
      };
    });

    const draw = () => {
      // Draw semi-transparent background for trail effect
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => {
        p.angle += p.speed;

        // Spiral motion
        const x = canvas.width / 2 + Math.cos(p.angle) * p.distance;
        const y = canvas.height / 2 + Math.sin(p.angle) * p.distance;

        // Particle trail effect
        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);

        // Blue gradient with some variance
        ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, 0.7)`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener("resize", resize);
    };
  }, [
    particleCount,
    baseHue,
    hueRange,
    baseSpeed,
    speedRange,
    baseRadius,
    radiusRange,
    backgroundColor,
  ]);

  return (
    <div
      className={cn(
        "relative h-full w-full flex items-center justify-center overflow-hidden",
        containerClassName
      )}
    >
      <canvas
        ref={canvasRef}
        className={cn("absolute inset-0 z-0", className)}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
