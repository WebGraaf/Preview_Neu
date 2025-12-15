import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Award, Users, Clock, CheckCircle, Star } from 'lucide-react';
import BannerAnmelden from '../components/BannerAnmelden';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// VORLAGE 1: TEXT-FOKUS
// Diese Vorlage ist primär textbasiert mit 2 Textabschnitten und 2 Elementen.
// Elemente: IconBadgeTextSplit (NEU), IconListTextSplit (NEU)
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

// --- Inline IconListTextSplit Component (Kopiert) ---
interface IconListItem {
  icon: React.ReactNode;
  text: string;
}

interface IconListTextSplitProps {
  title: string;
  description: string;
  items: IconListItem[];
  background?: string;
  padding?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  listPosition?: 'left' | 'right';
}

const IconListTextSplit: React.FC<IconListTextSplitProps> = ({
  title,
  description,
  items,
  background = 'page-bg',
  padding = 'md',
  variant = 'default',
  listPosition = 'left'
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
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

      // Animate list items
      if (listRef.current?.children) {
        const listX = listPosition === 'left' ? -30 : 30;
        tl.fromTo(
          Array.from(listRef.current.children),
          { opacity: 0, x: listX },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out'
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
  }, [listPosition]);

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
            className={`flex flex-col ${listPosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-stretch`}
          >
            {/* Icon List Section - 50% */}
            <div
              ref={listRef}
              className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 md:space-y-5"
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {/* Icon Container */}
                  <div className="flex-shrink-0 p-3 md:p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 border border-primary/20 group-hover:border-primary/40 transition-all duration-300 group-hover:scale-105">
                    {item.icon}
                  </div>
                  {/* Text */}
                  <p className="text-text text-sm md:text-base leading-relaxed group-hover:text-heading transition-colors duration-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Text Content Section - 50% */}
            <div
              ref={textRef}
              className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left space-y-4"
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

// ============================================================================
// HAUPTKOMPONENTE
// ============================================================================

const VorlageTextFokus: React.FC = () => {
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

  // Daten für IconBadgeTextSplit
  const badgeItems: BadgeItem[] = [
    { icon: <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-primary" />, label: 'Lorem Ipsum' },
    { icon: <Award className="w-6 h-6 md:w-8 md:h-8 text-primary" />, label: 'Sed Tempor' },
    { icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />, label: 'Ut Enim' },
    { icon: <Clock className="w-6 h-6 md:w-8 md:h-8 text-primary" />, label: 'Duis Aute' }
  ];

  // Daten für IconListTextSplit
  const listItems: IconListItem[] = [
    { icon: <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-primary" />, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { icon: <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-primary" />, text: 'Sed do eiusmod tempor incididunt ut labore et dolore.' },
    { icon: <Star className="w-5 h-5 md:w-6 md:h-6 text-primary" />, text: 'Ut enim ad minim veniam, quis nostrud exercitation.' },
    { icon: <Star className="w-5 h-5 md:w-6 md:h-6 text-primary" />, text: 'Duis aute irure dolor in reprehenderit in voluptate.' }
  ];

  return (
    <div className="bg-background">
      <Helmet>
        <title>Vorlage Text-Fokus - Template</title>
        <meta name="description" content="Text-fokussierte Vorlage für Informationsseiten" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

        {/* Hero/Header Section - gleiche Abstände wie UeberUns */}
        <section className="py-8 md:py-12 bg-background">
          <Container size="md">
            <div ref={headerRef} className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-6 tracking-tight">
                Lorem Ipsum Dolor Sit Amet
              </h1>
              <p className="text-lg md:text-xl text-text leading-relaxed">
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </Container>
        </section>

        {/* Textabschnitt 1 */}
        <section className="py-8 md:py-12 bg-background">
          <Container size="md">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6">
                Duis Aute Irure Dolor
              </h2>
              <p className="text-text leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
                cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="text-text leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id 
                est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto 
                beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </Container>
        </section>

        {/* Element 1: IconBadgeTextSplit (NEU) */}
        <IconBadgeTextSplit
          title="Unsere Leistungen"
          description="Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
          badges={badgeItems}
          background="page-bg"
          padding="md"
          variant="default"
          badgePosition="left"
        />

        {/* Textabschnitt 2 */}
        <section className="py-8 md:py-12 bg-background">
          <Container size="md">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6">
                At Vero Eos Et Accusamus
              </h2>
              <p className="text-text leading-relaxed mb-6">
                Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
                quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt 
                in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
              </p>
              <p className="text-text leading-relaxed">
                Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod 
                maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus 
                autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates 
                repudiandae sint et molestiae non recusandae.
              </p>
            </div>
          </Container>
        </section>

        {/* Element 2: IconListTextSplit (NEU) */}
        <IconListTextSplit
          title="Et Harum Quidem Rerum"
          description="Tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          items={listItems}
          background="page-bg"
          padding="md"
          variant="default"
          listPosition="right"
        />

      {/* BannerAnmelden (importiert aus /components) */}
      <BannerAnmelden />
    </div>
  );
};

export default VorlageTextFokus;