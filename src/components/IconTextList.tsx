import React, { useRef, useEffect } from 'react';
import { Container, Section } from './LayoutComponents';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export const IconTextList: React.FC<IconTextListProps> = ({
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

  return (
    <Section background={background} padding={padding}>
      <Container>
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
      </Container>
    </Section>
  );
};

export default IconTextList;