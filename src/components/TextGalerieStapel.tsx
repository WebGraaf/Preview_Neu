import React, { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export type StapelBild = {
  /** Vollständige Bild-URL (z. B. Unsplash) */
  src: string;
  /** Alt-Text für SEO/Accessibility */
  alt: string;
};

interface TextGalerieStapelProps {
  title: string;
  description: string;
  images: StapelBild[];
  imagePosition?: 'left' | 'right';
  className?: string;
  /** Autoplay aktivieren (default: false) */
  autoplay?: boolean;
  /** Autoplay-Intervall in ms (default: 5000) */
  intervalMs?: number;
  /** Abgerundete Eckenstufe (Tailwind-Klasse), z. B. "rounded-3xl" */
  radiusClassName?: string;
}

export const TextGalerieStapel: React.FC<TextGalerieStapelProps> = ({
  title,
  description,
  images,
  imagePosition = 'left',
  className = '',
  autoplay = false,
  intervalMs = 5000,
  radiusClassName = 'rounded-3xl',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);

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

  // Optimized: Memoize random rotations per image to avoid recalculation on every render
  const rotations = useMemo(() =>
    images.map(() => Math.floor(Math.random() * 11) - 5),
    [images.length]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optimized: Single timeline with consolidated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Container fade in - simplified
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      // Gallery slide in from left or right based on position - reduced distance
      const galleryX = imagePosition === 'left' ? -50 : 50;
      tl.fromTo(
        galleryRef.current,
        { opacity: 0, x: galleryX },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // Text content staggered reveal - simplified
      tl.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.15,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [imagePosition]);

  if (!images?.length) {
    return (
      <div
        ref={containerRef}
        className={`bg-transparent py-0 px-0 ${className}`}
      >
        <div
          className={`flex flex-col md:flex-row gap-8 ${
            imagePosition === 'right' ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div ref={galleryRef} className="md:w-1/2">
            <div className="border border-dashed rounded-xl p-6 text-center text-muted">
              Keine Bilder übergeben. Bitte prop <code>images</code> füllen.
            </div>
          </div>
          <div ref={textRef} className="md:w-1/2 flex flex-col justify-center p-8 text-left">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">{title}</h3>
            <p className="text-neutral-600 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`bg-background py-6 md:py-8 ${className}`}
      style={{ opacity: 0 }}
    >
      <div
        className={`flex flex-col md:flex-row gap-8 md:gap-12 items-center ${
          imagePosition === 'right' ? 'md:flex-row-reverse' : ''
        }`}
      >
        <div ref={galleryRef} className="md:w-1/2" style={{ opacity: 0, willChange: 'transform, opacity' }}>
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
                        ease: 'easeOut' // Simpler easing
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
                        className={cn('w-full h-full object-cover object-center shadow-xl', radiusClassName)}
                        draggable={false}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Steuerung & kleine Vorschau/Infos */}
            <div className="flex flex-col items-center py-6 carousel-controls">
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
        <div ref={textRef} className="md:w-1/2 flex flex-col justify-center p-6 md:p-10 lg:p-12 text-left space-y-4" style={{ willChange: 'transform, opacity' }}>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight">{title}</h3>
          <p className="text-neutral-600 leading-relaxed text-base md:text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
};