import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '../components/LayoutComponents';
import { useConfig } from '../config';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Impressum: React.FC = () => {
  const { config } = useConfig();
  const fahrschuleName = config?.fahrschule?.name || 'Fahrschule';
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <div className="bg-background">
      <Helmet>
        <title>Impressum - {fahrschuleName}</title>
        <meta name="description" content={`Impressum und rechtliche Hinweise für ${fahrschuleName}. Hier finden Sie unsere Kontaktdaten, Angaben zum Unternehmen und weitere rechtliche Informationen.`} />
        <meta name="robots" content="index, follow" />
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
              Impressum
            </h1>
            <p className="text-lg md:text-xl text-text leading-relaxed">
              Rechtliche Informationen und Kontaktdaten
            </p>
          </div>
        </Container>
      </section>
      
      {/* Content Section */}
      <section className="py-8 md:py-12 bg-background">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-background-card rounded-2xl p-8 md:p-12 border border-border shadow-sm">
              <div className="space-y-10 text-text">
                {/* Angaben gemäß § 5 TMG */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-4">
                    Angaben gemäß § 5 TMG
                  </h2>
                  <div className="space-y-1 text-lg">
                    <p>Fahrschule DriveAcademy GmbH</p>
                    <p>Hauptstraße 123</p>
                    <p>10115 Berlin</p>
                  </div>
                </div>

                {/* Vertreten durch */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-4">
                    Vertreten durch
                  </h2>
                  <p className="text-lg">Geschäftsführer: Michael Schmidt</p>
                </div>

                {/* Kontakt */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-4">
                    Kontakt
                  </h2>
                  <div className="space-y-1 text-lg">
                    <p>Telefon: +49 (0) 30 12345678</p>
                    <p>E-Mail: info@driveacademy.de</p>
                    <p>Website: www.driveacademy.de</p>
                  </div>
                </div>

                {/* Registereintrag */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-4">
                    Registereintrag
                  </h2>
                  <div className="space-y-1 text-lg">
                    <p>Eintragung im Handelsregister</p>
                    <p>Registergericht: Amtsgericht Berlin-Charlottenburg</p>
                    <p>Registernummer: HRB 123456 B</p>
                  </div>
                </div>

                {/* Umsatzsteuer-ID */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-4">
                    Umsatzsteuer-ID
                  </h2>
                  <div className="space-y-1 text-lg">
                    <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                    <p className="font-medium">DE123456789</p>
                  </div>
                </div>

                {/* Aufsichtsbehörde */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-4">
                    Aufsichtsbehörde
                  </h2>
                  <div className="space-y-1 text-lg">
                    <p>Senatsverwaltung für Bildung, Jugend und Familie</p>
                    <p>Bernhard-Weiß-Straße 6</p>
                    <p>10178 Berlin</p>
                  </div>
                </div>

                {/* Fahrlehrererlaubnis */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-4">
                    Fahrlehrererlaubnis
                  </h2>
                  <div className="space-y-1 text-lg">
                    <p>Fahrlehrererlaubnis erteilt durch: Senatsverwaltung für Bildung, Jugend und Familie Berlin</p>
                    <p>Erlaubnisnummer: FL-2024-12345</p>
                  </div>
                </div>

                {/* Verantwortlich für den Inhalt */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-4">
                    Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                  </h2>
                  <div className="space-y-1 text-lg">
                    <p>Michael Schmidt</p>
                    <p>Hauptstraße 123</p>
                    <p>10115 Berlin</p>
                  </div>
                </div>

                {/* Haftungsausschluss */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-6">
                    Haftungsausschluss
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        Haftung für Inhalte
                      </h3>
                      <p className="text-lg leading-relaxed">
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                        allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                        verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                        zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        Haftung für Links
                      </h3>
                      <p className="text-lg leading-relaxed">
                        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                        Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        Urheberrecht
                      </h3>
                      <p className="text-lg leading-relaxed">
                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                        Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stand */}
                <div className="pt-4">
                  <p className="text-sm text-muted">
                    Stand: Oktober 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Impressum;
