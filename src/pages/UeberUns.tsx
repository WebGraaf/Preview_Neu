import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '../components/LayoutComponents';
import { TeamBilder } from '../components/TeamBilder';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useConfig } from '../config';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LogoDefault = '/default_images/logo_default.webp';
const PlatzhalterFahrschule = '/default_images/Platzhalter_Fahrschule.webp';
const PlatzhalterTeammitglied = '/default_images/Platzhalter_Teammitglied.webp';

const SplitMediaTextCopy: React.FC<{
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  imagePosition?: 'left' | 'right';
  variant?: 'default' | 'muted' | 'outline';
  className?: string;
}> = ({
  imageSrc,
  imageAlt = '',
  title,
  description,
  imagePosition = 'left',
  variant = 'default',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!container) return;

    // Create single consolidated timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Container fade in
    tl.fromTo(
      container,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    // Image slide in - reduced distance for better performance
    if (image) {
      const imageX = imagePosition === 'left' ? -60 : 60;
      tl.fromTo(
        image,
        { opacity: 0, x: imageX },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
    }

    // Text content staggered reveal
    if (text?.children) {
      tl.fromTo(
        text.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [imagePosition]);

  const variantClasses = {
    default: 'bg-background-card border border-border',
    muted: 'bg-background-card border border-border',
    outline: 'bg-background-card border border-border',
  };

  return (
    <section ref={containerRef} className="py-6 md:py-8 bg-background">
      <div
        className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${variantClasses[variant]} ${className}`}
      >
        <div
          className={`flex flex-col md:flex-row gap-0 md:gap-8 items-stretch ${
            imagePosition === 'right' ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div ref={imageRef} className="md:w-1/2 group overflow-hidden">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover rounded-t-2xl md:rounded-t-none md:rounded-l-2xl shadow-lg"
              loading="lazy"
            />
          </div>
          <div ref={textRef} className="md:w-1/2 flex flex-col justify-center p-6 md:p-10 lg:p-12 text-left space-y-4">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight">{title}</h3>
            <p className="text-neutral-600 leading-relaxed text-base md:text-lg">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const UeberUns: React.FC = () => {
  const { config, bilderConfig } = useConfig();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { elementRef: teamHeaderRef, isVisible: teamHeaderVisible } = useScrollReveal();
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  // Get intro text from config with fallback
  const ueberUnsIntro = config?.texte?.ueberUnsIntro || 'Seit über 20 Jahren sind wir deine Fahrschule des Vertrauens. Mit viel Herz, Erfahrung und modernster Ausstattung begleiten wir dich auf deinem Weg zum Führerschein.\n\nUnser Ziel ist es nicht nur, dir das Fahren beizubringen, sondern dich zu einem sicheren und verantwortungsvollen Verkehrsteilnehmer zu machen.';
  
  // Split intro text by double newline to create paragraphs
  const introParagraphs = ueberUnsIntro.split('\n\n');

  // Get images from bilder-config with fallbacks
  const unsereWerteImage = bilderConfig?.unsereWerte || PlatzhalterFahrschule;
  
  // Get team members from bilder-config with fallbacks
  const teamMembersFromConfig = bilderConfig?.team || [
    { imageSrc: PlatzhalterTeammitglied, name: 'Michael Schmidt', description: 'Geschäftsführer und Fahrlehrer seit 20 Jahren. Mit Leidenschaft und Geduld bringt er jedem das sichere Fahren bei.' },
    { imageSrc: PlatzhalterTeammitglied, name: 'Sarah Müller', description: 'Fahrlehrerin für Klasse B und A. Bekannt für ihre ruhige Art und ihre verständlichen Erklärungen.' },
    { imageSrc: PlatzhalterTeammitglied, name: 'Thomas Weber', description: 'Spezialist für LKW-Führerscheine. Mit über 15 Jahren Erfahrung im Bereich Berufskraftfahrer-Ausbildung.' },
    { imageSrc: PlatzhalterTeammitglied, name: 'Lisa Hoffmann', description: 'Unsere freundliche Büroleiterin. Sie kümmert sich um alle organisatorischen Fragen und Anmeldungen.' }
  ];

  // Convert team members to the format expected by TeamBilder component
  const teamMembers = teamMembersFromConfig.map(member => ({
    imageSrc: member.imageSrc,
    imageAlt: `${member.name}`,
    title: member.name,
    description: member.description || '',
  }));

  // Split team members into rows of 2 for desktop display
  const teamRows: typeof teamMembers[] = [];
  for (let i = 0; i < teamMembers.length; i += 2) {
    teamRows.push(teamMembers.slice(i, i + 2));
  }

  return (
    <div className="bg-background">
      <Helmet>
        <title>Über Uns - Deine Fahrschule</title>
        <meta name="description" content="Lerne das Team und die Geschichte von [Fahrschulname] kennen. Erfahre mehr über unsere Mission, unsere Werte und warum wir die richtige Wahl für deine Fahrausbildung sind." />
        <meta name="keywords" content="Über uns, Fahrschule, Team, Geschichte, Mission, Werte, [Fahrschulname]" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Über Uns - Dein Team für den Führerschein" />
        <meta property="og:description" content="Wir sind [Fahrschulname] – lerne uns und unsere Philosophie kennen." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="[Ihre-Webseiten-URL]/ueber-uns" />
        <meta property="og:image" content="[Ihre-Webseiten-URL]/og-image-ueber-uns.jpg" />
        <link rel="canonical" href="[Ihre-Webseiten-URL]/ueber-uns" />
      </Helmet>
      
      {/* Hero/Intro Section */}
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
              Über uns
            </h1>
            <div className="space-y-4">
              {introParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg md:text-xl text-text leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-8 md:py-12 bg-background">
        <Container>
          <SplitMediaTextCopy
            imageSrc={LogoDefault}
            imageAlt="Unsere Mission"
            title="Unsere Mission"
            description="Wir glauben daran, dass jeder das Recht hat, mobil und unabhängig zu sein. Deshalb setzen wir auf eine individuelle, geduldige und moderne Ausbildung. Egal ob jung oder alt, Anfänger oder Umsteiger - bei uns bist du in guten Händen. Deine Sicherheit und dein Erfolg stehen für uns an erster Stelle."
            imagePosition="left"
            variant="muted"
          />
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-8 md:py-12 bg-background">
        <Container>
          <SplitMediaTextCopy
            imageSrc={unsereWerteImage}
            imageAlt="Unsere Werte"
            title="Unsere Werte"
            description="Lernen soll Spaß machen! Deshalb gestalten wir unseren Unterricht abwechslungsreich, praxisnah und auf Augenhöhe. Wir nehmen uns Zeit für deine Fragen und gehen auf deine individuellen Bedürfnisse ein. Dein Erfolg ist unser Antrieb - gemeinsam erreichen wir dein Ziel!"
            imagePosition="right"
            variant="outline"
          />
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-8 md:py-12 bg-background">
        <Container>
          <div
            ref={teamHeaderRef as React.RefObject<HTMLDivElement>}
            className="text-center mb-12 md:mb-16"
            style={{
              opacity: teamHeaderVisible ? 1 : 0,
              transform: teamHeaderVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-4 tracking-tight">
              Unser Team
            </h2>
            <p className="text-lg md:text-xl text-text max-w-2xl mx-auto leading-relaxed">
              Lerne die Menschen kennen, die dich auf deinem Weg zum Führerschein begleiten. Unser Team besteht aus erfahrenen, geduldigen und freundlichen Fahrlehrern.
            </p>
          </div>

          <div className="space-y-8 md:space-y-10">
            {teamRows.map((row, index) => (
              <TeamBilder
                key={index}
                teams={row}
                variant={index % 2 === 0 ? 'default' : 'muted'}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 bg-background">
        <Container>
          <div
            ref={ctaRef as React.RefObject<HTMLDivElement>}
            className="relative bg-gradient-to-br from-background-card to-background-tint rounded-2xl p-8 md:p-12 lg:p-16 border border-border shadow-lg text-center max-w-4xl mx-auto overflow-hidden"
            style={{
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-transparent rounded-br-full opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary-100 to-transparent rounded-tl-full opacity-50"></div>
            
            <h2 className="relative text-3xl md:text-4xl font-bold text-heading mb-4 tracking-tight">
              Werde Teil unserer Familie
            </h2>
            <p className="relative text-lg md:text-xl text-text mb-8 max-w-2xl mx-auto leading-relaxed">
              Hunderte zufriedene Fahrschüler haben bereits bei uns ihren Führerschein gemacht. Jetzt bist du an der Reihe! Melde dich noch heute an und starte deine Fahrt in die Zukunft.
            </p>
            <a
              href="/anmelden"
              className="relative inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out shadow-lg"
            >
              Jetzt anmelden
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default UeberUns;
