import React, { useRef, useEffect } from 'react';
import { Container, Section } from './LayoutComponents';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export const IconListTextSplit: React.FC<IconListTextSplitProps> = ({
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

  return (
    <Section background={background} padding={padding}>
      <Container>
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
                  <p className="text-text text-sm md:text-base leading-relaxed group-hover:text-text-heading transition-colors duration-300">
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

export default IconListTextSplit;