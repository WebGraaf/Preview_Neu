import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LogoDefault = '/default_images/logo_default.webp';

gsap.registerPlugin(ScrollTrigger);

const BannerAnmelden: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optimized: Single timeline with one ScrollTrigger instead of 4 separate ones
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Banner container entrance
      tl.fromTo(sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      // Logo animation - removed filter:blur, using simpler easing
      tl.fromTo(logoRef.current,
        {
          opacity: 0,
          scale: 0.6,
          rotation: -90,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "power3.out", // Simpler than elastic.out
        },
        "-=0.3"
      );

      // Title animation
      tl.fromTo(titleRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Text animation
      tl.fromTo(textRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Button animation
      tl.fromTo(buttonRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-6 md:py-8 bg-background" style={{ opacity: 0 }}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <div className="bg-gradient-to-br from-background-card via-background-card to-background-tint rounded-2xl p-8 md:p-12 text-heading shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-border/50 relative overflow-hidden group">
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:24px_24px]" />
          {/* Animated gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 lg:w-7/10 text-center">
              <h2
                ref={titleRef}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-heading to-heading/80 bg-clip-text"
                style={{ opacity: 0, willChange: 'transform, opacity' }}
              >
                Bereit für deinen Führerschein?
              </h2>
              <p
                ref={textRef}
                className="text-base md:text-lg text-text mb-8 max-w-2xl mx-auto leading-relaxed"
                style={{ opacity: 0, willChange: 'transform, opacity' }}
              >
                Starte jetzt deine Fahrschulausbildung bei uns. Professionelle Ausbildung, flexible Termine und erfahrene Fahrlehrer. Wir warten auf dich!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  ref={buttonRef}
                  to="/anmelden"
                  className="px-8 md:px-10 py-4 md:py-5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 inline-block text-center text-base md:text-lg"
                  style={{ opacity: 0, willChange: 'transform, opacity' }}
                >
                  Jetzt Anmelden
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0 lg:w-3/10 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                <img
                  ref={logoRef}
                  src={LogoDefault}
                  alt="Logo"
                  className="relative max-w-full h-auto max-h-36 md:max-h-40 drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
                  style={{ opacity: 0, willChange: 'transform, opacity' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerAnmelden;