import { useState } from 'react';
import { useConsent } from '../hooks/useConsent';
import { MapPin, Shield } from 'lucide-react';

type GoogleMapsProps = {
  src: string;
  width?: string;
  height?: string;
  className?: string;
};

export const GoogleMaps = ({
  src,
  width = '100%',
  height = '450px',
  className = '',
}: GoogleMapsProps) => {
  const { consent, updateConsent } = useConsent();
  const [loadOnce, setLoadOnce] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadOnce = () => {
    setLoadOnce(true);
  };

  const handleAllowAlways = () => {
    updateConsent({ externalMedia: true });
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const shouldRenderMap = consent.externalMedia || loadOnce;

  if (shouldRenderMap) {
    return (
      <div className={`relative rounded-2xl overflow-hidden shadow-lg ${className}`} style={{ width, height }}>
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
              <p className="text-muted text-sm">Karte wird geladen...</p>
            </div>
          </div>
        )}
        <iframe
          src={src}
          width="100%"
          height="100%"
          className="border-0"
          loading="lazy"
          referrerPolicy="origin"
          title="Google Maps"
          onLoad={handleIframeLoad}
        ></iframe>
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 rounded-2xl p-8 md:p-12 overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-32 h-32 rounded-full bg-primary-500"></div>
        <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-primary-400"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mb-6">
          <MapPin className="w-8 h-8 text-primary-600" />
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-heading mb-3">
          Karte anzeigen
        </h3>
        
        {/* Description */}
        <p className="text-text mb-6 leading-relaxed">
          Um die interaktive Karte anzuzeigen, musst du externe Medien von Google Maps erlauben.
        </p>
        
        {/* Privacy note */}
        <div className="flex items-center gap-2 text-xs text-muted mb-6 bg-white/50 px-4 py-2 rounded-full">
          <Shield className="w-4 h-4" />
          <span>Deine Privatsphäre ist uns wichtig</span>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={handleLoadOnce}
            className="px-6 py-3 rounded-xl text-heading font-medium border border-neutral-300 bg-white hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Einmal laden
          </button>
          <button
            onClick={handleAllowAlways}
            className="px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Immer erlauben
          </button>
        </div>
      </div>
    </div>
  );
};