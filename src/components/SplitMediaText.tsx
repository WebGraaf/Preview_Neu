import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitMediaTextProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  imagePosition?: 'left' | 'right';
  variant?: 'default' | 'muted' | 'outline';
  className?: string;
}

export const SplitMediaText: React.FC<SplitMediaTextProps> = ({
  imageSrc,
  imageAlt = '',
  title,
  description,
  imagePosition = 'left',
  variant = 'default',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    
    if (!container) return;

    // Create single consolidated timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Container fade in
    tl.fromTo(
      container,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    // Image slide in - reduced distance for better performance
    if (image) {
      const imageX = imagePosition === 'left' ? -60 : 60;
      tl.fromTo(
        image,
        { opacity: 0, x: imageX },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
    }

    // Text content staggered reveal
    if (text?.children) {
      tl.fromTo(
        text.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [imagePosition]);

  const variantClasses = {
    default: 'bg-background-card border border-border',
    muted: 'bg-background-tint border border-border',
    outline: 'bg-transparent border-2 border-primary-500',
  };

  return (
    <section ref={containerRef} className="py-6 md:py-8 bg-background will-change-transform">
      <div
        className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${variantClasses[variant]} ${className}`}
      >
        <div
          className={`flex flex-col md:flex-row gap-0 md:gap-8 items-stretch ${
            imagePosition === 'right' ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div ref={imageRef} className="md:w-1/2 group overflow-hidden will-change-transform">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover rounded-t-2xl md:rounded-t-none md:rounded-l-2xl shadow-lg transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div ref={textRef} className="md:w-1/2 flex flex-col justify-center p-6 md:p-10 lg:p-12 text-left space-y-4 will-change-transform">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight">{title}</h3>
            <p className="text-neutral-600 leading-relaxed text-base md:text-lg">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
