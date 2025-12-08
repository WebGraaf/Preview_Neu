import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container, Section } from './LayoutComponents';
import { useTrail, animated } from '@react-spring/web';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: object;
  animationTo?: object;
  easing?: string;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  tag?: keyof JSX.IntrinsicElements;
}

// Optimized: Word-by-word animation instead of letter-by-letter for better performance
const AnimatedText: React.FC<AnimatedTextProps> = ({
  text = '',
  className = '',
  delay = 50, // Increased delay for word animation
  animationFrom = { opacity: 0, transform: 'translate3d(0,20px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag: Tag = 'p',
}) => {
  // Split into words instead of letters for fewer DOM updates
  const words = useMemo(() => text.split(' ').filter(word => word.length > 0), [text]);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  // Animate words instead of letters - significantly fewer animated elements
  const trail = useTrail(words.length, {
    from: animationFrom,
    to: inView ? animationTo : animationFrom,
    delay: (i: number) => 800 + i * delay,
    config: { tension: 280, friction: 20 }, // Simpler spring config
  });

  const textStyle: React.CSSProperties = {
    textAlign,
    whiteSpace: 'pre-line',
    wordWrap: 'break-word',
    lineHeight: '1.2',
  };

  return React.createElement(
    Tag,
    {
      ref,
      className: `split-parent inline ${className}`,
      style: textStyle,
    },
    words.map((word, wordIndex) => (
      React.createElement(
        animated.span,
        {
          key: wordIndex,
          style: {
            ...trail[wordIndex],
            display: 'inline-block',
            whiteSpace: 'nowrap',
            willChange: 'transform, opacity',
            marginRight: wordIndex < words.length - 1 ? '0.3em' : 0,
          },
        },
        word
      )
    ))
  );
};

interface HeroStartseiteProps {
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  logoSrc: string;
  logoAlt: string;
  background?: 'transparent' | 'white' | 'neutral' | 'gradient' | 'blue' | 'page-bg';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const HeroStartseite: React.FC<HeroStartseiteProps> = ({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink,
  logoSrc,
  logoAlt,
  background = 'transparent',
  padding = 'md',
  className = '',
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optimized: Removed filter:blur (not GPU-accelerated), using only transform and opacity
      gsap.fromTo(imageRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -45,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          x: 0,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out", // Simpler easing instead of elastic.out
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Section background={background} padding={padding} className={className}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8 items-center">
          <div className="col-span-1 md:col-span-5 text-left order-2 md:order-1">
            <div className="flex flex-col justify-start items-start">
              <AnimatedText
                text={title}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-left max-w-2xl text-heading"
                textAlign="left"
                delay={30}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.3}
                rootMargin="-100px"
                tag="h1"
              />
              {subtitle && (
                <AnimatedText
                  text={subtitle}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-left max-w-2xl text-primary-500"
                  textAlign="left"
                  delay={30}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  easing="easeOutCubic"
                  threshold={0.3}
                  rootMargin="-100px"
                />
              )}
            </div>
            <p className="text-lg md:text-xl text-text mb-8 animate-in fade-in slide-in-from-bottom-6 duration-900 drop-shadow-sm">
              {description}
            </p>
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <Link
                to={buttonLink}
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-primary-500 text-white rounded-xl font-semibold
                  overflow-hidden transition-all duration-300 shadow-lg shadow-primary-500/25
                  hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5 hover:scale-[1.02]
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  active:scale-[0.98] active:shadow-md
                  inline-flex items-center gap-2 text-sm md:text-base min-h-[44px]"
              >
                <span className="relative z-10">{buttonText}</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center justify-center order-1 md:order-2">
            <img
              ref={imageRef}
              src={logoSrc}
              alt={logoAlt}
              className="h-auto max-w-xs md:max-w-sm"
              style={{
                opacity: 0,
                transform: 'scale(0.5) rotate(-45deg) translateY(50px)',
                willChange: 'transform, opacity', // GPU hint for animation
              }}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};