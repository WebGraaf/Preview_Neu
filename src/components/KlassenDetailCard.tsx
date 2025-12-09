import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Check } from 'lucide-react';

interface KlassenDetailCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  restrictions: string[];
  imagePosition?: 'left' | 'right';
  variant?: 'default' | 'muted' | 'outline';
  className?: string;
}

export const KlassenDetailCard: React.FC<KlassenDetailCardProps> = ({
  imageSrc,
  imageAlt = '',
  title,
  description,
  restrictions,
  imagePosition = 'left',
  variant = 'default',
  className = '',
}) => {
  const { elementRef, isVisible } = useScrollReveal();

  const variantClasses = {
    default: 'bg-background-card border border-border shadow-lg hover:shadow-xl',
    muted: 'bg-background-card/80 border border-border shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-border hover:border-primary-300 hover:shadow-lg',
  };

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`group rounded-2xl overflow-hidden transition-all duration-500 ${variantClasses[variant]} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      <div
        className={`flex flex-col md:flex-row gap-0 ${
          imagePosition === 'right' ? 'md:flex-row-reverse' : ''
        }`}
      >
        <div className="md:w-1/2 relative overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="md:w-1/2 flex flex-col justify-center p-6 md:p-8 lg:p-10 text-left">
          <h3 className="text-2xl md:text-3xl font-bold text-heading mb-4 tracking-tight">{title}</h3>
          <p className="text-text leading-relaxed mb-6">{description}</p>

          <div className="mb-8">
            <h4 className="text-lg font-semibold text-heading mb-4">Voraussetzungen & Restriktionen:</h4>
            <ul className="space-y-3">
              {restrictions.map((restriction, index) => (
                <li key={index} className="flex items-start gap-3 group/item">
                  <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center group-hover/item:bg-primary-200 transition-colors duration-300">
                    <Check className="w-4 h-4 text-primary-600" />
                  </span>
                  <span className="text-text">{restriction}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="/anmelden"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-semibold hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center group/btn"
          >
            <span>Jetzt zur Klasse {title.split(' ')[1]} anmelden</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
