import React, { useRef, useEffect } from 'react';
import { Container, Section } from './LayoutComponents';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export const IconTextFeature: React.FC<IconTextFeatureProps> = ({
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

  return (
    <Section background={background} padding={padding}>
      <Container>
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
      </Container>
    </Section>
  );
};

export default IconTextFeature;