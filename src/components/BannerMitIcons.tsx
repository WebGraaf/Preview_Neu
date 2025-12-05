import React, { useRef, useEffect } from 'react';
import { Container, Section } from './LayoutComponents';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

      // Hover effects are now handled via CSS classes
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section background={background} padding={padding}>
      <Container>
        <div ref={sectionRef} className="bg-gradient-to-br from-background-card via-background-card to-background-tint rounded-2xl p-6 md:p-10 border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden" style={{ willChange: 'transform, opacity' }}>
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:20px_20px]" />
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {items.map((item, index) => (
              <InfoCard
                key={index}
                ref={(el) => (cardRefs.current[index] = el!)}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InfoCard = React.forwardRef<HTMLDivElement, InfoCardProps>(({ icon, title, description }, ref) => {
  return (
    <div
      ref={ref}
      className="icon-card flex flex-col items-center text-center p-4 md:p-6 rounded-xl bg-background-card/50 hover:bg-background-card transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:scale-[1.02]"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="icon-bg mb-4 p-3 md:p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-md">{icon}</div>
      <h4 className="text-base md:text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors duration-300">{title}</h4>
      <p className="text-text text-sm leading-relaxed">{description}</p>
    </div>
  );
});

InfoCard.displayName = 'InfoCard';

export default BannerMitIcons;