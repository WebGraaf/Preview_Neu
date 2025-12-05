import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  name: string;
  role: string;
  initials: string;
  rating: number;
  text: string;
}

interface BewertungenProps {
  testimonials?: Testimonial[];
  title?: string;
}

const Bewertungen: React.FC<BewertungenProps> = ({
  testimonials = [
    {
      name: 'Alexandra Mueller',
      role: 'Product Manager',
      initials: 'AM',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.',
    },
    {
      name: 'Marcus Schmidt',
      role: 'Tech Lead',
      initials: 'MS',
      rating: 5,
      text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    },
    {
      name: 'Sarah Johnson',
      role: 'Designer',
      initials: 'SJ',
      rating: 4,
      text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.',
    },
  ],
  title = 'Bewertungen'
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = testimonialRefs.current.filter(Boolean);
    
    if (!section || cards.length === 0) return;

    // Create single consolidated timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate title first
    tl.fromTo(".reviews-title",
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }
    );

    // Animate testimonial cards with stagger - removed 3D rotationY, simplified to 2D transforms
    tl.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out"
      },
      "-=0.3" // Overlap with title animation
    );

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

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <h2 className="reviews-title text-3xl font-bold text-heading mb-8 text-center will-change-transform">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (testimonialRefs.current[index] = el!)}
              className="testimonial-card border-2 border-neutral-200 rounded-2xl p-6 bg-background-card shadow-md will-change-transform transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-primary-200 group"
            >
              <div className="flex items-center mb-4">
                <div className="testimonial-avatar w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold mr-4 shadow-md transition-transform duration-300 ease-out group-hover:scale-110">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-heading">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center mb-4 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`star-icon w-5 h-5 transition-transform duration-200 ease-out group-hover:scale-110 ${
                      i < testimonial.rating
                        ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                        : 'text-neutral-200 fill-neutral-200'
                    }`}
                    style={{ transitionDelay: `${i * 30}ms` }}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-neutral-500">
                  {testimonial.rating}/5
                </span>
              </div>
              <p className="text-text leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bewertungen;