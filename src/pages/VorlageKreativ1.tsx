import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, X, ZoomIn, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Layout from '../components/Layout';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// VORLAGE 3: KREATIV 1 - "Showcase & Testimonials"
// Diese Vorlage kombiniert Bildergalerie, Team-Karten und Bewertungen.
// Ideal für: Portfolio-Seiten, Team-Präsentationen, Referenz-Seiten
// ============================================================================

// --- Inline Container Component ---
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'lg'
}) => {
  const sizeClasses = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full'
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

// --- Inline Section Component ---
interface SectionProps {
  children: React.ReactNode;
  background?: string;
  padding?: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  background = 'transparent',
  padding = 'md',
  className = ''
}) => {
  const paddingClasses: Record<string, string> = {
    none: 'py-0',
    xs: 'py-4 sm:py-6',
    sm: 'py-6 sm:py-8',
    md: 'py-8 sm:py-10',
    lg: 'py-10 sm:py-12',
    xl: 'py-12 sm:py-16'
  };

  const backgroundClasses: Record<string, string> = {
    transparent: 'bg-transparent',
    white: 'bg-white',
    gray: 'bg-neutral-100',
    blue: 'bg-primary-50',
    'page-bg': 'bg-background',
    'card-bg': 'bg-background-card',
    'card-tint': 'bg-background-tint',
    'elevated-bg': 'bg-background-elevated'
  };

  const bgClass = backgroundClasses[background] || '';

  return (
    <section className={`${bgClass} ${paddingClasses[padding] || paddingClasses.md} ${className}`}>
      {children}
    </section>
  );
};

// --- Inline Lightbox Component ---
interface LightboxProps {
  images: string[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight' && onNext) onNext();
        if (e.key === 'ArrowLeft' && onPrev) onPrev();
      };
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center animate-in fade-in duration-300">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 z-10 hover:scale-110 hover:rotate-90"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={() => setIsZoomed(!isZoomed)}
        className="absolute top-4 right-20 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 z-10 hover:scale-110"
      >
        {isZoomed ? <Maximize2 className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
      </button>

      {onPrev && images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 p-4 text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-x-1"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      <div className={`relative max-w-7xl max-h-[90vh] transition-all duration-500 ease-out ${isZoomed ? 'scale-150' : 'scale-100'}`}>
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="w-full h-full object-contain rounded-2xl shadow-2xl"
        />
      </div>

      {onNext && images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 p-4 text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 hover:translate-x-1"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium shadow-lg">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

// --- Inline BilderGallerie Component ---
interface BilderGallerieProps {
  images?: string[];
  title?: string;
}

const BilderGallerie: React.FC<BilderGallerieProps> = ({
  images = [],
  title
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryItemsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const items = galleryItemsRef.current.filter(Boolean);
    
    if (!container || items.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out"
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div ref={containerRef} className="py-8 md:py-12 px-4 bg-background">
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-heading mb-8 text-center">{title}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {images.map((image, index) => (
          <button
            key={index}
            ref={(el) => (galleryItemsRef.current[index] = el!)}
            onClick={() => openLightbox(index)}
            className="gallery-item relative aspect-square overflow-hidden rounded-2xl group cursor-pointer bg-gray-100 shadow-md transition-opacity transition-shadow duration-300 ease-out hover:shadow-xl hover:-translate-y-1"
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ZoomIn className="zoom-icon w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out drop-shadow-lg" />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        isOpen={lightboxOpen}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

// --- Inline TeamBilder Component ---
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

const TeamBilder: React.FC<TeamBilderProps> = ({
  teams,
  variant = 'default',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimatedRef = useRef(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardRefs.current.filter(Boolean);
    
    if (!container || hasAnimatedRef.current) return;

    gsap.set(container, { opacity: 0, y: 40 });
    gsap.set(cards, { opacity: 0, y: 40 });

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        const tl = gsap.timeline();

        tl.to(container, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        });

        if (cards.length > 0) {
          tl.to(
            cards,
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
      },
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, []);

  const variantClasses = {
    default: 'bg-background-card border border-border',
    muted: 'bg-background-card border border-border',
    outline: 'bg-background-card border border-border',
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col md:flex-row gap-6 md:gap-8 justify-center ${className}`}
    >
      {teams.slice(0, 2).map((team, index) => (
        <div
          key={index}
          ref={(el) => (cardRefs.current[index] = el)}
          className={`md:w-1/2 rounded-2xl overflow-hidden ${variantClasses[variant]} max-w-sm mx-auto md:mx-0 cursor-pointer shadow-lg transition-shadow duration-300 ease-out hover:shadow-2xl group`}
        >
          <div className="grid grid-rows-[2fr_1fr] gap-0">
            <div className="h-full overflow-hidden relative">
              <img
                src={team.imageSrc}
                alt={team.imageAlt || ''}
                className="w-full h-full object-cover aspect-[2/3]"
                loading="lazy"
              />
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

// --- Inline Bewertungen Component ---
interface Testimonial {
  name: string;
  role: string;
  initials: string;
  rating: number;
  text: string;
}

interface BewertungenProps {
  testimonials?: Testimonial[];
  title?: string;
}

const Bewertungen: React.FC<BewertungenProps> = ({
  testimonials = [],
  title = 'Bewertungen'
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = testimonialRefs.current.filter(Boolean);
    
    if (!section || cards.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(".reviews-title",
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }
    );

    tl.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out"
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <h2 className="reviews-title text-3xl font-bold text-heading mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (testimonialRefs.current[index] = el!)}
              className="testimonial-card border-2 border-neutral-200 rounded-2xl p-6 bg-background-card shadow-md transition-shadow duration-300 ease-out hover:shadow-xl hover:border-primary-200 group"
            >
              <div className="flex items-center mb-4">
                <div className="testimonial-avatar w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold mr-4 shadow-md">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-heading">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center mb-4 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`star-icon w-5 h-5 ${
                      i < testimonial.rating
                        ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                        : 'text-neutral-200 fill-neutral-200'
                    }`}
                    style={{ transitionDelay: `${i * 30}ms` }}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-neutral-500">
                  {testimonial.rating}/5
                </span>
              </div>
              <p className="text-text leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Inline KartenSpotlight Component ---
interface Position {
  x: number;
  y: number;
}

type SpotlightColorKey = 'primary' | 'secondary' | 'brand-500';

const spotlightColorMap: Record<SpotlightColorKey, string> = {
  primary: 'var(--spotlight-primary)',
  secondary: 'var(--spotlight-secondary)',
  'brand-500': 'var(--spotlight-brand-500)',
};

interface KartenSpotlightProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: SpotlightColorKey;
}

const KartenSpotlight: React.FC<KartenSpotlightProps> = ({
  children,
  className = '',
  spotlightColor = 'primary'
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = React.useCallback((e) => {
    if (!divRef.current || isFocused) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    });
  }, [isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border border-border bg-card overflow-hidden
        transition-all duration-300 ease-out
        hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5
        focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2
        ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColorMap[spotlightColor]}, transparent 80%)`
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.3 : 0,
          boxShadow: `inset 0 0 30px rgba(var(--primary-rgb, 255, 107, 0), 0.08)`
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// HAUPTKOMPONENTE
// ============================================================================

const VorlageKreativ1: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  // Placeholder Bilder
  const placeholderImage1 = '/default_images/Platzhalter_Fahrschule.webp';
  const placeholderImage2 = '/default_images/Platzhalter_Furhpark.webp';
  const placeholderImage3 = '/default_images/Platzhalter_Gruppenbild_Team.webp';
  const placeholderTeam = '/default_images/Platzhalter_Teammitglied.webp';

  // Galerie-Bilder
  const galerieImages = [
    placeholderImage1,
    placeholderImage2,
    placeholderImage3,
    placeholderImage1,
    placeholderImage2,
    placeholderImage3,
  ];

  // Team-Daten
  const teamMembers: Team[] = [
    {
      imageSrc: placeholderTeam,
      imageAlt: 'Lorem Ipsum',
      title: 'Lorem Ipsum',
      description: 'Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'
    },
    {
      imageSrc: placeholderTeam,
      imageAlt: 'Sed Tempor',
      title: 'Sed Tempor',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
    }
  ];

  const teamMembers2: Team[] = [
    {
      imageSrc: placeholderTeam,
      imageAlt: 'Ut Enim',
      title: 'Ut Enim',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.'
    },
    {
      imageSrc: placeholderTeam,
      imageAlt: 'Duis Aute',
      title: 'Duis Aute',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.'
    }
  ];

  // Bewertungen-Daten
  const testimonials: Testimonial[] = [
    {
      name: 'Lorem Ipsum',
      role: 'Dolor Sit',
      initials: 'LI',
      rating: 5,
      text: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      name: 'Sed Tempor',
      role: 'Amet Consectetur',
      initials: 'ST',
      rating: 5,
      text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'
    },
    {
      name: 'Ut Enim',
      role: 'Adipiscing Elit',
      initials: 'UE',
      rating: 4,
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    }
  ];

  // Spotlight-Karten Daten
  const spotlightCards = [
    {
      title: 'Lorem Ipsum',
      description: 'Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      value: '100+'
    },
    {
      title: 'Sed Tempor',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      value: '50+'
    },
    {
      title: 'Ut Enim',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
      value: '25+'
    }
  ];

  return (
    <Layout>
      <div className="bg-background">
        <Helmet>
          <title>Vorlage Kreativ 1 - Template</title>
          <meta name="description" content="Kreative Vorlage mit Galerie, Team und Bewertungen" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        {/* Hero/Header Section */}
        <Section background="page-bg" padding="xl">
          <Container size="md">
            <div ref={headerRef} className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-6 tracking-tight">
                Lorem Ipsum Dolor
              </h1>
              <p className="text-lg md:text-xl text-text leading-relaxed max-w-3xl mx-auto">
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </Container>
        </Section>

        {/* Spotlight Cards Section */}
        <Section background="page-bg" padding="lg">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {spotlightCards.map((card, index) => (
                <KartenSpotlight key={index} className="p-6">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{card.value}</div>
                    <h3 className="text-xl font-bold text-heading mb-2">{card.title}</h3>
                    <p className="text-text text-sm">{card.description}</p>
                  </div>
                </KartenSpotlight>
              ))}
            </div>
          </Container>
        </Section>

        {/* Bildergalerie Section */}
        <Section background="page-bg" padding="lg">
          <Container>
            <BilderGallerie 
              images={galerieImages} 
              title="Unsere Galerie"
            />
          </Container>
        </Section>

        {/* Team Section */}
        <Section background="page-bg" padding="lg">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">Unser Team</h2>
              <p className="text-lg text-text max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
              </p>
            </div>
            <div className="space-y-8">
              <TeamBilder teams={teamMembers} variant="default" />
              <TeamBilder teams={teamMembers2} variant="muted" />
            </div>
          </Container>
        </Section>

        {/* Bewertungen Section */}
        <Section background="page-bg" padding="lg">
          <Container>
            <Bewertungen 
              testimonials={testimonials} 
              title="Was unsere Kunden sagen"
            />
          </Container>
        </Section>

        {/* CTA Section */}
        <Section background="page-bg" padding="lg">
          <Container size="md">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 shadow-xl text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Bereit Loszulegen?
              </h2>
              <p className="text-white/90 leading-relaxed max-w-2xl mx-auto mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua.
              </p>
              <a
                href="#"
                className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-neutral-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out shadow-lg"
              >
                Lorem Ipsum
              </a>
            </div>
          </Container>
        </Section>
      </div>
    </Layout>
  );
};

export default VorlageKreativ1;