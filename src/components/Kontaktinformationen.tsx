import { Phone, Clock, MapPin, Mail } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useConfig } from '../config';
import { LocationDropdown } from './ui/LocationDropdown';

gsap.registerPlugin(ScrollTrigger);

export interface Location {
  label: string;
  address: string;
  phone: string;
  hours: string;
}

export function Kontaktinformationen() {
  const { config, loading } = useConfig();
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contactRefs = useRef<HTMLDivElement[]>([]);
  const tabsRef = useRef<HTMLButtonElement[]>([]);

  // Get locations from config
  const locations: Location[] = config?.standorte.map(standort => ({
    label: standort.name,
    address: standort.adresse,
    phone: standort.telefon,
    hours: standort.oeffnungszeiten
  })) || [];

  // Get email from config
  const email = config?.fahrschule.kontakt.email || 'info@fahrschule.de';

  const contactItems = locations.length > 0 ? [
    {
      icon: Phone,
      label: 'Telefon',
      value: locations[activeTab]?.phone || '',
      color: 'primary'
    },
    {
      icon: Clock,
      label: 'Öffnungszeiten',
      value: locations[activeTab]?.hours || '',
      color: 'primary'
    },
    {
      icon: MapPin,
      label: 'Adresse',
      value: locations[activeTab]?.address || '',
      color: 'primary'
    },
    {
      icon: Mail,
      label: 'E-Mail',
      value: email,
      color: 'primary'
    }
  ] : [];

  useEffect(() => {
    if (loading || locations.length === 0) return;

    const ctx = gsap.context(() => {
      // Create a single timeline for all scroll animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate tabs
      tl.fromTo(tabsRef.current.filter(Boolean),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }
      );

      // Animate contact cards with stagger
      tl.fromTo(contactRefs.current.filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out"
        },
        "-=0.3"
      );

      // Hover effects are now handled via CSS classes
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, locations.length]);

  // Tab change now uses CSS transitions instead of GSAP
  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  // Show loading state
  if (loading) {
    return (
      <section className="">
        <div className="max-w-6xl mx-auto px-4 text-center text-text">
          Laden...
        </div>
      </section>
    );
  }

  // Show nothing if no locations
  if (locations.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4">
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
            <div className="hidden md:flex flex-wrap gap-2 justify-center mb-8 p-1.5 bg-neutral-100 rounded-full w-fit mx-auto">
              {locations.map((location, index) => (
                <button
                  key={index}
                  ref={(el) => (tabsRef.current[index] = el!)}
                  onClick={() => handleTabChange(index)}
                  className={`location-tab flex items-center gap-2 px-5 py-2.5 font-medium rounded-full transition-all duration-300 ${
                    activeTab === index
                      ? 'text-white bg-primary-500 shadow-md'
                      : 'text-text hover:text-primary-600 hover:bg-white/50'
                  }`}
                >
                  <MapPin className={`w-4 h-4 ${activeTab === index ? 'text-white' : 'text-primary-500'}`} />
                  {location.label}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            const colorClasses = {
              primary: 'from-primary-500 to-primary-600'
            };

            return (
              <div
                key={index}
                ref={(el) => (contactRefs.current[index] = el!)}
                className="contact-card bg-background-card backdrop-blur-sm border-2 border-neutral-200 rounded-2xl p-5 hover:border-primary-200 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 hover:scale-[1.01]"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="flex items-center mb-3">
                  <div className={`contact-gradient w-11 h-11 rounded-xl bg-gradient-to-br ${colorClasses[item.color as keyof typeof colorClasses]} flex items-center justify-center mr-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="contact-icon w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                  </div>
                  <div className="text-base font-semibold text-heading group-hover:text-primary-600 transition-colors duration-200">
                    {item.label}
                  </div>
                </div>
                {item.label === 'Telefon' ? (
                  <a href={`tel:${item.value.replace(/\s/g, '')}`} className="text-sm text-text hover:text-primary-600 transition-colors duration-200 block">
                    {item.value}
                  </a>
                ) : item.label === 'Adresse' ? (
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(item.value)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-text hover:text-primary-600 transition-colors duration-200 block">
                    {item.value}
                  </a>
                ) : item.label === 'E-Mail' ? (
                  <a href={`mailto:${item.value}`} className="text-sm text-text hover:text-primary-600 transition-colors duration-200 block break-all">
                    {item.value}
                  </a>
                ) : (
                  <div className="text-sm text-text whitespace-pre-line">
                    {item.value}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}