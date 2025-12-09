import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '../components/LayoutComponents';
import { Kontaktinformationen } from '../components/Kontaktinformationen';
import { StandorteUebersicht } from '../components/StandorteUebersicht';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useConfig } from '../config';
import BannerAnmelden from '../components/BannerAnmelden';

const Kontakt: React.FC = () => {
  const { config, loading, getLocationsForDisplay } = useConfig();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();

  const fahrschuleName = config?.fahrschule.name || 'Fahrschule';
  const locations = getLocationsForDisplay();

  // Show loading state
  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center text-text">Laden...</div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <Helmet>
        <title>Kontakt - {fahrschuleName}</title>
        <meta name="description" content={`Nimm Kontakt mit uns auf. Hier findest du unsere Adressen, Telefonnummern und Öffnungszeiten. Wir von ${fahrschuleName} freuen uns auf deine Nachricht.`} />
        <meta name="keywords" content={`Kontakt, Fahrschule, Adresse, Telefon, Öffnungszeiten, ${fahrschuleName}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`Kontakt - ${fahrschuleName}`} />
        <meta property="og:description" content="Fragen zur Ausbildung oder Anmeldung? Kontaktiere uns – wir helfen dir gerne weiter." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Hero/Header Section */}
      <section className="py-8 md:py-12 bg-background">
        <Container>
          <div
            ref={headerRef as React.RefObject<HTMLDivElement>}
            className="text-center max-w-3xl mx-auto"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-6 tracking-tight">
              Kontaktiere uns
            </h1>
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-text leading-relaxed">
                Wir sind für dich da! Egal ob du Fragen zur Anmeldung hast, Informationen zu unseren Kursen benötigst oder einen Termin vereinbaren möchtest - melde dich gerne bei uns.
              </p>
              <p className="text-lg md:text-xl text-text leading-relaxed">
                Unser freundliches Team hilft dir gerne weiter und beantwortet alle deine Fragen rund um deinen Führerschein.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Information Section */}
      <section className="py-8 md:py-12 bg-background">
        <Kontaktinformationen />
      </section>

      {/* Locations Section */}
      {locations.length > 0 && (
        <section className="py-8 md:py-12 bg-background">
          <StandorteUebersicht
            locations={locations}
          />
        </section>
      )}

      {/* CTA Banner Section */}
      <section className="py-6 md:py-8 bg-background">
        <BannerAnmelden />
      </section>
    </div>
  );
};

export default Kontakt;
