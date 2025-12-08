import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '../components/LayoutComponents';
import { useConfig } from '../config';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Datenschutz: React.FC = () => {
  const { config } = useConfig();
  const fahrschuleName = config?.fahrschule?.name || 'Fahrschule';
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <div className="bg-background">
      <Helmet>
        <title>Datenschutz - {fahrschuleName}</title>
        <meta name="description" content={`Datenschutzhinweise für ${fahrschuleName}.`} />
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
              Datenschutzerklärung
            </h1>
            <p className="text-lg md:text-xl text-text leading-relaxed">
              Gültig ab: Dezember 2025
            </p>
          </div>
        </Container>
      </section>
      
      {/* Content Section */}
      <section className="py-8 md:py-12 bg-background">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* 1. Verantwortlicher */}
            <div className="bg-background-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-heading mb-4">
                1. Verantwortlicher für die Datenverarbeitung
              </h2>
              <p className="text-text leading-relaxed mb-4">
                Verantwortlicher für die Verarbeitung personenbezogener Daten im Sinne der DSGVO ist:
              </p>
              <div className="space-y-1 text-text">
                <p className="font-semibold text-heading">Handgraaf, Luca &amp; Leineweber, Kai GbR</p>
                <p>Moorenstraße 10</p>
                <p>45131 Essen, Deutschland</p>
                <p className="mt-3"><span className="font-medium text-heading">Vertreter:</span> Kai Leineweber</p>
                <p><span className="font-medium text-heading">E-Mail:</span> info@deine-fahrschul-website.de</p>
              </div>
            </div>

            {/* 2. Allgemeine Informationen */}
            <div className="bg-background-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-heading mb-4">
                2. Allgemeine Informationen zur Datenverarbeitung
              </h2>
              <p className="text-text leading-relaxed mb-3">
                Diese Website wird von uns betrieben und gehört dem Fahrschulinhaber <span className="font-semibold text-primary">[PLATZHALTER: FAHRSCHULE_NAME]</span>.
              </p>
              <p className="text-text leading-relaxed">
                Bei der Nutzung dieser Website werden personenbezogene Daten verarbeitet, insbesondere durch das Online-Anmeldeformular für Fahrschüler. Die Verarbeitung erfolgt auf Grundlage der DSGVO und des BDSG.
              </p>
            </div>

            {/* 3. Erhebung und Verarbeitung von Anmeldedaten */}
            <div className="bg-background-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-heading mb-6">
                3. Erhebung und Verarbeitung von Anmeldedaten
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-3">3.1 Welche Daten werden erfasst?</h3>
                  <p className="text-text leading-relaxed mb-3">
                    Wenn Sie sich über das Anmeldeformular anmelden, erheben wir:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Vorname', 'Nachname', 'E-Mail-Adresse', 'Telefonnummer', 'Geburtsdatum', 'Führerscheinklasse', 'Starttermin', 'Nachricht (optional)'].map((item) => (
                      <span key={item} className="bg-background px-3 py-1.5 rounded-lg text-sm text-text border border-border">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-heading mb-3">3.2 Rechtsgrundlage</h3>
                  <p className="text-text leading-relaxed">
                    Die Verarbeitung erfolgt auf Grundlage von <span className="font-medium">Art. 6 Abs. 1 lit. f DSGVO</span> (berechtigtes Interesse) sowie bei Einwilligung zusätzlich auf Grundlage von <span className="font-medium">Art. 6 Abs. 1 lit. a DSGVO</span>.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-heading mb-3">3.3 Zweck der Verarbeitung</h3>
                  <div className="space-y-2 text-text">
                    <p>• Bearbeitung Ihrer Anmeldeanfrage</p>
                    <p>• Kontaktaufnahme durch den Fahrschulinhaber</p>
                    <p>• Bereitstellung von Informationen zu Fahrschulkursen</p>
                    <p>• Verwaltung der Anmeldung</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-heading mb-3">3.4 Datenweitergabe</h3>
                  <p className="text-text leading-relaxed mb-3">
                    Ihre Daten werden vollständig an den Fahrschulinhaber weitergeleitet:
                  </p>
                  <div className="space-y-1 text-text">
                    <p><span className="font-medium text-heading">Empfänger:</span> <span className="text-primary">[PLATZHALTER: FAHRSCHULE_NAME]</span></p>
                    <p><span className="font-medium text-heading">E-Mail:</span> <span className="text-primary">[PLATZHALTER: FAHRSCHULE_EMAIL]</span></p>
                    <p><span className="font-medium text-heading">Telefon:</span> <span className="text-primary">[PLATZHALTER: FAHRSCHULE_TELEFON]</span></p>
                  </div>
                  <p className="text-text leading-relaxed mt-4 p-4 bg-background rounded-xl border border-border">
                    <span className="font-medium text-heading">Wichtig:</span> Wir selbst speichern keine Ihrer personenbezogenen Daten. Wir erhalten nur eine interne Benachrichtigung, dass eine Anmeldung eingegangen ist – ohne Zugriff auf Ihre Daten.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-heading mb-3">3.5 Speicherdauer</h3>
                  <div className="space-y-2 text-text">
                    <p><span className="font-medium text-heading">Bei uns:</span> Keine Speicherung – Daten werden nur für den Versand verarbeitet und dann verworfen.</p>
                    <p><span className="font-medium text-heading">Beim Fahrschulinhaber:</span> Der Fahrschulinhaber ist für die Speicherdauer selbst verantwortlich.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Auftragsverarbeiter und Drittanbieter */}
            <div className="bg-background-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-heading mb-6">
                4. Auftragsverarbeiter und Drittanbieter
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-2">4.1 Hostinger (E-Mail-Versand)</h3>
                  <p className="text-text leading-relaxed mb-2">
                    Die E-Mail mit Ihren Anmeldedaten wird über Hostinger versendet. Hostinger ist ein Auftragsverarbeiter gemäß DSGVO.
                  </p>
                  <p className="text-muted text-sm">
                    Datenschutzerklärung: hostinger.com/legal/privacy-policy
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-heading mb-2">4.2 Google Maps</h3>
                  <p className="text-text leading-relaxed mb-2">
                    Diese Website verwendet Google Maps zur Anzeige von Kartenausschnitten. Für die Nutzung ist Ihre aktive Einwilligung erforderlich (Consent-Banner).
                  </p>
                  <p className="text-text leading-relaxed mb-2">
                    Bei der Nutzung werden übertragen: IP-Adresse, Browser- und Geräteinformationen, Kartenanfragen.
                  </p>
                  <p className="text-muted text-sm">
                    Datenschutzerklärung: policies.google.com/privacy
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-heading mb-2">4.3 Vercel (Website-Hosting)</h3>
                  <p className="text-text leading-relaxed mb-2">
                    Diese Website wird auf Vercel gehostet. Vercel verarbeitet technische Logdaten (anonymisierte IP-Adressen, Zugriffsprotokolle). Anmeldedaten fliegen nicht über Vercel-Server.
                  </p>
                  <p className="text-muted text-sm">
                    Datenschutzerklärung: vercel.com/legal/privacy-policy
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Technische Speicherung */}
            <div className="bg-background-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-heading mb-6">
                5. Technische Speicherung: Cookies und LocalStorage
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-2">5.1 Cookies</h3>
                  <p className="text-text leading-relaxed">
                    Diese Website verwendet keine klassischen Cookies. Es werden keine Tracking-Cookies, Analytics-Cookies oder andere persistente Cookies gespeichert.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-heading mb-2">5.2 LocalStorage</h3>
                  <p className="text-text leading-relaxed mb-3">
                    Für die Speicherung Ihrer Einwilligungseinstellungen (Consent) verwenden wir den Browser-LocalStorage:
                  </p>
                  <div className="space-y-1 text-text">
                    <p>• Ob Sie Google Maps aktiviert haben (ja/nein)</p>
                    <p>• Zeitstempel der Einwilligung</p>
                    <p>• Versionsnummer der Einwilligungserklärung</p>
                  </div>
                  <p className="text-muted text-sm mt-3">
                    Speicherdauer: Bis Sie Ihren Browser-Cache löschen. Kein Tracking – nur für Ihre Einstellungen.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Ihre Datenschutzrechte */}
            <div className="bg-background-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-heading mb-6">
                6. Ihre Datenschutzrechte
              </h2>
              <p className="text-text leading-relaxed mb-4">
                Sie haben folgende Rechte gemäß DSGVO:
              </p>

              <div className="space-y-3 text-text">
                <p><span className="font-medium text-heading">Auskunft (Art. 15):</span> Sie können jederzeit Auskunft über Ihre Daten anfordern.</p>
                <p><span className="font-medium text-heading">Berichtigung (Art. 16):</span> Sie können verlangen, dass unrichtige Daten korrigiert werden.</p>
                <p><span className="font-medium text-heading">Löschung (Art. 17):</span> Sie können die Löschung Ihrer Daten verlangen.</p>
                <p><span className="font-medium text-heading">Einschränkung (Art. 18):</span> Sie können die Einschränkung der Verarbeitung verlangen.</p>
                <p><span className="font-medium text-heading">Datenportabilität (Art. 20):</span> Sie können Ihre Daten in maschinenlesbarem Format erhalten.</p>
                <p><span className="font-medium text-heading">Widerspruch (Art. 21):</span> Sie können der Verarbeitung widersprechen.</p>
              </div>

              <div className="mt-6 p-4 bg-background rounded-xl border border-border">
                <p className="text-text">
                  <span className="font-medium text-heading">Kontakt:</span> info@deine-fahrschul-website.de
                </p>
                <p className="text-muted text-sm mt-2">
                  Antwortfrist: 30 Tage (bei komplexen Anfragen bis zu 2 Monate)
                </p>
              </div>
            </div>

            {/* 7. Sicherheit Ihrer Daten */}
            <div className="bg-background-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-heading mb-6">
                7. Sicherheit Ihrer Daten
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-2">Technische Maßnahmen</h3>
                  <div className="space-y-1 text-text">
                    <p>• HTTPS/SSL-Verschlüsselung für alle Datenübertragungen</p>
                    <p>• TLS-Verschlüsselung beim E-Mail-Versand (Port 465)</p>
                    <p>• Keine Speicherung in unserem System – minimales Risiko von Datenpannen</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-heading mb-2">Organisatorische Maßnahmen</h3>
                  <div className="space-y-1 text-text">
                    <p>• Regelmäßige Sicherheitsupdates</p>
                    <p>• Zugriffsschutz für Anmeldedaten</p>
                    <p>• Monitoring der Systemintegrität</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 8. Datenschutzverletzungen */}
            <div className="bg-background-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-heading mb-4">
                8. Datenschutzverletzungen
              </h2>
              <p className="text-text leading-relaxed mb-3">
                Sollte eine Datenschutzverletzung auftreten, werden wir:
              </p>
              <div className="space-y-1 text-text">
                <p>• Betroffene Personen unverzüglich informieren (bei hohem Risiko)</p>
                <p>• Die zuständige Aufsichtsbehörde (LDI NRW) benachrichtigen</p>
                <p>• Alle erforderlichen Maßnahmen zur Abhilfe einleiten</p>
              </div>
            </div>

            {/* 9. Automatisierte Entscheidungsfindung */}
            <div className="bg-background-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-heading mb-4">
                9. Automatisierte Entscheidungsfindung
              </h2>
              <p className="text-text leading-relaxed">
                Diese Website verwendet keine automatisierte Entscheidungsfindung (z.B. Profiling). Alle Entscheidungen werden von Menschen getroffen.
              </p>
            </div>

            {/* 10. Externe Links */}
            <div className="bg-background-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-heading mb-4">
                10. Externe Links
              </h2>
              <p className="text-text leading-relaxed">
                Diese Website kann Links zu externen Websites enthalten. Für die Datenschutzpraktiken dieser externen Websites sind wir nicht verantwortlich.
              </p>
            </div>

            {/* 11. Kontakt und Datenschutzaufsicht */}
            <div className="bg-background-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-heading mb-6">
                11. Kontakt und Datenschutzaufsicht
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-heading mb-3">Unsere Kontaktdaten</h3>
                  <div className="space-y-1 text-text">
                    <p className="font-medium">Handgraaf, Luca &amp; Leineweber, Kai GbR</p>
                    <p>Moorenstraße 10, 45131 Essen</p>
                    <p>E-Mail: info@deine-fahrschul-website.de</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-heading mb-3">Zuständige Aufsichtsbehörde</h3>
                  <div className="space-y-1 text-text">
                    <p className="font-medium">Landesbeauftragte für Datenschutz und Informationsfreiheit NRW</p>
                    <p>Kavalleriestraße 8-10, 40213 Düsseldorf</p>
                    <p>Telefon: +49 (0) 211 38424-0</p>
                    <p>E-Mail: poststelle@ldi.nrw.de</p>
                    <p>Website: ldi.nrw.de</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 12. Änderungen */}
            <div className="bg-background-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-heading mb-4">
                12. Änderungen dieser Datenschutzerklärung
              </h2>
              <p className="text-text leading-relaxed mb-3">
                Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen, um sie an neue gesetzliche Anforderungen oder technische Entwicklungen anzupassen.
              </p>
              <p className="text-text font-medium">
                Letzte Aktualisierung: Dezember 2025
              </p>
            </div>

            {/* 13. Zusammenfassung */}
            <div className="bg-background-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-heading mb-6">
                13. Zusammenfassung
              </h2>
              <div className="space-y-3 text-text">
                <p><span className="font-medium text-heading">Verantwortlich:</span> Kai Leineweber, Handgraaf &amp; Leineweber GbR</p>
                <p><span className="font-medium text-heading">Daten:</span> Vorname, Nachname, Email, Telefon, Geburtsdatum, Führerscheinklasse, Starttermin, Nachricht</p>
                <p><span className="font-medium text-heading">Zweck:</span> Anmeldung zur Fahrschule</p>
                <p><span className="font-medium text-heading">Empfänger:</span> <span className="text-primary">[PLATZHALTER: FAHRSCHULE_NAME]</span> per E-Mail: <span className="text-primary">[PLATZHALTER: FAHRSCHULE_EMAIL]</span></p>
                <p><span className="font-medium text-heading">Speicherung:</span> Nicht bei uns; beim Fahrschulinhaber im Email-Postfach</p>
                <p><span className="font-medium text-heading">Ihre Rechte:</span> Auskunft, Berichtigung, Löschung, Widerspruch, Beschwerde</p>
                <p><span className="font-medium text-heading">Kontakt:</span> info@deine-fahrschul-website.de</p>
              </div>
            </div>

            {/* 14. Platzhalter-Anleitung */}
            <div className="bg-background-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold text-heading mb-6">
                14. Platzhalter ausfüllen
              </h2>
              <p className="text-text leading-relaxed mb-4">
                Folgende Platzhalter müssen für jede Fahrschule individuell ausgefüllt werden:
              </p>
              <div className="space-y-4 text-text">
                <div className="p-4 bg-background rounded-xl border border-border">
                  <p className="font-medium text-primary mb-1">[PLATZHALTER: FAHRSCHULE_NAME]</p>
                  <p className="text-sm text-muted">Name der Fahrschule, z.B. "Fahrschule Müller GmbH"</p>
                </div>
                <div className="p-4 bg-background rounded-xl border border-border">
                  <p className="font-medium text-primary mb-1">[PLATZHALTER: FAHRSCHULE_EMAIL]</p>
                  <p className="text-sm text-muted">Email-Adresse des Fahrschulinhabers, z.B. "info@fahrschule-mueller.de"</p>
                </div>
                <div className="p-4 bg-background rounded-xl border border-border">
                  <p className="font-medium text-primary mb-1">[PLATZHALTER: FAHRSCHULE_TELEFON]</p>
                  <p className="text-sm text-muted">Telefonnummer (optional), z.B. "+49 201 123456"</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center py-4">
              <p className="text-sm text-muted">
                © 2025 Handgraaf, Luca &amp; Leineweber, Kai GbR – Alle Rechte vorbehalten
              </p>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
};

export default Datenschutz;