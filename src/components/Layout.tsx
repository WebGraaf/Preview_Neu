import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ConsentBanner } from './ConsentBanner';
import { ConsentSettings } from './ConsentSettings';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

import { useConsent } from '../hooks/useConsent';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { consent, updateConsent } = useConsent();
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consentGiven = localStorage.getItem('consent.v1');
      if (!consentGiven) {
        setBannerVisible(true);
      } else {
        // Check if consent has a valid timestamp (user made a decision)
        try {
          const parsed = JSON.parse(consentGiven);
          if (!parsed.timestamp) {
            setBannerVisible(true);
          }
        } catch {
          setBannerVisible(true);
        }
      }
    }
  }, []);

  const handleAccept = () => {
    updateConsent({ externalMedia: true });
    setBannerVisible(false);
  };

  const handleDecline = () => {
    updateConsent({ externalMedia: false });
    setBannerVisible(false);
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };
  
  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    // Check if user has made a consent decision
    const consentGiven = localStorage.getItem('consent.v1');
    if (!consentGiven) {
      setBannerVisible(true);
    } else {
      try {
        const parsed = JSON.parse(consentGiven);
        if (!parsed.timestamp) {
          setBannerVisible(true);
        }
      } catch {
        setBannerVisible(true);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">{children}</main>
      <footer className="relative bg-gradient-to-b from-neutral-800 to-neutral-900 text-white pt-12 md:pt-14 lg:pt-16 pb-6 md:pb-8">
        {/* Top border accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500"></div>
        
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-bold text-white tracking-wide">DriveAcademy GmbH</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Hauptstraße 123<br />
                10115 Berlin<br />
                Germany
              </p>
              <p className="text-sm text-neutral-400">&copy; 2025 DriveAcademy GmbH</p>
            </div>

            {/* Contact */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-bold text-white tracking-wide">Kontakt</h3>
              <div className="space-y-2 md:space-y-3 text-sm">
                <p>
                  <a
                    href="tel:+493012345678"
                    className="inline-flex items-center gap-2 text-neutral-300 hover:text-primary-300 hover:translate-x-1 transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    +49 (0) 30 12345678
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:info@driveacademy.de"
                    className="inline-flex items-center gap-2 text-neutral-300 hover:text-primary-300 hover:translate-x-1 transition-all duration-300"
                  >
                    info@driveacademy.de
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.driveacademy.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-neutral-300 hover:text-primary-300 hover:translate-x-1 transition-all duration-300"
                  >
                    www.driveacademy.de
                  </a>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-bold text-white tracking-wide">Schnellzugriff</h3>
              <div className="space-y-2 md:space-y-3 text-sm">
                <Link
                  to="/"
                  className="block text-neutral-300 hover:text-primary-300 hover:translate-x-1 transition-all duration-300"
                >
                  Startseite
                </Link>
                <Link
                  to="/fuehrerscheine"
                  className="block text-neutral-300 hover:text-primary-300 hover:translate-x-1 transition-all duration-300"
                >
                  Führerscheine
                </Link>
                <Link
                  to="/ueber-uns"
                  className="block text-neutral-300 hover:text-primary-300 hover:translate-x-1 transition-all duration-300"
                >
                  Über Uns
                </Link>
                <Link
                  to="/kontakt"
                  className="block text-neutral-300 hover:text-primary-300 hover:translate-x-1 transition-all duration-300"
                >
                  Kontakt
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-bold text-white tracking-wide">Rechtliches</h3>
              <div className="space-y-2 md:space-y-3 text-sm">
                <Link
                  to="/datenschutz"
                  className="block text-neutral-300 hover:text-primary-300 hover:translate-x-1 transition-all duration-300"
                >
                  Datenschutz
                </Link>
                <Link
                  to="/impressum"
                  className="block text-neutral-300 hover:text-primary-300 hover:translate-x-1 transition-all duration-300"
                >
                  Impressum
                </Link>
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="block text-neutral-300 hover:text-primary-300 hover:translate-x-1 transition-all duration-300 text-left"
                >
                  Privatsphäre
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 md:mt-10 lg:mt-12 pt-6 md:pt-8 border-t border-neutral-700/50 text-center space-y-2">
            <p className="text-xs md:text-sm text-neutral-400">
              Geschäftsführer: Michael Schmidt | Fahrlehrererlaubnis: FL-2024-12345
            </p>
            <p className="text-xs text-neutral-500">
              Website erstellt von{' '}
              <a
                href="https://www.deine-fahrschul-website.de/"
                target="_blank"
                rel="noopener"
                className="text-primary-400 hover:text-primary-300 transition-colors duration-300"
              >
                deine-fahrschul-website.de
              </a>
            </p>
          </div>
        </Container>
      </footer>
      <ConsentBanner
        isVisible={bannerVisible}
        onAccept={handleAccept}
        onDecline={handleDecline}
        onOpenSettings={handleOpenSettings}
      />
      <ConsentSettings isOpen={isSettingsOpen} onClose={handleCloseSettings} />
    </div>
  );
};

export default Layout;