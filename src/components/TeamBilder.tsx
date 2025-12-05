import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Team {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
}

interface TeamBilderProps {
  teams: Team[];
  variant?: 'default' | 'muted' | 'outline';
  className?: string;
}

export const TeamBilder: React.FC<TeamBilderProps> = ({
  teams,
  variant = 'default',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardRefs.current.filter(Boolean);
    
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
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }
    );

    // Staggered card reveals - removed 3D rotationY and scale for better performance
    if (cards.length > 0) {
      tl.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    }

    // Cleanup function - hover effects now handled by CSS
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [teams]);

  const variantClasses = {
    default: 'bg-background-card border border-border',
    muted: 'bg-background-card border border-border',
    outline: 'bg-background-card border border-border',
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col md:flex-row gap-6 md:gap-8 justify-center will-change-transform ${className}`}
    >
      {teams.slice(0, 2).map((team, index) => (
        <div
          key={index}
          ref={(el) => (cardRefs.current[index] = el)}
          className={`md:w-1/2 rounded-2xl overflow-hidden ${variantClasses[variant]} max-w-sm mx-auto md:mx-0 cursor-pointer shadow-lg transition-all duration-300 ease-out will-change-transform hover:-translate-y-2 hover:shadow-2xl group`}
        >
          <div className="grid grid-rows-[2fr_1fr] gap-0">
            <div className="h-full overflow-hidden relative">
              <img
                src={team.imageSrc}
                alt={team.imageAlt || ''}
                className="w-full h-full object-cover aspect-[2/3] transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay with name */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <span className="text-white font-bold text-xl drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">{team.title}</span>
              </div>
            </div>
            <div className="p-5 md:p-6 flex flex-col justify-center bg-gradient-to-b from-transparent to-background-tint/30 transition-transform duration-300 ease-out group-hover:-translate-y-1">
              <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-2">{team.title}</h3>
              <p className="text-neutral-600 text-sm md:text-base leading-relaxed">{team.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};