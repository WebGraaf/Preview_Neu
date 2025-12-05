import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Subclass {
  code: string;
  description: string;
}

interface Tab {
  label: string;
  title: string;
  content: string;
  link: string;
  subclasses: Subclass[];
}

interface KlassenUebersichtProps {
  title?: string;
  subtitle?: string;
  tabs?: Tab[];
  buttonText?: string;
}

export function KlassenUebersicht({
  title = "Führerschein Klassen",
  subtitle = "Erfahren Sie mehr über die verschiedenen Führerschein-Klassen",
  buttonText = "Mehr erfahren",
  tabs = []
}: KlassenUebersichtProps) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLButtonElement[]>([]);

  // State for CSS transition
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const tabs = tabsRef.current.filter(Boolean);
    const content = contentRef.current;
    
    if (!section) return;

    // Create single consolidated timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate title and subtitle together
    tl.fromTo(".overview-title",
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }
    )
    .fromTo(".overview-subtitle",
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.4" // Overlap
    );

    // Animate tabs
    if (tabs.length > 0) {
      tl.fromTo(tabs,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out"
        },
        "-=0.3"
      );
    }

    // Animate content container - simplified, no scale
    if (content) {
      tl.fromTo(content,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out"
        },
        "-=0.2"
      );
    }

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handleTabChange = (index: number) => {
    if (index === activeTab || isTransitioning) return;
    
    // Use CSS transitions instead of GSAP for tab changes
    setIsTransitioning(true);
    
    // Wait for fade out, then change tab
    setTimeout(() => {
      setActiveTab(index);
      // Wait for state update, then fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  if (tabs.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="overview-title text-3xl md:text-4xl font-bold text-heading mb-4">
            {title}
          </h2>
          <p className="overview-subtitle text-base md:text-lg text-text max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Improved tab styling with pill-style background */}
        <div className="flex flex-wrap gap-1 justify-center mb-8 p-1.5 bg-neutral-100 rounded-xl max-w-fit mx-auto">
          {tabs.map((tab, index) => {
            return (
              <button
                key={index}
                ref={(el) => (tabsRef.current[index] = el!)}
                onClick={() => handleTabChange(index)}
                className={`tab-button flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 font-semibold rounded-lg transition-all duration-300 min-h-[44px] ${
                  activeTab === index
                    ? 'text-white bg-primary-500 shadow-md'
                    : 'text-text hover:text-heading hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Enhanced content container with CSS transitions for tab changes */}
        <div
          ref={contentRef}
          className={`content-container bg-background-card rounded-2xl p-5 md:p-12 min-h-[300px] shadow-lg
            border border-border/50 hover:shadow-xl hover:border-primary-200/50 transition-all duration-300 will-change-transform
            ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-heading mb-4">
            {tabs[activeTab].title}
          </h3>
          <p className="text-base md:text-lg text-text leading-relaxed mb-6">
            {tabs[activeTab].content}
          </p>
          <div className="space-y-3">
            {tabs[activeTab].subclasses.map((subclass, index) => (
              <div
                key={index}
                className="group p-3 rounded-lg hover:bg-primary-50/50 transition-colors duration-200"
              >
                {/* Desktop layout: inline */}
                <div className="hidden sm:flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-bold text-heading group-hover:text-primary-600 transition-colors">{subclass.code}</span>
                  <span className="text-text">- {subclass.description}</span>
                </div>
                {/* Mobile layout: stacked */}
                <div className="flex flex-col gap-2 sm:hidden">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span className="font-bold text-heading">{subclass.code}</span>
                  </div>
                  <span className="text-text text-sm pl-8">- {subclass.description}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to={tabs[activeTab].link}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-xl
                hover:bg-primary-600 hover:text-white transition-all duration-300 font-semibold
                hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                active:scale-[0.98] min-h-[44px]"
            >
              {buttonText}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}