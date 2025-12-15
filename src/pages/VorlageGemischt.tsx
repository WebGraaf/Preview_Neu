import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, MapPin, Phone, Mail, Star, Shield, Zap, Heart } from 'lucide-react';
import BannerAnmelden from '../components/BannerAnmelden';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// VORLAGE 2: GEMISCHT (50/50)
// Diese Vorlage hat 2 Textabschnitte und 2 Elemente.
// Elemente: IconTextFeature, IconTextList (NEU)
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

// --- Inline IconTextFeature Component (Kopiert) ---
interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface IconTextFeatureProps {
  title?: string;
  subtitle?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  background?: string;
  padding?: string;
  variant?: 'default' | 'bordered' | 'elevated';
}

const IconTextFeature: React.FC<IconTextFeatureProps> = ({
  title,
  subtitle,
  features,
  columns = 3,
  background = 'page-bg',
  padding = 'md',
  variant = 'default'
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate header
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }

      // Animate feature cards with stagger
      tl.fromTo(
        featureRefs.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out'
        },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  const variantClasses = {
    default: 'bg-transparent',
    bordered: 'bg-background-card/50 border border-border/50 rounded-xl',
    elevated: 'bg-background-card shadow-md rounded-xl'
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

  const paddingClasses: Record<string, string> = {
    none: 'py-0',
    xs: 'py-4 sm:py-6',
    sm: 'py-6 sm:py-8',
    md: 'py-8 sm:py-10',
    lg: 'py-10 sm:py-12',
    xl: 'py-12 sm:py-16'
  };

  return (
    <section className={`${backgroundClasses[background] || ''} ${paddingClasses[padding] || paddingClasses.md}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} style={{ willChange: 'transform, opacity' }}>
          {/* Header */}
          {(title || subtitle) && (
            <div ref={headerRef} className="text-center mb-10 md:mb-12">
              {title && (
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading mb-3">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-text text-base md:text-lg max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Features Grid */}
          <div className={`grid ${columnClasses[columns]} gap-6 md:gap-8`}>
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => (featureRefs.current[index] = el!)}
                className={`group p-6 md:p-8 ${variantClasses[variant]} transition-all duration-300 hover:-translate-y-1`}
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 md:p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-heading mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-text text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Inline IconTextList Component (Kopiert) ---
interface ListItem {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

interface IconTextListProps {
  title?: string;
  items: ListItem[];
  background?: string;
  padding?: string;
  variant?: 'default' | 'compact' | 'card';
  iconPosition?: 'left' | 'top';
}

const IconTextList: React.FC<IconTextListProps> = ({
  title,
  items,
  background = 'page-bg',
  padding = 'md',
  variant = 'default',
  iconPosition = 'left'
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate title
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
        );
      }

      // Animate list items with stagger
      tl.fromTo(
        itemRefs.current.filter(Boolean),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out'
        },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const variantClasses = {
    default: '',
    compact: 'py-3',
    card: 'p-4 md:p-5 bg-background-card/50 rounded-xl border border-border/30 hover:border-primary/30 hover:shadow-md'
  };

  const containerClasses = {
    default: 'space-y-4 md:space-y-5',
    compact: 'space-y-2 md:space-y-3',
    card: 'space-y-4 md:space-y-5'
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

  const paddingClasses: Record<string, string> = {
    none: 'py-0',
    xs: 'py-4 sm:py-6',
    sm: 'py-6 sm:py-8',
    md: 'py-8 sm:py-10',
    lg: 'py-10 sm:py-12',
    xl: 'py-12 sm:py-16'
  };

  return (
    <section className={`${backgroundClasses[background] || ''} ${paddingClasses[padding] || paddingClasses.md}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} style={{ willChange: 'transform, opacity' }}>
          {/* Title */}
          {title && (
            <h2
              ref={titleRef}
              className="text-2xl md:text-3xl font-bold text-heading mb-6 md:mb-8"
            >
              {title}
            </h2>
          )}

          {/* List Items */}
          <div className={containerClasses[variant]}>
            {items.map((item, index) => (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el!)}
                className={`group flex ${iconPosition === 'top' ? 'flex-col items-start' : 'flex-row items-start'} gap-4 ${variantClasses[variant]} transition-all duration-300`}
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Icon */}
                <div
                  className={`flex-shrink-0 p-2.5 md:p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-105 ${iconPosition === 'top' ? 'mb-1' : ''}`}
                >
                  {item.icon}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-semibold text-heading group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1 text-text text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
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

  // Daten für IconTextFeature
  const featureItems: FeatureItem[] = [
    {
      icon: <Clock className="w-7 h-7 text-primary" />,
      title: 'Lorem Ipsum',
      description: 'Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'
    },
    {
      icon: <MapPin className="w-7 h-7 text-primary" />,
      title: 'Sed Tempor',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
    },
    {
      icon: <Phone className="w-7 h-7 text-primary" />,
      title: 'Ut Enim',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.'
    },
    {
      icon: <Mail className="w-7 h-7 text-primary" />,
      title: 'Duis Aute',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.'
    },
    {
      icon: <Star className="w-7 h-7 text-primary" />,
      title: 'Excepteur Sint',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.'
    },
    {
      icon: <Shield className="w-7 h-7 text-primary" />,
      title: 'Nemo Enim',
      description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur adipisci.'
    }
  ];

  // Daten für IconTextList
  const listItems: ListItem[] = [
    {
      icon: <Zap className="w-5 h-5 text-primary" />,
      title: 'Lorem Ipsum Dolor',
      description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      icon: <Heart className="w-5 h-5 text-primary" />,
      title: 'Sed Ut Perspiciatis',
      description: 'Unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
    },
    {
      icon: <Star className="w-5 h-5 text-primary" />,
      title: 'Nemo Enim Ipsam',
      description: 'Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.'
    },
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      title: 'At Vero Eos',
      description: 'Et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.'
    }
  ];

  return (
    <div className="bg-background">
      <Helmet>
        <title>Vorlage Gemischt - Template</title>
        <meta name="description" content="Gemischte Vorlage mit 50/50 Text und Medien" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

        {/* Hero/Header Section - gleiche Abstände wie UeberUns */}
        <section className="py-8 md:py-12 bg-background">
          <Container size="md">
            <div ref={headerRef} className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-6 tracking-tight">
                Lorem Ipsum Dolor
              </h1>
              <p className="text-lg md:text-xl text-text leading-relaxed">
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
            </div>
          </Container>
        </section>

        {/* Textabschnitt 1 */}
        <section className="py-8 md:py-12 bg-background">
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
        </section>

        {/* Element 1: IconTextFeature */}
        <IconTextFeature
          title="Unsere Leistungen"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt."
          features={featureItems}
          columns={3}
          background="page-bg"
          padding="md"
          variant="elevated"
        />

        {/* Textabschnitt 2 */}
        <section className="py-8 md:py-12 bg-background">
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
              </div>
            </div>
          </Container>
        </section>

      {/* Element 2: IconTextList (NEU) */}
      <IconTextList
        title="Unsere Vorteile"
        items={listItems}
        background="page-bg"
        padding="md"
        variant="card"
        iconPosition="left"
      />

      {/* BannerAnmelden (importiert aus /components) */}
      <BannerAnmelden />
    </div>
  );
};

export default VorlageGemischt;