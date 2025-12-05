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
              Datenschutz
            </h1>
            <p className="text-lg md:text-xl text-text leading-relaxed">
              Informationen zum Schutz Ihrer persönlichen Daten
            </p>
          </div>
        </Container>
      </section>
      
      {/* Content Section */}
      <section className="py-8 md:py-12 bg-background">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-background-card rounded-2xl p-8 md:p-12 border border-border shadow-sm">
              <div className="prose prose-lg max-w-none text-text">
                <p className="text-muted italic">
                  Datenschutz-Inhalte werden hier eingefügt...
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Datenschutz;