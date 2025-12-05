import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  faqs: FAQItem[];
  defaultOpenIndex?: number | null;
}

export function FAQ({ title = "Häufig gestellte Fragen", faqs, defaultOpenIndex = null }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const sectionRef = useRef<HTMLElement>(null);
  const faqRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const items = faqRefs.current.filter(Boolean);
    
    if (!section) return;

    // Create single consolidated timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate title
    tl.fromTo(".faq-title",
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }
    );

    // Animate FAQ items with stagger - simplified, no scale
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

  const handleToggle = (index: number) => {
    // Simply toggle state - CSS handles the animation via max-height transition
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
                {/* CSS-based accordion with max-height transition - more performant than GSAP height animation */}
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
}