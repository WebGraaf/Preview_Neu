import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VorherNacherBildVergleichProps {
  title?: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterSlider = React.forwardRef<HTMLDivElement, BeforeAfterSliderProps>(({
  beforeImage,
  afterImage,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const beforeEl = beforeRef.current;
    const handleEl = handleRef.current;
    
    if (!container || !beforeEl || !handleEl) return;

    let isDragging = false;

    const updatePosition = (clientX: number) => {
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      
      // Direct DOM manipulation for performance - no React re-renders
      beforeEl.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      handleEl.style.left = `${percentage}%`;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      updatePosition(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.clientX);
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDragging = true;
      updatePosition(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    // Add event listeners
    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div
      ref={(el) => {
        if (ref && typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      className="relative w-full aspect-video overflow-hidden rounded-2xl cursor-ew-resize select-none slider-container shadow-2xl border border-neutral-200"
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <img src={afterImage} alt="Nachher" className="w-full h-full object-cover pointer-events-none" draggable={false} />
      </div>

      {/* Before Image (Clipped) */}
      <div
        ref={beforeRef}
        className="absolute inset-0"
        style={{ clipPath: 'inset(0 50% 0 0)' }}
      >
        <img src={beforeImage} alt="Vorher" className="w-full h-full object-cover pointer-events-none" draggable={false} />
      </div>

      {/* Slider Handle */}
      <div
        ref={handleRef}
        className="absolute top-0 bottom-0 w-0.5 bg-white/90"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
        {/* Handle button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-10 h-10 bg-white rounded-full shadow-lg
                        flex items-center justify-center
                        border border-neutral-200">
          <ChevronLeft className="w-4 h-4 text-neutral-600 -mr-1" />
          <ChevronRight className="w-4 h-4 text-neutral-600 -ml-1" />
        </div>
      </div>
    </div>
  );
});

BeforeAfterSlider.displayName = 'BeforeAfterSlider';

const VorherNacherBildVergleich: React.FC<VorherNacherBildVergleichProps> = ({
  title,
  beforeImage,
  afterImage,
  beforeLabel = "Vorher",
  afterLabel = "Nachher",
  className = "",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Consolidate all animations into a single timeline with one ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate title only if it exists
      const titleElement = sectionRef.current?.querySelector(".slider-title");
      if (titleElement) {
        tl.fromTo(titleElement,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          }
        );
      }

      // Animate slider container (simplified - removed scale animation)
      if (sliderRef.current) {
        tl.fromTo(sliderRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          },
          titleElement ? "-=0.3" : "0"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [title]);

  return (
    <section ref={sectionRef} className={`py-12 md:py-16 ${className}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        {title && (
          <div className="text-center mb-10">
            <h2 className="slider-title text-3xl md:text-4xl font-bold text-heading mb-4">{title}</h2>
            <p className="text-text max-w-2xl mx-auto">
              Bewege den Schieberegler, um den Unterschied zu sehen
            </p>
          </div>
        )}
        <div className="max-w-4xl mx-auto">
          <BeforeAfterSlider
            ref={sliderRef}
            beforeImage={beforeImage}
            afterImage={afterImage}
            beforeLabel={beforeLabel}
            afterLabel={afterLabel}
          />
        </div>
      </div>
    </section>
  );
};

export default VorherNacherBildVergleich;