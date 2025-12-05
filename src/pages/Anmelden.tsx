import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '../components/LayoutComponents';
import { AnmeldeFormular } from '../components/AnmeldeFormular';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useConfig } from '../config';
import { CheckCircle, Clock, Users, Award } from 'lucide-react';

const Anmelden: React.FC = () => {
  const { config } = useConfig();
  const fahrschuleName = config?.fahrschule?.name || 'Fahrschule';
  
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();

  const benefits = [
    { icon: CheckCircle, text: 'Professionelle Ausbildung' },
    { icon: Clock, text: 'Flexible Termine' },
    { icon: Users, text: 'Erfahrene Fahrlehrer' },
    { icon: Award, text: 'Hohe Erfolgsquote' },
  ];

  return (
    <div className="bg-background">
      <Helmet>
        <title>Anmeldung - {fahrschuleName}</title>
        <meta name="description" content="Melde dich jetzt für deine Fahrschulausbildung an. Fülle das Formular aus und wir kontaktieren dich zeitnah. Flexible Termine und professionelle Ausbildung warten auf dich." />
        <meta name="keywords" content={`Anmeldung, Fahrschule, Führerschein, ${fahrschuleName}, Fahrausbildung`} />
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
              Deine Anmeldung
            </h1>
            <div className="space-y-4 mb-8">
              <p className="text-lg md:text-xl text-text leading-relaxed">
                Herzlich willkommen! Wir freuen uns, dass du dich für eine Ausbildung bei uns entschieden hast.
              </p>
              <p className="text-lg md:text-xl text-text leading-relaxed">
                Fülle einfach das folgende Formular aus und wir melden uns zeitnah bei dir, um alles Weitere zu besprechen. Dein Weg zum Führerschein beginnt hier!
              </p>
            </div>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 rounded-xl bg-background-card/50 border border-border hover:border-primary-200 hover:bg-background-card transition-all duration-300"
                >
                  <benefit.icon className="w-6 h-6 text-primary-500 mb-2" />
                  <span className="text-sm font-medium text-text text-center">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Form Section */}
      <section className="pb-8 md:pb-12 bg-background">
        <AnmeldeFormular />
      </section>
    </div>
  );
};

export default Anmelden;
