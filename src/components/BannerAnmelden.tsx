import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../hooks/useScrollReveal';

const LogoDefault = '/default_images/logo_default.webp';

gsap.registerPlugin(ScrollTrigger);

const BannerAnmelden: React.FC = () => {
  const { elementRef, isVisible } = useScrollReveal();
  const logoRef = useRef<HTMLImageElement>(null);

  // Logo animation matching HeroStartseite
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -45,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      className="py-6 md:py-8 bg-background"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <div className="bg-gradient-to-br from-background-card via-background-card to-background-tint rounded-2xl p-8 md:p-12 text-heading shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-border/50 relative overflow-hidden group">
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:24px_24px]" />
          {/* Animated gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 lg:w-7/10 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-heading to-heading/80 bg-clip-text">
                Bereit für deinen Führerschein?
              </h2>
              <p className="text-base md:text-lg text-text mb-8 max-w-2xl mx-auto leading-relaxed">
                Starte jetzt deine Fahrschulausbildung bei uns. Professionelle Ausbildung, flexible Termine und erfahrene Fahrlehrer. Wir warten auf dich!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/anmelden"
                  className="px-8 md:px-10 py-4 md:py-5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 inline-block text-center text-base md:text-lg"
                >
                  Jetzt Anmelden
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0 lg:w-3/10 flex justify-center" style={{ opacity: 1 }}>
              <img
                ref={logoRef}
                src={LogoDefault}
                alt="Logo"
                className="max-w-full h-auto max-h-32"
                style={{
                  opacity: 0,
                  transform: 'scale(0.5) rotate(-45deg) translateY(50px)',
                  willChange: 'transform, opacity',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerAnmelden;