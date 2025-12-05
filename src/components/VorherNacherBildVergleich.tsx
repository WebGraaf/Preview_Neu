import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, GripVertical } from 'lucide-react';
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
  beforeLabel = 'Before',
  afterLabel = 'After',
}, ref) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchend', handleEnd);
      return () => {
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging]);

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
      style={{ willChange: 'transform, opacity' }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <img src={afterImage} alt={afterLabel} className="w-full h-full object-cover" />
        {afterLabel && (
          <div className={`absolute top-4 right-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300 ${isHovering ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-0'}`}>
            {afterLabel}
          </div>
        )}
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden transition-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={beforeImage} alt={beforeLabel} className="w-full h-full object-cover" />
        {beforeLabel && (
          <div className={`absolute top-4 left-4 bg-gradient-to-r from-neutral-700 to-neutral-800 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300 ${isHovering ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-0'}`}>
            {beforeLabel}
          </div>
        )}
      </div>

      {/* Slider Handle */}
      <div
        className={`slider-handle absolute top-0 bottom-0 w-1 bg-white shadow-2xl transition-all duration-150 ${isDragging ? 'w-1.5' : ''}`}
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-white/50 blur-sm"></div>
        
        {/* Handle button */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-14 h-14 bg-white rounded-2xl shadow-2xl
                        flex items-center justify-center
                        border-2 border-primary-200
                        transition-all duration-300
                        ${isDragging ? 'scale-110 border-primary-400 shadow-primary-200/50' : ''}
                        ${isHovering && !isDragging ? 'scale-105' : ''}`}>
          <div className="flex items-center gap-0.5">
            <ChevronLeft className={`w-5 h-5 text-primary-600 transition-transform duration-300 ${isDragging ? '-translate-x-0.5' : ''}`} />
            <GripVertical className="w-4 h-4 text-neutral-400" />
            <ChevronRight className={`w-5 h-5 text-primary-600 transition-transform duration-300 ${isDragging ? 'translate-x-0.5' : ''}`} />
          </div>
        </div>
        
        {/* Top and bottom decorative elements */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg border border-primary-200"></div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg border border-primary-200"></div>
      </div>

      {/* Instruction hint */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-medium transition-all duration-500 ${isHovering || isDragging ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        Ziehen zum Vergleichen
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

      // Animate title
      tl.fromTo(".slider-title",
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }
      );

      // Animate slider container (simplified - removed scale animation)
      tl.fromTo(sliderRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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