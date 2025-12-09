import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { GoogleMaps } from './GoogleMaps';
import { LocationDropdown } from './ui/LocationDropdown';

export interface Location {
  label: string;
  address: string;
  phone: string;
  hours: string;
  mapSrc: string;
}

export interface StandorteUebersichtProps {
  title?: string;
  subtitle?: string;
  locations: Location[];
}

export function StandorteUebersicht({
  title = "Unsere Standorte",
  subtitle = "Finde den nächstgelegenen Standort",
  locations
}: StandorteUebersichtProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLButtonElement[]>([]);
  const infoCardsRef = useRef<HTMLDivElement[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const tabs = tabsRef.current.filter(Boolean);
    const infoCards = infoCardsRef.current.filter(Boolean);
    const map = mapRef.current;
    
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
    tl.fromTo(".locations-title",
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }
    )
    .fromTo(".locations-subtitle",
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.4"
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

    // Animate info cards - simplified, no scale
    if (infoCards.length > 0) {
      tl.fromTo(infoCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out"
        },
        "-=0.2"
      );
    }

    // Animate map container - simplified, no scale
    if (map) {
      tl.fromTo(map,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
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

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="locations-title text-3xl md:text-4xl font-bold text-heading mb-4">
            {title}
          </h2>
          <p className="locations-subtitle text-lg text-text max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Location Selection - Only show if more than 1 location */}
        {locations.length > 1 && (
          <>
            {/* Mobile Location Dropdown */}
            <div className="md:hidden mb-8">
              <LocationDropdown
                options={locations.map((loc, idx) => ({ label: loc.label, value: idx }))}
                value={activeTab}
                onChange={handleTabChange}
              />
            </div>

            {/* Desktop Location Tabs */}
            <div className="hidden md:flex flex-wrap gap-2 justify-center mb-8 pb-2">
              {locations.map((location, index) => {
                return (
                  <button
                    key={index}
                    ref={(el) => (tabsRef.current[index] = el!)}
                    onClick={() => handleTabChange(index)}
                    className={`location-tab flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === index
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                        : 'bg-background-card text-text border border-border hover:border-primary-300 hover:text-primary-600 hover:shadow-md'
                    }`}
                  >
                    <MapPin className={`w-4 h-4 ${activeTab === index ? 'text-white' : 'text-primary-500'}`} />
                    {location.label}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Info Cards Grid - CSS transitions for tab changes */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 transition-opacity duration-300 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div
            ref={(el) => el && (infoCardsRef.current[0] = el)}
            className="info-card group bg-background-card rounded-2xl p-5 md:p-6 border border-border hover:border-primary-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300">
                <MapPin className="w-5 h-5 text-primary-600" />
              </div>
              <h4 className="font-bold text-heading text-lg">Adresse</h4>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(locations[activeTab].address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text text-base hover:text-primary-600 transition-colors duration-200 block leading-relaxed"
            >
              {locations[activeTab].address}
            </a>
          </div>
          
          <div
            ref={(el) => el && (infoCardsRef.current[1] = el)}
            className="info-card group bg-background-card rounded-2xl p-5 md:p-6 border border-border hover:border-primary-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300">
                <Phone className="w-5 h-5 text-primary-600" />
              </div>
              <h4 className="font-bold text-heading text-lg">Telefon</h4>
            </div>
            <a
              href={`tel:${locations[activeTab].phone.replace(/\s/g, '')}`}
              className="text-text text-lg font-semibold hover:text-primary-600 transition-colors duration-200 block"
            >
              {locations[activeTab].phone}
            </a>
          </div>
          
          <div
            ref={(el) => el && (infoCardsRef.current[2] = el)}
            className="info-card group bg-background-card rounded-2xl p-5 md:p-6 border border-border hover:border-primary-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300">
                <Clock className="w-5 h-5 text-primary-600" />
              </div>
              <h4 className="font-bold text-heading text-lg">Öffnungszeiten</h4>
            </div>
            <p className="text-text text-base whitespace-pre-line leading-relaxed">{locations[activeTab].hours}</p>
          </div>
        </div>

        {/* Google Maps Integration - CSS transitions for tab changes */}
        <div ref={mapRef} className={`map-container bg-background-card rounded-2xl shadow-xl overflow-hidden border border-border transition-opacity duration-300 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <GoogleMaps
            src={locations[activeTab].mapSrc}
            height="400px"
          />
        </div>
      </div>
    </section>
  );
}