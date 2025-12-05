"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type StapelBild = {
  /** Vollständige Bild-URL (z. B. Unsplash) */
  src: string;
  /** Alt-Text für SEO/Accessibility */
  alt: string;
};

export interface BilderGallerieStapelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Liste der Bilder, die als Stapel/Carousel angezeigt werden */
  images: StapelBild[];
  /** Autoplay aktivieren (default: false) */
  autoplay?: boolean;
  /** Autoplay-Intervall in ms (default: 5000) */
  intervalMs?: number;
  /** Abgerundete Eckenstufe (Tailwind-Klasse), z. B. "rounded-3xl" */
  radiusClassName?: string;
}

export default function BilderGallerieStapel({
  images,
  autoplay = false,
  intervalMs = 5000,
  radiusClassName = "rounded-3xl",
  className,
  ...rest
}: BilderGallerieStapelProps) {
  const [active, setActive] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const controlsRef = React.useRef<HTMLDivElement>(null);

  const handleNext = React.useCallback(() => {
    setActive((p) => (images.length ? (p + 1) % images.length : 0));
  }, [images.length]);

  const handlePrev = React.useCallback(() => {
    setActive((p) => (images.length ? (p - 1 + images.length) % images.length : 0));
  }, [images.length]);

  React.useEffect(() => {
    if (!autoplay || images.length <= 1) return;
    const id = setInterval(handleNext, intervalMs);
    return () => clearInterval(id);
  }, [autoplay, intervalMs, handleNext, images.length]);

  React.useEffect(() => {
    // Store cleanup functions for hover effects
    const cleanupFns: (() => void)[] = [];
    
    const ctx = gsap.context(() => {
      // Optimized: Single timeline with one ScrollTrigger instead of 2 separate ones
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Container entrance - simplified, no scale animation
      tl.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      // Controls animation
      tl.fromTo(controlsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Optimized: Removed GSAP hover effects - using CSS hover instead (more performant)
      // The buttons already have CSS hover:scale-110 which is GPU-accelerated
    }, containerRef);

    return () => {
      ctx.revert();
      // Clean up any remaining event listeners
      cleanupFns.forEach(fn => fn());
    };
  }, []);

  // Optimized: Memoize random rotations per image to avoid recalculation on every render
  const rotations = React.useMemo(() =>
    images.map(() => Math.floor(Math.random() * 11) - 5),
    [images.length]
  );

  if (!images?.length) {
    return (
      <div
        className={cn(
          "w-full max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-10",
          className
        )}
        {...rest}
      >
        <div className="border border-dashed rounded-xl p-6 text-center text-muted">
          Keine Bilder übergeben. Bitte prop <code>images</code> füllen.
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-10 bg-background",
        className
      )}
      style={{ opacity: 0 }}
      {...rest}
    >
      <div className="flex flex-col items-center">
        {/* Bild-Stapel / Bühne */}
        <div className="relative w-80 h-80 md:w-96 md:h-96 carousel-stage">
          <AnimatePresence mode="popLayout">
            {images.map((img, idx) => {
              const isActive = idx === active;
              const rotation = rotations[idx] || 0;
              return (
                <motion.div
                  key={img.src}
                  // Optimized: Simplified animation - fewer simultaneous property changes
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                    scale: isActive ? 1 : 0.95,
                    rotate: isActive ? 0 : rotation,
                    zIndex: isActive ? 40 : images.length - idx,
                    y: isActive ? -20 : 0, // Simplified: single value instead of keyframes
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeOut" // Simpler easing
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(event, info) => {
                    const swipeThreshold = 50;
                    if (info.offset.x > swipeThreshold) {
                      handlePrev();
                    } else if (info.offset.x < -swipeThreshold) {
                      handleNext();
                    }
                  }}
                  className="absolute inset-0 origin-bottom md:pointer-events-none"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={cn("w-full h-full object-cover object-center shadow-xl", radiusClassName)}
                    draggable={false}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Steuerung & kleine Vorschau/Infos */}
        <div ref={controlsRef} className="flex flex-col items-center py-6 carousel-controls" style={{ opacity: 0 }}>
          <div className="text-center">
            <div className="text-sm text-muted mb-3 font-medium bg-background-card/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">Bild {active + 1} / {images.length}</div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <button
              type="button"
              aria-label="Vorheriges Bild"
              onClick={handlePrev}
              className="h-11 w-11 rounded-full bg-primary shadow-lg hover:shadow-xl flex items-center justify-center group transition-transform duration-200 hover:scale-110"
              style={{ willChange: 'transform' }}
            >
              <ChevronLeft className="h-6 w-6 text-white transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>
            <button
              type="button"
              aria-label="Nächstes Bild"
              onClick={handleNext}
              className="h-11 w-11 rounded-full bg-primary shadow-lg hover:shadow-xl flex items-center justify-center group transition-transform duration-200 hover:scale-110"
              style={{ willChange: 'transform' }}
            >
              <ChevronRight className="h-6 w-6 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}