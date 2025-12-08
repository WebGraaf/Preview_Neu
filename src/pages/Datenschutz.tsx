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
              Gültig ab: 01.12.2025
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
                
                {/* 1. Verantwortlicher für die Datenverarbeitung */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-4">
                    1. Verantwortlicher für die Datenverarbeitung
                  </h2>
                  <p className="text-lg mb-4">
                    Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) für diese Website ist:
                  </p>
                  <div className="space-y-1 text-lg mb-4">
                    <p>[PLATZHALTER: FAHRSCHULE_NAME]</p>
                    <p>[PLATZHALTER: FAHRSCHULE_STRASSE_HAUSNUMMER]</p>
                    <p>[PLATZHALTER: FAHRSCHULE_PLZ_ORT]</p>
                    <p>[PLATZHALTER: LAND]</p>
                  </div>
                  <p className="text-lg mb-2">Vertreten durch:</p>
                  <p className="text-lg mb-4">[PLATZHALTER: INHABER/GESELLSCHAFTER]</p>
                  <div className="space-y-1 text-lg">
                    <p>E-Mail: [PLATZHALTER: FAHRSCHULE_EMAIL]</p>
                    <p>Telefon: [PLATZHALTER: FAHRSCHULE_TELEFON]</p>
                  </div>
                  <p className="text-lg mt-4">
                    Sofern für unsere Fahrschule nach den gesetzlichen Vorgaben eine Pflicht zur Benennung eines Datenschutzbeauftragten besteht, finden Sie dessen Kontaktdaten in unserem Impressum oder in einer gesonderten Information auf dieser Website.
                  </p>
                </div>

                {/* 1.2 Technischer Dienstleister */}
                <div className="pb-8 border-b border-border-divider">
                  <h3 className="text-xl font-semibold text-heading mb-4">
                    1.2 Technischer Dienstleister (Auftragsverarbeiter)
                  </h3>
                  <p className="text-lg mb-4">
                    Die technische Bereitstellung dieser Website sowie die Verarbeitung der über das Online-Anmeldeformular übermittelten Daten erfolgen im Auftrag der Fahrschule durch:
                  </p>
                  <div className="space-y-1 text-lg mb-4">
                    <p>Handgraaf, Luca & Leineweber, Kai GbR</p>
                    <p>Moorenstraße 10</p>
                    <p>45131 Essen</p>
                    <p>Deutschland</p>
                  </div>
                  <p className="text-lg">E-Mail: info@deine-fahrschul-website.de</p>
                  <p className="text-lg mt-4">
                    Die GbR handelt hierbei als Auftragsverarbeiter im Sinne von Art. 28 DSGVO und verarbeitet personenbezogene Daten ausschließlich auf unsere Weisung.
                  </p>
                </div>

                {/* 2. Allgemeine Hinweise zur Datenverarbeitung */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-4">
                    2. Allgemeine Hinweise zur Datenverarbeitung
                  </h2>
                  <p className="text-lg mb-4">
                    Diese Website wird im Auftrag unserer Fahrschule durch den oben genannten technischen Dienstleister betrieben. Beim Besuch der Website und insbesondere bei der Nutzung des Online-Anmeldeformulars werden personenbezogene Daten verarbeitet.
                  </p>
                  <p className="text-lg">
                    Die Verarbeitung erfolgt im Einklang mit der DSGVO, dem Bundesdatenschutzgesetz (BDSG) sowie den weiteren einschlägigen gesetzlichen Bestimmungen.
                  </p>
                </div>

                {/* 2.1 Bereitstellung der Website und Server-Logfiles */}
                <div className="pb-8 border-b border-border-divider">
                  <h3 className="text-xl font-semibold text-heading mb-4">
                    2.1 Bereitstellung der Website und Server-Logfiles
                  </h3>
                  <p className="text-lg mb-4">
                    Bei jedem Zugriff auf unsere Website werden automatisch bestimmte technische Daten verarbeitet, die Ihr Browser an die Server unseres Hosting-Dienstleisters (Vercel) übermittelt.
                  </p>
                  <p className="text-lg mb-2">Hierzu können insbesondere gehören:</p>
                  <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                    <li>IP-Adresse des anfragenden Endgeräts</li>
                    <li>Datum und Uhrzeit des Zugriffs</li>
                    <li>aufgerufene URL und übertragene Datenmenge</li>
                    <li>Referrer-URL (die zuvor besuchte Seite)</li>
                    <li>Browsertyp und Browserversion</li>
                    <li>verwendetes Betriebssystem</li>
                    <li>weitere technische Informationen zur Sicherstellung der Systemsicherheit</li>
                  </ul>
                  <p className="text-lg mb-2">Diese Daten werden verarbeitet, um</p>
                  <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                    <li>die Website technisch bereitzustellen,</li>
                    <li>die Systemsicherheit und Stabilität zu gewährleisten,</li>
                    <li>technische Fehler zu analysieren und zu beheben sowie</li>
                    <li>Missbrauchs- und Angriffsversuche zu erkennen.</li>
                  </ul>
                  <p className="text-lg mb-4">
                    Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren, stabilen und funktionsfähigen Betrieb der Website).
                  </p>
                  <p className="text-lg font-medium mb-2">Speicherdauer:</p>
                  <p className="text-lg">
                    Die konkrete Speicherdauer der Logdaten richtet sich nach dem jeweils genutzten Vercel-Plan. Logdaten werden in der Regel nur für eine kurze Zeitspanne (einige Tage) vorgehalten; bei erweiterten Observability-Tarifen kann die Aufbewahrung bis zu 30 Tage betragen. Anschließend werden die Daten gelöscht oder anonymisiert.
                  </p>
                </div>

                {/* 3. Online-Anmeldung und Kontaktaufnahme */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-6">
                    3. Online-Anmeldung und Kontaktaufnahme
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        3.1 Welche Daten werden erfasst?
                      </h3>
                      <p className="text-lg mb-2">
                        Wenn Sie sich über das Anmeldeformular auf dieser Website anmelden, werden in der Regel folgende personenbezogene Daten erhoben:
                      </p>
                      <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                        <li>Vorname</li>
                        <li>Nachname</li>
                        <li>E-Mail-Adresse</li>
                        <li>Telefonnummer</li>
                        <li>Geburtsdatum</li>
                        <li>gewünschte Führerscheinklasse</li>
                        <li>gewünschter Starttermin</li>
                        <li>Freitext-Nachricht (optional)</li>
                      </ul>
                      <p className="text-lg mb-2">
                        Zusätzlich können beim Absenden des Formulars aus technischen Gründen weitere Daten mitübermittelt werden, z. B.:
                      </p>
                      <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                        <li>IP-Adresse</li>
                        <li>Datum und Uhrzeit der Übermittlung</li>
                        <li>verwendeter Browser und Betriebssystem</li>
                        <li>ggf. weitere technische Metadaten (z. B. Geräteinformationen)</li>
                      </ul>
                      <p className="text-lg mb-4">
                        Diese technischen Daten werden ausschließlich zur Sicherstellung der technischen Funktionsfähigkeit, zur Missbrauchserkennung, zur IT-Sicherheit sowie zur Fehleranalyse genutzt.
                      </p>
                      <p className="text-lg">
                        Wenn Sie uns direkt per E-Mail oder telefonisch kontaktieren, verarbeiten wir die personenbezogenen Daten, die Sie uns dabei mitteilen (z. B. Name, Kontaktdaten, Inhalte der Nachricht).
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        3.2 Zwecke der Verarbeitung
                      </h3>
                      <p className="text-lg mb-2">Die Verarbeitung der genannten Daten erfolgt zu folgenden Zwecken:</p>
                      <ul className="list-disc list-inside text-lg space-y-1 ml-4">
                        <li>Bearbeitung Ihrer Anfrage / Anmeldung</li>
                        <li>Kontaktaufnahme durch unsere Fahrschule zur Beantwortung Ihrer Anfrage</li>
                        <li>Vorbereitung und Anbahnung eines Ausbildungsvertrags mit unserer Fahrschule</li>
                        <li>Organisation und Verwaltung der Fahrschulausbildung (z. B. Kursstart, Führerscheinklasse)</li>
                        <li>Sicherstellung der technischen Funktionsfähigkeit und IT-Sicherheit (insbesondere im Zusammenhang mit den unter 2.1 genannten Logfiles)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        3.3 Rechtsgrundlagen der Verarbeitung
                      </h3>
                      <p className="text-lg mb-2">Die Verarbeitung Ihrer Daten erfolgt – je nach Art der Anfrage – auf folgenden Rechtsgrundlagen:</p>
                      <div className="space-y-3 text-lg">
                        <p>
                          <strong>Art. 6 Abs. 1 lit. b DSGVO</strong><br />
                          Soweit Ihre Anfrage auf den Abschluss eines Ausbildungsvertrags mit unserer Fahrschule gerichtet ist, erfolgt die Verarbeitung zur Durchführung vorvertraglicher Maßnahmen bzw. zur Vertragserfüllung.
                        </p>
                        <p>
                          <strong>Art. 6 Abs. 1 lit. f DSGVO</strong><br />
                          Soweit kein (vor-)vertraglicher Bezug besteht, erfolgt die Verarbeitung auf Grundlage unseres berechtigten Interesses an der Bearbeitung von Anfragen und dem Betrieb einer funktionsfähigen und sicheren Website.
                        </p>
                        <p>
                          <strong>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</strong><br />
                          Soweit Sie in bestimmte Verarbeitungen gesondert einwilligen (z. B. Aktivierung von Google Maps), erfolgt die Verarbeitung zusätzlich auf Basis Ihrer Einwilligung. Diese Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (siehe Abschnitt 6.8).
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        3.4 Empfänger der Anmeldedaten
                      </h3>
                      <p className="text-lg font-medium mb-2">Innerhalb unserer Fahrschule</p>
                      <p className="text-lg mb-4">
                        Innerhalb unserer Fahrschule erhalten nur diejenigen Personen Zugriff auf Ihre Daten, die diese zur Bearbeitung von Anfragen, zur Organisation der Ausbildung oder zur Erfüllung gesetzlicher Pflichten benötigen.
                      </p>
                      <p className="text-lg font-medium mb-2">Externe Empfänger / Auftragsverarbeiter</p>
                      <p className="text-lg mb-4">
                        Ihre im Anmeldeformular eingegebenen Daten werden im Rahmen der technischen Bereitstellung der Website durch unseren Auftragsverarbeiter (GbR) verarbeitet und per E-Mail an unsere Fahrschule übermittelt. Weitere technische Dienstleister (Vercel, Hostinger) unterstützen uns dabei als Unterauftragsverarbeiter (siehe Abschnitt 4).
                      </p>
                      <ul className="list-disc list-inside text-lg space-y-2 mb-4 ml-4">
                        <li><strong>Technischer Dienstleister (Auftragsverarbeiter):</strong> Handgraaf, Luca & Leineweber, Kai GbR, Moorenstraße 10, 45131 Essen, Deutschland (technischer Betrieb und Formularverarbeitung im Auftrag der Fahrschule).</li>
                        <li><strong>Hosting / Serverinfrastruktur:</strong> Vercel Inc. (siehe Abschnitt 4.1).</li>
                        <li><strong>E-Mail-Dienstleister:</strong> Hostinger International Ltd. (siehe Abschnitt 4.2).</li>
                      </ul>
                      <p className="text-lg">
                        Eine gemeinsame Verantwortlichkeit im Sinne von Art. 26 DSGVO besteht nicht. Unsere technischen Dienstleister handeln ausschließlich auf unsere Weisung; im Falle von Datenschutzvorfällen informieren sie uns, und wir als Verantwortliche sind für etwaige Meldungen an Aufsichtsbehörden und betroffene Personen zuständig.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        3.5 Speicherdauer
                      </h3>
                      <p className="text-lg font-medium mb-2">Bei unseren technischen Dienstleistern (im Auftrag der Fahrschule):</p>
                      <ul className="list-disc list-inside text-lg space-y-2 mb-4 ml-4">
                        <li>Technische Logfiles beim Hosting-Dienstleister (Vercel) werden nur für die oben beschriebenen Zwecke (Betrieb, Sicherheit, Fehleranalyse) und abhängig vom jeweiligen Tarif für eine begrenzte Zeit (in der Regel einige Tage bis max. 30 Tage) gespeichert und anschließend gelöscht oder anonymisiert.</li>
                        <li>Etwaige interne Support-E-Mails mit Anmeldedaten, die beim technischen Dienstleister (GbR) zur Fehleranalyse oder Qualitätssicherung anfallen, werden grundsätzlich maximal 12 Monate aufbewahrt und anschließend gelöscht oder – soweit möglich – anonymisiert.</li>
                      </ul>
                      <p className="text-lg font-medium mb-2">In unserer Fahrschule:</p>
                      <p className="text-lg mb-2">Die Speicherdauer in den Systemen unserer Fahrschule (z. B. E-Mail-Postfach, Verwaltungssoftware, Buchhaltung) richtet sich nach</p>
                      <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                        <li>der Dauer der Vorbereitung und Durchführung der Fahrschulausbildung / des Ausbildungsvertrags sowie</li>
                        <li>gesetzlichen Aufbewahrungspflichten (z. B. handels- und steuerrechtliche Vorschriften).</li>
                      </ul>
                      <p className="text-lg">
                        Wir legen die konkrete Speicherdauer eigenverantwortlich fest. Nicht mehr benötigte Daten werden gelöscht oder – soweit möglich – anonymisiert.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        3.6 Pflicht zur Bereitstellung der Daten
                      </h3>
                      <p className="text-lg mb-2">
                        Die Angabe der im Formular als Pflichtfelder gekennzeichneten Daten ist erforderlich, damit wir Ihre Anfrage bearbeiten und mit Ihnen Kontakt aufnehmen können.
                      </p>
                      <p className="text-lg">
                        Die Bereitstellung dieser Daten ist freiwillig. Ohne diese Angaben kann Ihre Anmeldung jedoch nicht oder nur eingeschränkt bearbeitet werden.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Auftragsverarbeiter und technische Dienstleister */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-6">
                    4. Auftragsverarbeiter und technische Dienstleister
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        4.1 Vercel (Website-Hosting und Serverfunktionen)
                      </h3>
                      <p className="text-lg mb-4">
                        Diese Website wird über die Server der Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA bereitgestellt.
                      </p>
                      <p className="text-lg font-medium mb-2">Art der Verarbeitung:</p>
                      <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                        <li>Auslieferung der Website-Inhalte (Hosting, Content Delivery Network)</li>
                        <li>Ausführung serverseitiger Funktionen (z. B. API-Routen / Serverless Functions) zur Verarbeitung von Formularanfragen</li>
                        <li>Erstellung und Auswertung technischer Protokolle (Logfiles) zur Sicherstellung von Betrieb und Sicherheit</li>
                      </ul>
                      <p className="text-lg font-medium mb-2">Verarbeitete Daten können insbesondere sein:</p>
                      <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                        <li>IP-Adresse</li>
                        <li>Datum und Uhrzeit des Zugriffs</li>
                        <li>abgerufene URL / Seiten</li>
                        <li>Referrer-URL</li>
                        <li>Browsertyp und -version</li>
                        <li>Betriebssystem</li>
                        <li>übermittelte Formulardaten (z. B. Anmeldedaten), soweit diese über eine serverseitige Funktion verarbeitet werden</li>
                        <li>weitere technische Metadaten</li>
                      </ul>
                      <p className="text-lg mb-4">
                        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren, schnellen und effizienten Betrieb der Website und an der technischen Abwicklung von Formularanfragen).
                      </p>
                      <p className="text-lg mb-2">
                        <strong>Drittlandübermittlung:</strong> Vercel kann Daten auch auf Servern in den USA verarbeiten. Zur Absicherung des Datenschutzniveaus stützt sich Vercel insbesondere auf:
                      </p>
                      <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                        <li>die von der EU-Kommission genehmigten Standardvertragsklauseln (Art. 46 DSGVO) sowie</li>
                        <li>eine Zertifizierung nach dem EU-US Data Privacy Framework (DPF).</li>
                      </ul>
                      <p className="text-lg mb-4">
                        Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO.
                      </p>
                      <p className="text-lg">
                        <strong>Speicherdauer von Logdaten:</strong> Logdaten werden je nach Tarifmodell nur für einen begrenzten Zeitraum (von wenigen Tagen bis zu 30 Tagen bei erweiterten Observability-Optionen) gespeichert und anschließend gelöscht oder anonymisiert.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        4.2 Hostinger (E-Mail-Versand und -Empfang)
                      </h3>
                      <p className="text-lg mb-4">
                        Für den Versand und Empfang von E-Mails (z. B. Anmeldungen, Systemmails) wird der Dienstleister Hostinger International Ltd. eingesetzt.
                      </p>
                      <p className="text-lg mb-2">Beim Versand der Anmeldung per E-Mail werden insbesondere verarbeitet:</p>
                      <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                        <li>Absender- und Empfängeradresse</li>
                        <li>Inhalt der E-Mail (Ihre Anmeldedaten)</li>
                        <li>Metadaten (Zeitpunkt des Versands, technische Protokollinformationen)</li>
                      </ul>
                      <p className="text-lg mb-4">
                        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen / Vertragserfüllung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer zuverlässigen E-Mail-Kommunikation).
                      </p>
                      <p className="text-lg">
                        Hostinger agiert als Auftragsverarbeiter. Es besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO; Hostinger setzt für etwaige Datenübermittlungen in Drittländer insbesondere EU-Standardvertragsklauseln als geeignete Garantien ein. Weitere Informationen erhalten Sie in der Datenschutzerklärung und dem Data Processing Addendum von Hostinger.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        4.3 Google Maps
                      </h3>
                      <p className="text-lg mb-4">
                        Auf dieser Website kann Google Maps zur Darstellung von Karten und Standorten unserer Fahrschule eingebunden sein. Anbieter: Google Ireland Limited (für Nutzer im EWR), Gordon House, Barrow Street, Dublin 4, Irland.
                      </p>
                      <p className="text-lg font-medium mb-2">Ladeverhalten / Einwilligung</p>
                      <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                        <li>Google Maps wird nicht automatisch geladen.</li>
                        <li>Stattdessen sehen Sie zunächst einen Platzhalter mit Hinweis auf die Datenübertragung an Google.</li>
                        <li>Sie können dort wählen zwischen:
                          <ul className="list-disc list-inside ml-6 mt-1">
                            <li>„Einmal laden" (Google Maps wird einmalig für die aktuelle Sitzung geladen)</li>
                            <li>„Immer erlauben" (Google Maps wird dauerhaft aktiviert, bis Sie dies widerrufen)</li>
                          </ul>
                        </li>
                      </ul>
                      <p className="text-lg mb-4">
                        Bei Auswahl von „Immer erlauben" wird Ihre Entscheidung im LocalStorage Ihres Browsers gespeichert (siehe Abschnitt 5.2). Die Einwilligung können Sie jederzeit in den Datenschutzeinstellungen („Privatsphäre"-Link im Footer) widerrufen.
                      </p>
                      <p className="text-lg font-medium mb-2">Verarbeitete Daten können insbesondere sein:</p>
                      <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                        <li>IP-Adresse</li>
                        <li>Browserinformationen</li>
                        <li>Betriebssystem</li>
                        <li>Standortdaten (sofern von Ihrem Gerät freigegeben)</li>
                        <li>aufgerufene Seiten / Kartenkacheln</li>
                      </ul>
                      <p className="text-lg mb-4">
                        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung).
                      </p>
                      <p className="text-lg mb-4">
                        <strong>Drittlandübermittlung:</strong> Eine Übermittlung von Daten in die USA kann nicht ausgeschlossen werden. Google stützt sich hierfür auf geeignete Garantien (z. B. Standardvertragsklauseln und/oder Zertifizierungen nach dem EU-US Data Privacy Framework).
                      </p>
                      <p className="text-lg mb-2">
                        <strong>Widerruf:</strong> Sie können Ihre Einwilligung zur Nutzung von Google Maps jederzeit mit Wirkung für die Zukunft widerrufen:
                      </p>
                      <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                        <li>über die Datenschutzeinstellungen („Privatsphäre") im Footer der Website oder</li>
                        <li>indem Sie gespeicherte Entscheidungen im Browser-LocalStorage löschen.</li>
                      </ul>
                      <p className="text-lg">
                        In diesem Fall wird Google Maps nicht mehr angezeigt, bis Sie erneut zustimmen. Weitere Informationen finden Sie in der Datenschutzerklärung von Google.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. Technische Speicherung: Cookies, LocalStorage & Consent */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-6">
                    5. Technische Speicherung: Cookies, LocalStorage & Consent
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        5.1 Cookies
                      </h3>
                      <p className="text-lg mb-4">
                        Diese Website setzt keine Tracking- oder Marketing-Cookies ein.
                      </p>
                      <p className="text-lg mb-4">
                        Sofern aus technischen Gründen Cookies erforderlich sind (z. B. zur Darstellung der Website oder zur Sicherheitsgewährleistung), werden diese nur im unbedingt erforderlichen Umfang eingesetzt. In diesem Fall stützt sich die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und funktionsfähigen Betrieb der Website).
                      </p>
                      <p className="text-lg">
                        Wir setzen derzeit keine Webanalyse- oder Reichweitenmessungs-Tools ein.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        5.2 LocalStorage (Consent-Einstellungen)
                      </h3>
                      <p className="text-lg mb-2">
                        Wir speichern bestimmte Einstellungen in Ihrem Browser-LocalStorage, um Ihre Einwilligungen bzw. Ablehnungen zu dokumentieren:
                      </p>
                      <p className="text-lg mb-2">Gespeicherte Informationen können sein:</p>
                      <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                        <li>ob Sie Google Maps „immer erlauben", „einmal laden" oder abgelehnt haben</li>
                        <li>Ihre Auswahl im Consent-Banner (z. B. „alle akzeptieren", „nur essenzielle")</li>
                        <li>Zeitstempel Ihrer Entscheidung</li>
                        <li>Versionsnummer des Consent-Textes</li>
                      </ul>
                      <p className="text-lg mb-4">
                        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der rechtssicheren Dokumentation Ihrer Einwilligungen und an einer nutzerfreundlichen Darstellung der Website).
                      </p>
                      <p className="text-lg mb-4">
                        <strong>Speicherdauer:</strong> Die Daten im LocalStorage bleiben in Ihrem Browser gespeichert, bis Sie sie löschen (z. B. durch Löschen des Browser-Cache oder Zurücksetzen der Website-Daten).
                      </p>
                      <p className="text-lg">
                        Es findet kein Tracking Ihrer Aktivitäten zu Werbezwecken statt.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        5.3 Consent-Banner und Privatsphäre-Einstellungen
                      </h3>
                      <p className="text-lg mb-4">
                        Beim ersten Besuch unserer Website erscheint ein Consent-Banner, das Sie über die Verwendung von technisch notwendigen Funktionen und optionalen Diensten (insbesondere Google Maps) informiert.
                      </p>
                      <p className="text-lg font-medium mb-2">Kompakte Ansicht (erste Ebene):</p>
                      <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                        <li>Buttons mit gleichwertigem visuellen Gewicht, z. B.: „Ablehnen", „Anpassen" / „Einstellungen", „Akzeptieren" / „Alle akzeptieren"</li>
                        <li>Kurzer Hinweistext, z. B.: „Wir nutzen Cookies und ähnliche Technologien, um diese Website zu betreiben und Google Maps anzuzeigen. Mehr erfahren"</li>
                      </ul>
                      <p className="text-lg mb-4">
                        Durch Klick auf „Anpassen" / „Einstellungen" gelangen Sie zu einer erweiterten Ansicht bzw. den detaillierten Datenschutzeinstellungen.
                      </p>
                      <p className="text-lg font-medium mb-2">Erweiterte Ansicht / Datenschutzeinstellungen (Modal):</p>
                      <ul className="list-disc list-inside text-lg space-y-1 mb-4 ml-4">
                        <li>Zugriff jederzeit über den Link „Privatsphäre" im Footer unter „Rechtliches"</li>
                        <li>Detaillierte Beschreibung der jeweils eingesetzten Dienste (z. B. Google Maps)</li>
                        <li>Schalter (Toggle) für Google Maps, inkl. Hinweis auf: übertragene Daten (IP-Adresse, ggf. Standortdaten, Geräteinformationen), mögliche Übermittlung in die USA und die Rolle von Google als eigenständiger Verantwortlicher</li>
                        <li>Buttons, z. B.: „Alle ablehnen", „Auswahl speichern", „Alle akzeptieren"</li>
                        <li>Anzeige des Zeitstempels der letzten Einwilligung</li>
                      </ul>
                      <p className="text-lg">
                        So können Sie Ihre Einwilligung jederzeit leicht auffindbar anpassen oder widerrufen.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 6. Ihre Rechte als betroffene Person */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-6">
                    6. Ihre Rechte als betroffene Person
                  </h2>
                  <p className="text-lg mb-4">
                    Sie haben in Bezug auf Ihre personenbezogenen Daten folgende Rechte:
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-2">
                        6.1 Recht auf Auskunft (Art. 15 DSGVO)
                      </h3>
                      <p className="text-lg">
                        Sie können Auskunft darüber verlangen, ob wir personenbezogene Daten von Ihnen verarbeiten und, falls ja, in welchem Umfang.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-2">
                        6.2 Recht auf Berichtigung (Art. 16 DSGVO)
                      </h3>
                      <p className="text-lg">
                        Sie können die Berichtigung unrichtiger oder Vervollständigung unvollständiger Daten verlangen.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-2">
                        6.3 Recht auf Löschung (Art. 17 DSGVO)
                      </h3>
                      <p className="text-lg">
                        Sie können die Löschung Ihrer personenbezogenen Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten oder anderen Rechtsgrundlagen der Löschung entgegenstehen.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-2">
                        6.4 Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)
                      </h3>
                      <p className="text-lg">
                        Sie können in bestimmten Fällen verlangen, dass die Verarbeitung Ihrer Daten eingeschränkt wird.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-2">
                        6.5 Recht auf Datenübertragbarkeit (Art. 20 DSGVO)
                      </h3>
                      <p className="text-lg">
                        Sie haben das Recht, Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder – soweit technisch machbar – direkt an einen anderen Verantwortlichen übermitteln zu lassen.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-2">
                        6.6 Recht auf Widerspruch (Art. 21 DSGVO)
                      </h3>
                      <p className="text-lg">
                        Sie können aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einlegen, soweit diese auf Art. 6 Abs. 1 lit. e oder f DSGVO beruht. Wir verarbeiten die personenbezogenen Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-2">
                        6.7 Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)
                      </h3>
                      <p className="text-lg">
                        Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt (siehe Abschnitt 11.2).
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-2">
                        6.8 Widerruf von Einwilligungen (Art. 7 Abs. 3 DSGVO)
                      </h3>
                      <p className="text-lg">
                        Soweit die Verarbeitung auf Ihrer Einwilligung beruht (z. B. Google Maps), können Sie diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, ohne dass die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung berührt wird.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-2">
                        6.9 Geltendmachung Ihrer Rechte
                      </h3>
                      <p className="text-lg mb-2">Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:</p>
                      <div className="space-y-1 text-lg mb-4">
                        <p>[PLATZHALTER: FAHRSCHULE_NAME]</p>
                        <p>E-Mail: [PLATZHALTER: FAHRSCHULE_EMAIL]</p>
                        <p>Adresse: [PLATZHALTER: FAHRSCHULE_ANSCHRIFT]</p>
                      </div>
                      <p className="text-lg mb-4">
                        Unser technischer Dienstleister (GbR) ist als Auftragsverarbeiter nicht primärer Ansprechpartner für Betroffenenrechte. Sie können sich jedoch auch an info@deine-fahrschul-website.de wenden; das Anliegen wird dann an die jeweils zuständige Fahrschule weitergeleitet.
                      </p>
                      <p className="text-lg">
                        Wir werden Ihre Anfrage innerhalb der gesetzlichen Frist von in der Regel 30 Tagen bearbeiten. Bei komplexen Anfragen kann diese Frist einmalig um bis zu zwei weitere Monate verlängert werden.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 7. Sicherheit Ihrer Daten */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-6">
                    7. Sicherheit Ihrer Daten
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        7.1 Technische Maßnahmen
                      </h3>
                      <ul className="list-disc list-inside text-lg space-y-2 ml-4">
                        <li><strong>HTTPS/SSL-Verschlüsselung:</strong> Die Übertragung der Daten zwischen Ihrem Browser und dieser Website erfolgt über eine verschlüsselte Verbindung (TLS/SSL).</li>
                        <li><strong>Server-Sicherheit:</strong> Unsere Hosting- und Infrastruktur-Dienstleister (insbesondere Vercel) setzen aktuelle Sicherheitsmaßnahmen (z. B. technische und organisatorische Maßnahmen, Zertifizierungen) ein, um unbefugte Zugriffe zu verhindern.</li>
                        <li><strong>Sicherer E-Mail-Versand:</strong> Der Versand von E-Mails erfolgt nach Möglichkeit mit TLS-Verschlüsselung.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        7.2 Organisatorische Maßnahmen
                      </h3>
                      <ul className="list-disc list-inside text-lg space-y-1 ml-4">
                        <li>Zugriff auf die Systeme und Postfächer erhalten nur Personen, die dies zur Erfüllung ihrer Aufgaben benötigen.</li>
                        <li>Regelmäßige Aktualisierung der Systeme und Überprüfung der Sicherheitskonfigurationen.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        7.3 Verantwortung der Fahrschule
                      </h3>
                      <p className="text-lg">
                        Für die Sicherheit der in den eigenen Systemen unserer Fahrschule gespeicherten Daten (z. B. E-Mail-Postfach, Verwaltungssoftware) sind wir selbst verantwortlich (u. a. sichere Passwörter, Zugriffsschutz der Endgeräte).
                      </p>
                    </div>
                  </div>
                </div>

                {/* 8. Datenschutzverletzungen (Data Breach) */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-4">
                    8. Datenschutzverletzungen (Data Breach)
                  </h2>
                  <p className="text-lg mb-4">
                    Sollte es trotz aller Sicherheitsmaßnahmen zu einer Verletzung des Schutzes personenbezogener Daten kommen (z. B. Datenleck, unbefugter Zugriff), gilt Folgendes:
                  </p>
                  <ul className="list-disc list-inside text-lg space-y-2 ml-4">
                    <li>Unser Auftragsverarbeiter (GbR) ist verpflichtet, uns als Verantwortliche unverzüglich zu informieren, wenn bei ihm eine Datenschutzverletzung im Zusammenhang mit den von uns überlassenen Daten festgestellt wird.</li>
                    <li>Wir als Verantwortliche werden die Situation unverzüglich analysieren und bewerten.</li>
                    <li>Soweit erforderlich, informieren wir die zuständige Datenschutzaufsichtsbehörde.</li>
                    <li>Besteht ein hohes Risiko für die Rechte und Freiheiten der betroffenen Personen, werden wir diese ebenfalls benachrichtigen.</li>
                    <li>Wir ergreifen geeignete Maßnahmen, um die Verletzung zu beheben und zukünftige Vorfälle zu verhindern.</li>
                  </ul>
                </div>

                {/* 9. Automatisierte Entscheidungsfindung / Profiling */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-4">
                    9. Automatisierte Entscheidungsfindung / Profiling
                  </h2>
                  <p className="text-lg">
                    Auf dieser Website findet keine automatisierte Entscheidungsfindung im Sinne von Art. 22 DSGVO statt. Insbesondere findet kein Profiling zu Werbe- oder Analysezwecken statt.
                  </p>
                </div>

                {/* 10. Externe Links und Drittanbieter-Websites */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-4">
                    10. Externe Links und Drittanbieter-Websites
                  </h2>
                  <p className="text-lg">
                    Die Website kann Links zu externen Websites enthalten (z. B. Social-Media-Auftritte, externe Informationsangebote). Für die Inhalte und den Datenschutz dieser externen Websites sind ausschließlich deren Betreiber verantwortlich. Bitte beachten Sie dort die jeweils geltenden Datenschutzerklärungen.
                  </p>
                </div>

                {/* 11. Kontakt und Aufsichtsbehörde */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-6">
                    11. Kontakt und Aufsichtsbehörde
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        11.1 Kontaktdaten der verantwortlichen Fahrschule
                      </h3>
                      <p className="text-lg mb-2">
                        Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten oder zur Ausübung Ihrer Rechte wenden Sie sich bitte an:
                      </p>
                      <div className="space-y-1 text-lg mb-4">
                        <p>[PLATZHALTER: FAHRSCHULE_NAME]</p>
                        <p>[PLATZHALTER: FAHRSCHULE_STRASSE_HAUSNUMMER]</p>
                        <p>[PLATZHALTER: FAHRSCHULE_PLZ_ORT]</p>
                        <p>[PLATZHALTER: LAND]</p>
                      </div>
                      <div className="space-y-1 text-lg">
                        <p>E-Mail: [PLATZHALTER: FAHRSCHULE_EMAIL]</p>
                        <p>Telefon: [PLATZHALTER: FAHRSCHULE_TELEFON]</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-3">
                        11.2 Zuständige Aufsichtsbehörde
                      </h3>
                      <p className="text-lg mb-4">
                        Die für uns zuständige Datenschutzaufsichtsbehörde richtet sich nach dem Sitz unserer Fahrschule. In Deutschland sind dies die jeweiligen Landesdatenschutzbehörden. Für Fahrschulen mit Sitz in Nordrhein-Westfalen ist z. B. zuständig:
                      </p>
                      <div className="space-y-1 text-lg mb-4">
                        <p className="font-medium">Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)</p>
                        <p>Kavalleriestraße 8–10</p>
                        <p>40213 Düsseldorf</p>
                      </div>
                      <div className="space-y-1 text-lg">
                        <p>Telefon: +49 (0) 211 38424-0</p>
                        <p>E-Mail: poststelle@ldi.nrw.de</p>
                        <p>Website: https://www.ldi.nrw.de</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 12. Änderungen dieser Datenschutzerklärung */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-4">
                    12. Änderungen dieser Datenschutzerklärung
                  </h2>
                  <p className="text-lg mb-4">
                    Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich die rechtlichen oder technischen Rahmenbedingungen, die eingesetzten Dienste oder unsere Geschäftsprozesse ändern.
                  </p>
                  <p className="text-lg mb-4">
                    Die jeweils aktuelle Fassung ist jederzeit auf dieser Website abrufbar.
                  </p>
                  <p className="text-lg font-medium">
                    Letzte Aktualisierung: 01.12.2025
                  </p>
                </div>

                {/* 13. Kurzüberblick (Schnellinformation) */}
                <div className="pb-8 border-b border-border-divider">
                  <h2 className="text-2xl md:text-3xl font-semibold text-heading mb-6">
                    13. Kurzüberblick (Schnellinformation)
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-lg border-collapse">
                      <thead>
                        <tr className="border-b border-border-divider">
                          <th className="text-left py-3 pr-4 font-semibold text-heading">Aspekt</th>
                          <th className="text-left py-3 font-semibold text-heading">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-divider">
                        <tr>
                          <td className="py-3 pr-4 align-top font-medium">Verantwortlich</td>
                          <td className="py-3">[PLATZHALTER: FAHRSCHULE_NAME] (Fahrschule) als Verantwortliche im Sinne der DSGVO. Technische Bereitstellung der Website und Formularverarbeitung im Auftrag durch Handgraaf, Luca & Leineweber, Kai GbR.</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-medium">Datenarten</td>
                          <td className="py-3">Anmeldedaten (Name, Kontaktdaten, Geburtsdatum, gewünschte Führerscheinklasse, Wunschstarttermin, Nachricht), technische Zugriffsdaten (IP-Adresse, Zeitstempel, Browser-/Systeminformationen, aufgerufene Seiten, Logfiles).</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-medium">Zweck</td>
                          <td className="py-3">Bearbeitung von Anfragen und Anmeldungen zur Fahrschule, Kontaktaufnahme, Vorbereitung und Anbahnung eines Ausbildungsvertrags, Bereitstellung, Stabilität und Sicherheit der Website.</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-medium">Empfänger</td>
                          <td className="py-3">Verantwortliche Fahrschule [PLATZHALTER: FAHRSCHULE_NAME]; technische Dienstleister (GbR als Auftragsverarbeiter, Vercel als Hosting-Anbieter, Hostinger für E-Mail); ggf. Google (bei Einbindung von Google Maps und erteilter Einwilligung).</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-medium">Rechtsgrundlagen</td>
                          <td className="py-3">Art. 6 Abs. 1 lit. b DSGVO (Vertrag / vorvertragliche Maßnahmen), Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Betrieb und Sicherheit der Website, Bearbeitung von Anfragen), bei Einwilligungen (z. B. Google Maps) Art. 6 Abs. 1 lit. a DSGVO.</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-medium">Speicherung</td>
                          <td className="py-3">Bei technischen Dienstleistern nur, soweit für Betrieb, Übermittlung, Logfiles bzw. Support notwendig (Logdaten i. d. R. wenige Tage bis max. 30 Tage; Support-E-Mails beim technischen Dienstleister max. 12 Monate); in der Fahrschule gemäß Dauer der Ausbildung und gesetzlichen Aufbewahrungsfristen.</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-medium">Ihre Rechte</td>
                          <td className="py-3">Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch, Widerruf von Einwilligungen, Beschwerde bei einer Aufsichtsbehörde.</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 align-top font-medium">Kontakt</td>
                          <td className="py-3">[PLATZHALTER: FAHRSCHULE_EMAIL] (Fahrschule); zusätzlich info@deine-fahrschul-website.de für technische Rückfragen (Weiterleitung an die zuständige Fahrschule).</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Copyright */}
                <div className="pt-4">
                  <p className="text-sm text-text">
                    © 2025 [PLATZHALTER: FAHRSCHULE_NAME] – Alle Rechte vorbehalten
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

export default Datenschutz;