import React from 'react';
import { Helmet } from 'react-helmet-async';
import { KlassenUebersicht } from '../components/KlassenUebersicht';
import { Container } from '../components/LayoutComponents';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useConfig, CLASS_DATA, HauptklasseCode, filterSubclasses } from '../config';

const Fuehrerscheine: React.FC = () => {
  const { config, loading, getActiveClasses, getActiveSubclasses } = useConfig();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();

  const fahrschuleName = config?.fahrschule.name || 'Fahrschule';

  // Generate tabs from active classes
  const tabs = getActiveClasses().map((classCode: HauptklasseCode) => {
    const classInfo = CLASS_DATA[classCode];
    const activeSubclasses = getActiveSubclasses(classCode);
    const filteredSubclasses = filterSubclasses(classCode, activeSubclasses);

    return {
      label: classInfo.label,
      title: classInfo.title,
      content: classInfo.description,
      link: classInfo.route,
      subclasses: filteredSubclasses
    };
  });

  // Show loading state
  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center text-text">Laden...</div>
      </div>
    );
  }

  // Show message if no classes are active
  if (tabs.length === 0) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center text-text px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-heading">Keine Führerscheinklassen verfügbar</h1>
          <p className="text-lg">Bitte kontaktieren Sie uns für weitere Informationen.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <Helmet>
        <title>Führerscheinklassen - {fahrschuleName}</title>
        <meta name="description" content={`Informiere dich über alle Führerscheinklassen, die wir anbieten. Von Auto (Klasse B) über Motorrad (Klasse A) bis LKW (Klasse C) – finde die passende Ausbildung bei ${fahrschuleName}.`} />
        <meta name="keywords" content={`Führerscheinklassen, Fahrschule, Klasse A, Klasse B, Klasse C, Klasse D, LKW-Führerschein, Motorradführerschein, ${fahrschuleName}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`Führerscheinklassen - ${fahrschuleName}`} />
        <meta property="og:description" content={`Entdecke alle Führerscheinklassen bei ${fahrschuleName} und starte deine Ausbildung.`} />
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
              Führerscheinklassen
            </h1>
            <p className="text-lg md:text-xl text-text leading-relaxed">
              Entdecke alle Führerscheinklassen, die wir anbieten. Von Auto über Motorrad bis LKW – finde die passende Ausbildung für dich.
            </p>
          </div>
        </Container>
      </section>
      
      {/* License Classes Overview */}
      <section className="pb-8 md:pb-12 bg-background">
        <KlassenUebersicht tabs={tabs} />
      </section>
    </div>
  );
};

export default Fuehrerscheine;