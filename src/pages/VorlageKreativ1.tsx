import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Award, Users, Clock, Star, Shield, Zap, Heart } from 'lucide-react';
import BannerAnmelden from '../components/BannerAnmelden';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// VORLAGE 3: KREATIV 1 - "Showcase & Testimonials"
// Diese Vorlage hat 2 Textabschnitte und 2 Elemente.
// Elemente: IconBadgeTextSplit (Elevated, Right), BannerMitIcons
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

// --- Inline IconBadgeTextSplit Component (Kopiert) ---
interface BadgeItem {
  icon: React.ReactNode;
  label?: string;
}

interface IconBadgeTextSplitProps {
  title: string;
  description: string;
  badges: BadgeItem[];
  background?: string;
  padding?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  badgePosition?: 'left' | 'right';
}

const IconBadgeTextSplit: React.FC<IconBadgeTextSplitProps> = ({
  title,
  description,
  badges,
  background = 'page-bg',
  padding = 'md',
  variant = 'default',
  badgePosition = 'left'
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate badges
      if (badgesRef.current?.children) {
        const badgeX = badgePosition === 'left' ? -40 : 40;
        tl.fromTo(
          Array.from(badgesRef.current.children),
          { opacity: 0, x: badgeX, scale: 0.8 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)'
          }
        );
      }

      // Animate text content
      if (textRef.current?.children) {
        tl.fromTo(
          Array.from(textRef.current.children),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power2.out'
          },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [badgePosition]);

  const variantClasses = {
    default: 'bg-transparent',
    bordered: 'bg-background-card/50 border border-border/50 rounded-2xl',
    elevated: 'bg-background-card shadow-lg rounded-2xl'
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
        <div
          ref={sectionRef}
          className={`${variantClasses[variant]} ${variant !== 'default' ? 'p-6 md:p-8 lg:p-10' : ''}`}
          style={{ willChange: 'transform, opacity' }}
        >
          <div
            className={`flex flex-col ${badgePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
          >
            {/* Badges/Icons Section */}
            <div
              ref={badgesRef}
              className="w-full lg:w-2/5 flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6"
            >
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center gap-2"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {/* Badge/Icon Container */}
                  <div className="p-4 md:p-5 rounded-2xl bg-primary/10 group-hover:bg-primary/20 border border-primary/20 group-hover:border-primary/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    {badge.icon}
                  </div>
                  {/* Optional Label */}
                  {badge.label && (
                    <span className="text-xs md:text-sm font-medium text-text-muted group-hover:text-primary transition-colors duration-300 text-center">
                      {badge.label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Text Content Section */}
            <div
              ref={textRef}
              className="w-full lg:w-3/5 flex flex-col justify-center text-center lg:text-left space-y-4"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading leading-tight">
                {title}
              </h2>
              <p className="text-text text-base md:text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Inline BannerMitIcons Component (Kopiert) ---
interface IconItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BannerMitIconsProps {
  items: IconItem[];
  background?: string;
  padding?: string;
}

const BannerMitIcons: React.FC<BannerMitIconsProps> = ({
  items,
  background = "page-bg",
  padding = "sm"
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a single timeline for all scroll animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate container
      tl.fromTo(sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      );

      // Animate icon cards with stagger
      tl.fromTo(cardRefs.current.filter(Boolean),
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out"
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    <section className={`${backgroundClasses[background] || ''} ${paddingClasses[padding] || paddingClasses.sm}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="bg-gradient-to-br from-background-card via-background-card to-background-tint rounded-2xl p-6 md:p-10 border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden" style={{ willChange: 'transform, opacity' }}>
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:20px_20px]" />
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {items.map((item, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el!)}
                className="icon-card flex flex-col items-center text-center p-4 md:p-6 rounded-xl bg-background-card/50 hover:bg-background-card transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:scale-[1.02]"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="icon-bg mb-4 p-3 md:p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-md">{item.icon}</div>
                <h4 className="text-base md:text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                <p className="text-text text-sm leading-relaxed">{item.description}</p>
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

  // Daten für IconBadgeTextSplit (Elevated, Right)
  const badgeItems: BadgeItem[] = [
    { icon: <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-primary" />, label: 'Lorem Ipsum' },
    { icon: <Award className="w-6 h-6 md:w-8 md:h-8 text-primary" />, label: 'Sed Tempor' },
    { icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />, label: 'Ut Enim' },
    { icon: <Clock className="w-6 h-6 md:w-8 md:h-8 text-primary" />, label: 'Duis Aute' }
  ];

  // Daten für BannerMitIcons
  const iconItems: IconItem[] = [
    {
      icon: <Star className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: 'Lorem Ipsum',
      description: 'Dolor sit amet consectetur adipiscing elit'
    },
    {
      icon: <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: 'Sed Tempor',
      description: 'Incididunt ut labore et dolore magna'
    },
    {
      icon: <Zap className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: 'Ut Enim',
      description: 'Ad minim veniam quis nostrud exercitation'
    },
    {
      icon: <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: 'Duis Aute',
      description: 'Irure dolor in reprehenderit voluptate'
    }
  ];

  return (
    <div className="bg-background">
      <Helmet>
        <title>Vorlage Kreativ 1 - Template</title>
        <meta name="description" content="Kreative Vorlage mit Galerie, Team und Bewertungen" />
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
              </p>
            </div>
          </Container>
        </section>

        {/* Textabschnitt 1 */}
        <section className="py-8 md:py-12 bg-background">
          <Container size="md">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6">
                Sed Ut Perspiciatis Unde
              </h2>
              <p className="text-text leading-relaxed mb-6">
                Omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
              </p>
              <p className="text-text leading-relaxed">
                Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro 
                quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia 
                non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
            </div>
          </Container>
        </section>

        {/* Element 1: IconBadgeTextSplit (Elevated, Right) */}
        <IconBadgeTextSplit
          title="At Vero Eos Et Accusamus"
          description="Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi."
          badges={badgeItems}
          background="page-bg"
          padding="md"
          variant="elevated"
          badgePosition="right"
        />

        {/* Textabschnitt 2 */}
        <section className="py-8 md:py-12 bg-background">
          <Container size="md">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6">
                Nam Libero Tempore
              </h2>
              <p className="text-text leading-relaxed mb-6">
                Cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat 
                facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem 
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.
              </p>
              <p className="text-text leading-relaxed">
                Ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur 
                a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis 
                doloribus asperiores repellat.
              </p>
            </div>
          </Container>
        </section>

        {/* Element 2: BannerMitIcons */}
        <BannerMitIcons
          items={iconItems}
          background="page-bg"
          padding="md"
        />

      {/* BannerAnmelden (importiert aus /components) */}
      <BannerAnmelden />
    </div>
  );
};

export default VorlageKreativ1;