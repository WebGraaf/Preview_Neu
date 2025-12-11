import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, BookOpen, Award, Users, Clock } from 'lucide-react';
import Layout from '../components/Layout';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// VORLAGE 1: TEXT-FOKUS
// Diese Vorlage ist primär textbasiert mit nur 1-2 visuellen Elementen.
// Ideal für: Impressum, Datenschutz, AGB, Blog-Artikel, Informationsseiten
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

// --- Inline FAQ Component ---
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  faqs: FAQItem[];
  defaultOpenIndex?: number | null;
}

const FAQ: React.FC<FAQProps> = ({ title = "Häufig gestellte Fragen", faqs, defaultOpenIndex = null }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(defaultOpenIndex);
  const sectionRef = useRef<HTMLElement>(null);
  const faqRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const items = faqRefs.current.filter(Boolean);
    
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(".faq-title",
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }
    );

    if (items.length > 0) {
      tl.fromTo(items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out"
        },
        "-=0.3"
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="faq-title text-4xl font-bold text-heading mb-4 will-change-transform">
            {title}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                ref={(el) => (faqRefs.current[index] = el!)}
                className="faq-item bg-background-card rounded-xl shadow-md border border-neutral-200 overflow-hidden hover:border-primary-200 hover:shadow-lg transition-all duration-300 will-change-transform"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-50/50 transition-colors duration-200 group"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-heading text-lg pr-4 group-hover:text-primary-600 transition-colors duration-200">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-200">
                    <ChevronDown
                      className={`faq-chevron w-5 h-5 text-primary-600 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </div>
                </button>
                <div
                  className={`faq-content overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-5 text-text leading-relaxed border-t border-neutral-100 pt-4 mx-6 mb-1">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Inline Banner mit Icons Component ---
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      );

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

  return (
    <Section background={background} padding={padding}>
      <Container>
        <div ref={sectionRef} className="bg-gradient-to-br from-background-card via-background-card to-background-tint rounded-2xl p-6 md:p-10 border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden" style={{ willChange: 'transform, opacity' }}>
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
      </Container>
    </Section>
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
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Lorem Ipsum Daten für FAQ
  const faqs: FAQItem[] = [
    {
      question: 'Lorem ipsum dolor sit amet consectetur?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
    },
    {
      question: 'Ut enim ad minim veniam quis nostrud?',
      answer: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      question: 'Excepteur sint occaecat cupidatat non proident?',
      answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    },
    {
      question: 'Nemo enim ipsam voluptatem quia voluptas?',
      answer: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
    }
  ];

  // Icon-Banner Daten (das einzige visuelle Element mit Icons)
  const iconItems: IconItem[] = [
    {
      icon: <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: 'Lorem Ipsum',
      description: 'Dolor sit amet consectetur adipiscing elit'
    },
    {
      icon: <Award className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: 'Sed Tempor',
      description: 'Incididunt ut labore et dolore magna'
    },
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: 'Ut Enim',
      description: 'Ad minim veniam quis nostrud exercitation'
    },
    {
      icon: <Clock className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      title: 'Duis Aute',
      description: 'Irure dolor in reprehenderit voluptate'
    }
  ];

  return (
    <Layout>
      <div className="bg-background">
        <Helmet>
          <title>Vorlage Text-Fokus - Template</title>
          <meta name="description" content="Text-fokussierte Vorlage für Informationsseiten" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        {/* Hero/Header Section - Nur Text */}
        <Section background="page-bg" padding="xl">
          <Container size="md">
            <div ref={headerRef} className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-6 tracking-tight">
                Lorem Ipsum Dolor Sit Amet
              </h1>
              <p className="text-lg md:text-xl text-text leading-relaxed max-w-3xl mx-auto">
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </Container>
        </Section>

        {/* Haupttext-Bereich 1 */}
        <Section background="page-bg" padding="lg">
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
              <p className="text-text leading-relaxed mb-6">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id 
                est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto 
                beatae vitae dicta sunt explicabo.
              </p>
              <p className="text-text leading-relaxed">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur 
                magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum 
                quia dolor sit amet, consectetur, adipisci velit.
              </p>
            </div>
          </Container>
        </Section>

        {/* Icon-Banner (einziges visuelles Element) */}
        <BannerMitIcons items={iconItems} />

        {/* Haupttext-Bereich 2 */}
        <Section background="page-bg" padding="lg">
          <Container size="md">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6">
                Sed Ut Perspiciatis Unde
              </h2>
              <p className="text-text leading-relaxed mb-6">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum 
                deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non 
                provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
              </p>
              
              <h3 className="text-2xl md:text-3xl font-bold text-heading mb-4 mt-8">
                Et Harum Quidem Rerum
              </h3>
              <p className="text-text leading-relaxed mb-6">
                Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod 
                maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus 
                autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates 
                repudiandae sint et molestiae non recusandae.
              </p>

              <h3 className="text-2xl md:text-3xl font-bold text-heading mb-4 mt-8">
                Itaque Earum Rerum Hic
              </h3>
              <p className="text-text leading-relaxed mb-6">
                Tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut 
                perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <ul className="list-disc list-inside text-text space-y-2 mb-6">
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                <li>Sed do eiusmod tempor incididunt ut labore et dolore</li>
                <li>Ut enim ad minim veniam, quis nostrud exercitation</li>
                <li>Duis aute irure dolor in reprehenderit in voluptate</li>
                <li>Excepteur sint occaecat cupidatat non proident</li>
              </ul>

              <p className="text-text leading-relaxed">
                Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis 
                iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
              </p>
            </div>
          </Container>
        </Section>

        {/* FAQ Section */}
        <FAQ 
          title="Häufig Gestellte Fragen" 
          faqs={faqs} 
        />

        {/* Abschluss-Text */}
        <Section background="page-bg" padding="lg">
          <Container size="md">
            <div className="bg-gradient-to-br from-background-card to-background-tint rounded-2xl p-8 md:p-12 border border-border shadow-lg text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-heading mb-4">
                Quis Autem Vel Eum
              </h2>
              <p className="text-text leading-relaxed max-w-2xl mx-auto mb-6">
                Iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum 
                qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio 
                dignissimos ducimus qui blanditiis praesentium.
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

export default VorlageTextFokus;