import React, { useRef, useEffect } from 'react';
import { Container, Section } from './LayoutComponents';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export const IconBadgeTextSplit: React.FC<IconBadgeTextSplitProps> = ({
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

  return (
    <Section background={background} padding={padding}>
      <Container>
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
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-heading leading-tight">
                {title}
              </h2>
              <p className="text-text text-base md:text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default IconBadgeTextSplit;