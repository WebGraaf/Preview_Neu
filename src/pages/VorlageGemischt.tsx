import React, { useRef, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// VORLAGE 2: GEMISCHT (50/50)
// Diese Vorlage hat eine ausgewogene Mischung aus Text und Medien-Elementen.
// Ideal für: Über-Uns-Seiten, Service-Seiten, Produkt-Präsentationen
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

// --- Inline SplitMediaText Component ---
interface SplitMediaTextProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  imagePosition?: 'left' | 'right';
  variant?: 'default' | 'muted' | 'outline';
  className?: string;
}

const SplitMediaText: React.FC<SplitMediaTextProps> = ({
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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      container,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    if (image) {
      const imageX = imagePosition === 'left' ? -60 : 60;
      tl.fromTo(
        image,
        { opacity: 0, x: imageX },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
    }

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
    <section ref={containerRef} className="py-6 md:py-8 bg-background">
      <div
        className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${variantClasses[variant]} ${className}`}
      >
        <div
          className={`flex flex-col md:flex-row gap-0 md:gap-8 items-stretch ${
            imagePosition === 'right' ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div ref={imageRef} className="md:w-1/2 group overflow-hidden">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover rounded-t-2xl md:rounded-t-none md:rounded-l-2xl shadow-lg"
              loading="lazy"
            />
          </div>
          <div ref={textRef} className="md:w-1/2 flex flex-col justify-center p-6 md:p-10 lg:p-12 text-left space-y-4">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight">{title}</h3>
            <p className="text-neutral-600 leading-relaxed text-base md:text-lg">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Inline TextGalerieStapel Component ---
type StapelBild = {
  src: string;
  alt: string;
};

interface TextGalerieStapelProps {
  title: string;
  description: string;
  images: StapelBild[];
  imagePosition?: 'left' | 'right';
  className?: string;
  autoplay?: boolean;
  intervalMs?: number;
  radiusClassName?: string;
}

const TextGalerieStapel: React.FC<TextGalerieStapelProps> = ({
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

  const rotations = useMemo(() =>
    images.map(() => Math.floor(Math.random() * 11) - 5),
    [images.length]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      const galleryX = imagePosition === 'left' ? -50 : 50;
      tl.fromTo(
        galleryRef.current,
        { opacity: 0, x: galleryX },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

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
      <div ref={containerRef} className={`bg-transparent py-0 px-0 ${className}`}>
        <div className={`flex flex-col md:flex-row gap-8 ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
          <div ref={galleryRef} className="md:w-1/2">
            <div className="border border-dashed rounded-xl p-6 text-center text-muted">
              Keine Bilder übergeben.
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
            <div className="relative w-80 h-80 md:w-96 md:h-96 carousel-stage">
              <AnimatePresence mode="popLayout">
                {images.map((img, idx) => {
                  const isActive = idx === active;
                  const rotation = rotations[idx] || 0;
                  return (
                    <motion.div
                      key={img.src}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{
                        opacity: isActive ? 1 : 0.7,
                        scale: isActive ? 1 : 0.95,
                        rotate: isActive ? 0 : rotation,
                        zIndex: isActive ? 40 : images.length - idx,
                        y: isActive ? -20 : 0,
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(_event, info) => {
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
                        className={`w-full h-full object-cover object-center shadow-xl ${radiusClassName}`}
                        draggable={false}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

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

// --- Inline OverlayMediaText Component ---
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

const OverlayMediaText: React.FC<OverlayMediaTextProps> = ({
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      tl.fromTo(".overlay-title",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      tl.fromTo(".overlay-description",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
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
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className={`absolute inset-0 w-full h-full object-cover ${variant === 'blur' ? 'filter blur-sm' : ''}`}
        loading="lazy"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 transition-opacity duration-300"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className={`relative z-10 h-full flex flex-col ${positionClasses[textPosition]} px-6 md:px-12`}>
        <h3 className="overlay-title text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 max-w-3xl mx-auto text-center drop-shadow-lg [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">{title}</h3>
        <p className="overlay-description text-white/95 text-base md:text-lg lg:text-xl max-w-2xl mx-auto text-center leading-relaxed drop-shadow-md [text-shadow:_0_1px_5px_rgb(0_0_0_/_30%)]">{description}</p>
      </div>
    </div>
  );
};

// ============================================================================
// HAUPTKOMPONENTE
// ============================================================================

const VorlageGemischt: React.FC = () => {
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

  // Galerie-Bilder für TextGalerieStapel
  const galerieImages: StapelBild[] = [
    { src: placeholderImage1, alt: 'Lorem Ipsum Bild 1' },
    { src: placeholderImage2, alt: 'Lorem Ipsum Bild 2' },
    { src: placeholderImage3, alt: 'Lorem Ipsum Bild 3' },
  ];

  return (
    <Layout>
      <div className="bg-background">
        <Helmet>
          <title>Vorlage Gemischt - Template</title>
          <meta name="description" content="Gemischte Vorlage mit 50/50 Text und Medien" />
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
                Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
            </div>
          </Container>
        </Section>

        {/* SplitMediaText Section 1 - Bild Links */}
        <Section background="page-bg" padding="lg">
          <Container>
            <SplitMediaText
              imageSrc={placeholderImage1}
              imageAlt="Lorem Ipsum"
              title="Sed Ut Perspiciatis Unde"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              imagePosition="left"
              variant="default"
            />
          </Container>
        </Section>

        {/* Text-Bereich */}
        <Section background="page-bg" padding="lg">
          <Container size="md">
            <div className="prose prose-lg max-w-none text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6">
                Nemo Enim Ipsam Voluptatem
              </h2>
              <p className="text-text leading-relaxed mb-6">
                Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui 
                ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
                consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore 
                magnam aliquam quaerat voluptatem.
              </p>
            </div>
          </Container>
        </Section>

        {/* TextGalerieStapel Section */}
        <Section background="page-bg" padding="lg">
          <Container>
            <TextGalerieStapel
              title="At Vero Eos Et Accusamus"
              description="Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
              images={galerieImages}
              imagePosition="right"
            />
          </Container>
        </Section>

        {/* SplitMediaText Section 2 - Bild Rechts */}
        <Section background="page-bg" padding="lg">
          <Container>
            <SplitMediaText
              imageSrc={placeholderImage2}
              imageAlt="Lorem Ipsum"
              title="Et Harum Quidem Rerum"
              description="Facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus."
              imagePosition="right"
              variant="muted"
            />
          </Container>
        </Section>

        {/* OverlayMediaText Section */}
        <Section background="page-bg" padding="lg">
          <Container>
            <OverlayMediaText
              imageSrc={placeholderImage3}
              imageAlt="Lorem Ipsum Overlay"
              title="Quis Autem Vel Eum Iure"
              description="Reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur."
              overlayOpacity={0.65}
              textPosition="center"
            />
          </Container>
        </Section>

        {/* Text-Bereich 2 */}
        <Section background="page-bg" padding="lg">
          <Container size="md">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6 text-center">
                Temporibus Autem Quibusdam
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-heading mb-3">Lorem Ipsum</h3>
                  <p className="text-text leading-relaxed">
                    Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-heading mb-3">Sed Tempor</h3>
                  <p className="text-text leading-relaxed">
                    Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-heading mb-3">Ut Enim</h3>
                  <p className="text-text leading-relaxed">
                    Ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                    consequat. Duis aute irure dolor in reprehenderit in voluptate.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-heading mb-3">Duis Aute</h3>
                  <p className="text-text leading-relaxed">
                    Irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* SplitMediaText Section 3 */}
        <Section background="page-bg" padding="lg">
          <Container>
            <SplitMediaText
              imageSrc={placeholderImage1}
              imageAlt="Lorem Ipsum"
              title="Itaque Earum Rerum Hic"
              description="Tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
              imagePosition="left"
              variant="outline"
            />
          </Container>
        </Section>

        {/* CTA Section */}
        <Section background="page-bg" padding="lg">
          <Container size="md">
            <div className="bg-gradient-to-br from-background-card to-background-tint rounded-2xl p-8 md:p-12 border border-border shadow-lg text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-heading mb-4">
                Nam Libero Tempore
              </h2>
              <p className="text-text leading-relaxed max-w-2xl mx-auto mb-6">
                Cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat 
                facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
              </p>
              <a
                href="#"
                className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out shadow-lg"
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

export default VorlageGemischt;