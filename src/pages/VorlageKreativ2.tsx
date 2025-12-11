import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// VORLAGE 4: KREATIV 2 - "Landing Page Style"
// Diese Vorlage hat ein modernes Landing-Page-Design mit Hero, Features,
// Standorten und Kontakt-Bereich.
// Ideal für: Landing Pages, Produkt-Launches, Marketing-Seiten
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

// --- Inline OverlayMediaText (Hero Style) Component ---
interface HeroOverlayProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  overlayOpacity?: number;
  className?: string;
}

const HeroOverlay: React.FC<HeroOverlayProps> = ({
  imageSrc,
  imageAlt = '',
  title,
  subtitle,
  description,
  buttonText,
  buttonLink = '#',
  overlayOpacity = 0.7,
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
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      tl.fromTo(".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      );

      tl.fromTo(".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      tl.fromTo(".hero-description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );

      tl.fromTo(".hero-button",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden min-h-[500px] md:min-h-[600px] shadow-2xl group ${className}`}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"
        style={{ opacity: overlayOpacity }}
      />
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 py-16">
        <div className="max-w-2xl">
          {subtitle && (
            <span className="hero-subtitle inline-block text-primary-400 font-semibold text-sm md:text-base uppercase tracking-wider mb-4">
              {subtitle}
            </span>
          )}
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {title}
          </h1>
          <p className="hero-description text-white/90 text-lg md:text-xl leading-relaxed mb-8 drop-shadow-md">
            {description}
          </p>
          {buttonText && (
            <a
              href={buttonLink}
              className="hero-button inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out shadow-lg group"
            >
              {buttonText}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Inline Feature Cards Component ---
interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureCardsProps {
  features: FeatureCard[];
  title?: string;
  subtitle?: string;
}

const FeatureCards: React.FC<FeatureCardsProps> = ({
  features,
  title,
  subtitle
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      if (title) {
        tl.fromTo(".feature-title",
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
      }

      tl.fromTo(cardRefs.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out"
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [title]);

  return (
    <div ref={sectionRef}>
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="feature-title text-3xl md:text-4xl font-bold text-heading mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg text-text max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el!)}
            className="bg-background-card rounded-2xl p-6 md:p-8 border border-border shadow-lg hover:shadow-xl hover:border-primary-200 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-heading mb-3 group-hover:text-primary transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-text leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Inline Standorte Component ---
interface Standort {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

interface StandorteProps {
  standorte: Standort[];
  title?: string;
}

const Standorte: React.FC<StandorteProps> = ({
  standorte,
  title = 'Unsere Standorte'
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(".standorte-title",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      tl.fromTo(cardRefs.current.filter(Boolean),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out"
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <h2 className="standorte-title text-3xl md:text-4xl font-bold text-heading mb-8 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {standorte.map((standort, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el!)}
            className="bg-background-card rounded-2xl p-6 md:p-8 border border-border shadow-lg hover:shadow-xl hover:border-primary-200 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-heading mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {standort.name}
            </h3>
            <div className="space-y-3 text-text">
              <p className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neutral-400 mt-1 flex-shrink-0" />
                <span>{standort.address}</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <a href={`tel:${standort.phone}`} className="hover:text-primary transition-colors">
                  {standort.phone}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <a href={`mailto:${standort.email}`} className="hover:text-primary transition-colors">
                  {standort.email}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-neutral-400 mt-1 flex-shrink-0" />
                <span>{standort.hours}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Inline Accordion/FAQ Component ---
interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  title?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  title
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      if (title) {
        tl.fromTo(".accordion-title",
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
      }

      tl.fromTo(itemRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out"
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [title]);

  return (
    <div ref={sectionRef}>
      {title && (
        <h2 className="accordion-title text-3xl md:text-4xl font-bold text-heading mb-8 text-center">{title}</h2>
      )}
      <div className="space-y-4 max-w-3xl mx-auto">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el!)}
              className="bg-background-card rounded-xl border border-border overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-50/50 transition-colors duration-200 group"
              >
                <span className="font-semibold text-heading text-lg pr-4 group-hover:text-primary transition-colors duration-200">
                  {item.title}
                </span>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-200">
                  <ChevronDown
                    className={`w-5 h-5 text-primary-600 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                  />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-5 text-text leading-relaxed border-t border-neutral-100 pt-4">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Inline Bild-Vergleich Component (Simplified) ---
interface BildVergleichProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BildVergleich: React.FC<BildVergleichProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Vorher',
  afterLabel = 'Nachher'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div ref={containerRef} className="relative rounded-2xl overflow-hidden shadow-xl aspect-video max-w-4xl mx-auto">
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${100 / (sliderPosition / 100)}%`, maxWidth: 'none' }}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="flex gap-0.5">
            <ChevronDown className="w-4 h-4 text-neutral-600 -rotate-90" />
            <ChevronDown className="w-4 h-4 text-neutral-600 rotate-90" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
        {beforeLabel}
      </div>
      <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
        {afterLabel}
      </div>

      {/* Slider Input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
    </div>
  );
};

// ============================================================================
// HAUPTKOMPONENTE
// ============================================================================

const VorlageKreativ2: React.FC = () => {
  // Placeholder Bilder
  const placeholderImage1 = '/default_images/Platzhalter_Fahrschule.webp';
  const placeholderImage2 = '/default_images/Platzhalter_Furhpark.webp';
  const placeholderImage3 = '/default_images/Platzhalter_Gruppenbild_Team.webp';

  // Feature-Daten
  const features: FeatureCard[] = [
    {
      icon: <Clock className="w-7 h-7 text-primary" />,
      title: 'Lorem Ipsum',
      description: 'Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      icon: <MapPin className="w-7 h-7 text-primary" />,
      title: 'Sed Tempor',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      icon: <Phone className="w-7 h-7 text-primary" />,
      title: 'Ut Enim',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      icon: <Mail className="w-7 h-7 text-primary" />,
      title: 'Duis Aute',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      icon: <ArrowRight className="w-7 h-7 text-primary" />,
      title: 'Excepteur Sint',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
    },
    {
      icon: <ChevronDown className="w-7 h-7 text-primary" />,
      title: 'Nemo Enim',
      description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.'
    }
  ];

  // Standorte-Daten
  const standorte: Standort[] = [
    {
      name: 'Lorem Ipsum Zentrum',
      address: 'Musterstraße 123, 12345 Musterstadt',
      phone: '+49 123 456789',
      email: 'lorem@ipsum.de',
      hours: 'Mo-Fr: 09:00-18:00, Sa: 10:00-14:00'
    },
    {
      name: 'Sed Tempor Filiale',
      address: 'Beispielweg 456, 67890 Beispielstadt',
      phone: '+49 987 654321',
      email: 'sed@tempor.de',
      hours: 'Mo-Fr: 10:00-19:00, Sa: 09:00-13:00'
    }
  ];

  // Accordion-Daten
  const accordionItems: AccordionItem[] = [
    {
      title: 'Lorem ipsum dolor sit amet?',
      content: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      title: 'Ut enim ad minim veniam?',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      title: 'Duis aute irure dolor?',
      content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    },
    {
      title: 'Excepteur sint occaecat?',
      content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
    }
  ];

  return (
    <Layout>
      <div className="bg-background">
        <Helmet>
          <title>Vorlage Kreativ 2 - Template</title>
          <meta name="description" content="Kreative Landing-Page Vorlage" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        {/* Hero Section */}
        <Section background="page-bg" padding="lg">
          <Container>
            <HeroOverlay
              imageSrc={placeholderImage3}
              imageAlt="Hero Image"
              subtitle="Lorem Ipsum"
              title="Dolor Sit Amet Consectetur"
              description="Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
              buttonText="Jetzt Starten"
              buttonLink="#"
            />
          </Container>
        </Section>

        {/* Features Section */}
        <Section background="page-bg" padding="xl">
          <Container>
            <FeatureCards
              features={features}
              title="Unsere Leistungen"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt."
            />
          </Container>
        </Section>

        {/* Bild-Vergleich Section */}
        <Section background="page-bg" padding="lg">
          <Container>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">Vorher & Nachher</h2>
              <p className="text-lg text-text max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <BildVergleich
              beforeImage={placeholderImage1}
              afterImage={placeholderImage2}
              beforeLabel="Vorher"
              afterLabel="Nachher"
            />
          </Container>
        </Section>

        {/* Text + Stats Section */}
        <Section background="card-tint" padding="xl">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6">
                  Sed Ut Perspiciatis Unde Omnis
                </h2>
                <p className="text-text leading-relaxed mb-6">
                  Iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                  eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="text-text leading-relaxed">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
                  consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-background-card rounded-2xl p-6 text-center shadow-lg border border-border">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                  <div className="text-text">Lorem Ipsum</div>
                </div>
                <div className="bg-background-card rounded-2xl p-6 text-center shadow-lg border border-border">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
                  <div className="text-text">Sed Tempor</div>
                </div>
                <div className="bg-background-card rounded-2xl p-6 text-center shadow-lg border border-border">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">25+</div>
                  <div className="text-text">Ut Enim</div>
                </div>
                <div className="bg-background-card rounded-2xl p-6 text-center shadow-lg border border-border">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-text">Duis Aute</div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Standorte Section */}
        <Section background="page-bg" padding="xl">
          <Container>
            <Standorte standorte={standorte} title="Unsere Standorte" />
          </Container>
        </Section>

        {/* FAQ/Accordion Section */}
        <Section background="page-bg" padding="xl">
          <Container>
            <Accordion items={accordionItems} title="Häufig Gestellte Fragen" />
          </Container>
        </Section>

        {/* Final CTA Section */}
        <Section background="page-bg" padding="xl">
          <Container size="md">
            <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-3xl p-8 md:p-16 shadow-2xl text-center text-white overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Bereit Loszulegen?
                </h2>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out shadow-lg"
                  >
                    Jetzt Starten
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 ease-out"
                  >
                    Mehr Erfahren
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </Layout>
  );
};

export default VorlageKreativ2;