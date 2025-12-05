import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useConsent } from '../hooks/useConsent';
import { Switch } from './ui/Switch';
import { Settings, X, CheckCircle, MapPin, Clock, Shield } from 'lucide-react';

type ConsentSettingsProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ConsentSettings = ({ isOpen, onClose }: ConsentSettingsProps) => {
  const { consent, updateConsent } = useConsent();
  const [localConsent, setLocalConsent] = useState(consent.externalMedia);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setLocalConsent(consent.externalMedia);
  }, [consent.externalMedia, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleSave = () => {
    updateConsent({ externalMedia: localConsent });
    onClose();
  };

  const handleAcceptAll = () => {
    updateConsent({ externalMedia: true });
    onClose();
  };

  const handleDeclineAll = () => {
    updateConsent({ externalMedia: false });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4
                  transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`bg-background-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden
                    transform transition-all duration-500 ease-out
                    ${isAnimating ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-settings-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-background-card to-neutral-50 border-b border-border-divider px-5 py-5 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 id="consent-settings-title" className="text-lg sm:text-xl font-bold text-heading flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary-600" />
              </div>
              Datenschutzeinstellungen
            </h2>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl hover:bg-neutral-100 transition-all duration-200 group"
              aria-label="Schließen"
            >
              <X className="w-5 h-5 text-muted group-hover:text-heading transition-colors" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="px-5 py-5 sm:px-6 space-y-5 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Introduction */}
          <div className="text-sm text-text leading-relaxed bg-neutral-50 rounded-xl p-4 border border-neutral-100">
            <p>
              Hier können Sie detailliert festlegen, welche Dienste wir auf dieser Website verwenden dürfen.
              Ihre Einstellungen werden gespeichert und können jederzeit geändert werden.
            </p>
          </div>

          {/* Essential Cookies - Always enabled */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-bold text-heading text-base">Essenzielle Cookies</span>
                  <span className="text-xs bg-green-600 text-white px-2.5 py-1 rounded-full font-medium">Immer aktiv</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich (z.B. Speicherung Ihrer Datenschutzeinstellungen).
                  Sie können nicht deaktiviert werden.
                </p>
              </div>
            </div>
          </div>

          {/* External Media / Google Maps */}
          <div className="bg-background-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <label htmlFor="google-maps-toggle" className="font-bold text-heading text-base cursor-pointer">
                    Google Maps
                  </label>
                </div>
                <p className="text-sm text-muted mb-4 leading-relaxed">
                  Ermöglicht die Anzeige interaktiver Karten zur Darstellung unserer Standorte.
                  Bei Aktivierung werden Daten an Google LLC (USA) übertragen.
                </p>
                <div className="text-xs text-muted bg-neutral-50 rounded-xl p-3 border border-neutral-200">
                  <p className="font-semibold mb-2 text-heading">Übertragene Daten:</p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
                      IP-Adresse
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
                      Standortdaten (falls freigegeben)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
                      Geräteinformationen
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-shrink-0 pt-1">
                <Switch
                  id="google-maps-toggle"
                  checked={localConsent}
                  onCheckedChange={setLocalConsent}
                />
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="text-sm text-muted border-t border-border-divider pt-5">
            <p className="leading-relaxed">
              Weitere Informationen zur Datenverarbeitung finden Sie in unserer{' '}
              <Link to="/datenschutz" className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors" onClick={onClose}>
                Datenschutzerklärung
              </Link>
              . Angaben zum Verantwortlichen finden Sie im{' '}
              <Link to="/impressum" className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors" onClick={onClose}>
                Impressum
              </Link>
              .
            </p>
          </div>

          {/* Consent timestamp info */}
          {consent.timestamp && (
            <div className="flex items-center gap-3 text-xs text-muted bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <Clock className="w-4 h-4 text-neutral-400" />
              <p>
                <span className="font-semibold">Letzte Einwilligung:</span>{' '}
                {new Date(consent.timestamp).toLocaleString('de-DE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })} Uhr
              </p>
            </div>
          )}
        </div>

        {/* Footer with buttons - GDPR compliant: equal visual weight */}
        <div className="sticky bottom-0 bg-gradient-to-r from-background-card to-neutral-50 border-t border-border-divider px-5 py-5 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDeclineAll}
              className="w-full sm:w-auto order-2 sm:order-1 px-5 py-3 rounded-xl text-sm font-semibold
                         bg-neutral-800 text-white hover:bg-neutral-700
                         border border-neutral-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5
                         focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
            >
              Alle ablehnen
            </button>
            <button
              onClick={handleSave}
              className="w-full sm:w-auto order-3 sm:order-2 px-5 py-3 rounded-xl text-sm font-semibold
                         bg-white text-neutral-800 border border-neutral-300
                         hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-300 hover:shadow-md
                         focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2
                         flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Auswahl speichern
            </button>
            <button
              onClick={handleAcceptAll}
              className="w-full sm:w-auto sm:ml-auto order-1 sm:order-3 px-5 py-3 rounded-xl text-sm font-semibold
                         bg-neutral-800 text-white hover:bg-neutral-700
                         border border-neutral-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5
                         focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};