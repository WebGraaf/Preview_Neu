import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface OverlayMediaTextProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  overlayOpacity?: number;
  textPosition?: 'center' | 'bottom' | 'top';
  variant?: 'default' | 'blur';
  className?: string;
}

export const OverlayMediaText: React.FC<OverlayMediaTextProps> = ({
  imageSrc,
  imageAlt = '',
  title,
  description,
  overlayOpacity = 0.6,
  textPosition = 'center',
  variant = 'default',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Consolidate all animations into a single timeline with one ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate container
      tl.fromTo(containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      );

      // Animate title
      tl.fromTo(".overlay-title",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        },
        "-=0.4"
      );

      // Animate description
      tl.fromTo(".overlay-description",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const positionClasses = {
    center: 'items-center justify-center',
    bottom: 'items-end justify-center pb-8',
    top: 'items-start justify-center pt-8',
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden min-h-[350px] md:min-h-[400px] py-8 md:py-10 px-4 shadow-xl hover:shadow-2xl transition-shadow duration-300 group bg-background ${className}`}
      style={{ willChange: 'transform, opacity' }}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
          variant === 'blur' ? 'filter blur-sm' : ''
        }`}
        loading="lazy"
      />
      {/* Improved gradient overlay for better text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 transition-opacity duration-300"
        style={{ opacity: overlayOpacity }}
      />
      {/* Subtle animated overlay on hover */}
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className={`relative z-10 h-full flex flex-col ${positionClasses[textPosition]} px-6 md:px-12`}>
        <h3 className="overlay-title text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 max-w-3xl mx-auto text-center drop-shadow-lg [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]" style={{ willChange: 'transform, opacity' }}>{title}</h3>
        <p className="overlay-description text-white/95 text-base md:text-lg lg:text-xl max-w-2xl mx-auto text-center leading-relaxed drop-shadow-md [text-shadow:_0_1px_5px_rgb(0_0_0_/_30%)]" style={{ willChange: 'transform, opacity' }}>{description}</p>
      </div>
    </div>
  );
};
