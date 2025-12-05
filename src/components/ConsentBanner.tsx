import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Settings, ChevronDown, Shield } from 'lucide-react';

type ConsentBannerProps = {
  isVisible: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onOpenSettings: () => void;
};

export const ConsentBanner = ({ isVisible, onAccept, onDecline, onOpenSettings }: ConsentBannerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  // Compact view - minimal screen space
  if (!isExpanded) {
    return (
      <div
        className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50
                    bg-background-card/95 backdrop-blur-md shadow-2xl rounded-2xl border border-border
                    transform transition-all duration-500 ease-out
                    ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      >
        <div className="p-5">
          {/* Compact header with cookie icon */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center shadow-sm">
              <Cookie className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-heading">
                Wir nutzen Cookies
              </p>
              <p className="text-sm text-muted mt-1 leading-relaxed">
                Für Google Maps & bessere Nutzererfahrung.{' '}
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors"
                >
                  Mehr erfahren
                </button>
              </p>
            </div>
          </div>

          {/* Compact buttons - GDPR compliant: equal visual weight */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={onDecline}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold
                         bg-neutral-800 text-white hover:bg-neutral-700
                         border border-neutral-800 transition-all duration-300 hover:shadow-md"
            >
              Ablehnen
            </button>
            <button
              onClick={onOpenSettings}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold
                         bg-white text-neutral-800 border border-neutral-300
                         hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-300 hover:shadow-md
                         flex items-center justify-center gap-1.5"
            >
              <Settings className="w-4 h-4" />
              Anpassen
            </button>
            <button
              onClick={onAccept}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold
                         bg-neutral-800 text-white hover:bg-neutral-700
                         border border-neutral-800 transition-all duration-300 hover:shadow-md"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Expanded view - full details
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50
                  bg-background-card/95 backdrop-blur-md shadow-2xl border-t border-border
                  transform transition-all duration-500 ease-out
                  ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
    >
      <div className="container mx-auto px-4 py-5 sm:px-6 sm:py-6 max-w-5xl">
        {/* Header with collapse button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-heading flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-600" />
            </div>
            Datenschutzeinstellungen
          </h2>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-2 rounded-xl hover:bg-neutral-100 transition-all duration-200 group"
            aria-label="Minimieren"
          >
            <ChevronDown className="w-5 h-5 text-muted group-hover:text-heading transition-colors" />
          </button>
        </div>

        {/* Description text - GDPR compliant */}
        <div className="text-sm text-text leading-relaxed mb-4 bg-neutral-50 rounded-xl p-4 border border-neutral-100">
          <p>
            Wir nutzen Cookies und ähnliche Technologien. Bei „Alle akzeptieren" werden Daten (z.B. IP-Adresse)
            an Google LLC (USA) übertragen.{' '}
            <Link to="/datenschutz" className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors">
              Datenschutzerklärung
            </Link>
            {' '}·{' '}
            <Link to="/impressum" className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors">
              Impressum
            </Link>
          </p>
        </div>

        {/* Buttons - GDPR compliant: equal visual weight for accept/decline */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onDecline}
            className="w-full sm:w-auto order-2 sm:order-1 px-5 py-3 rounded-xl text-sm font-semibold
                       bg-primary-600 text-white hover:bg-primary-700
                       border border-primary-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Nur Essenzielle
          </button>
          <button
            onClick={onOpenSettings}
            className="w-full sm:w-auto order-3 sm:order-2 px-5 py-3 rounded-xl text-sm font-semibold
                       bg-white text-neutral-800 border border-neutral-300
                       hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-300 hover:shadow-md
                       flex items-center justify-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Einstellungen
          </button>
          <button
            onClick={onAccept}
            className="w-full sm:w-auto sm:ml-auto order-1 sm:order-3 px-5 py-3 rounded-xl text-sm font-semibold
                       bg-primary-600 text-white hover:bg-primary-700
                       border border-primary-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Alle akzeptieren
          </button>
        </div>

        {/* Legal note */}
        <p className="text-xs text-muted mt-4 text-center sm:text-left">
          Einwilligung jederzeit widerrufbar über „Privatsphäre" im Footer.
        </p>
      </div>
    </div>
  );
};