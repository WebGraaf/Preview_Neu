import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LightboxProps {
  images: string[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight' && onNext) onNext();
        if (e.key === 'ArrowLeft' && onPrev) onPrev();
      };
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center animate-in fade-in duration-300">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 z-10 hover:scale-110 hover:rotate-90"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={() => setIsZoomed(!isZoomed)}
        className="absolute top-4 right-20 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 z-10 hover:scale-110"
      >
        {isZoomed ? <Maximize2 className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
      </button>

      {onPrev && images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 p-4 text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-x-1"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      <div className={`relative max-w-7xl max-h-[90vh] transition-all duration-500 ease-out ${isZoomed ? 'scale-150' : 'scale-100'}`}>
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="w-full h-full object-contain rounded-2xl shadow-2xl"
        />
      </div>

      {onNext && images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 p-4 text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 hover:translate-x-1"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium shadow-lg">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

interface BilderGallerieProps {
  images?: string[];
}

export const BilderGallerie: React.FC<BilderGallerieProps> = ({
  images = ['Platzhalter 1', 'Platzhalter 2', 'Platzhalter 3', 'Platzhalter 4', 'Platzhalter 5', 'Platzhalter 6']
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryItemsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const items = galleryItemsRef.current.filter(Boolean);
    
    if (!container || items.length === 0) return;

    // Animate gallery items with stagger - removed 3D rotationY, simplified to 2D transforms
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out"
      }
    );

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div ref={containerRef} className="py-8 md:py-12 px-4 bg-background">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {images.map((image, index) => (
          <button
            key={index}
            ref={(el) => (galleryItemsRef.current[index] = el!)}
            onClick={() => openLightbox(index)}
            className="gallery-item relative aspect-square overflow-hidden rounded-2xl group cursor-pointer bg-gray-100 shadow-md transition-opacity transition-shadow duration-300 ease-out hover:shadow-xl hover:-translate-y-1"
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ZoomIn className="zoom-icon w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out drop-shadow-lg" />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        isOpen={lightboxOpen}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};