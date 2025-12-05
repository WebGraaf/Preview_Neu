import React from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Section } from './LayoutComponents';
import { KlassenDetailCard } from './KlassenDetailCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useConfig } from '../config';
import {
  SUBCLASS_DETAILS,
  CLASS_PAGE_HEADERS,
  CLASS_CTA,
  MAIN_CLASS_SUBCLASSES,
  SubclassDetailInfo
} from '../config/classData';
import { HauptklasseCode } from '../config/types';
import {
  Calendar, Gauge, Bike, Users, Car, Scale, Truck, Link, CheckCircle,
  User, FileText, BookOpen, Key, Settings, Cog, Package, Ruler, Ban, Leaf
} from 'lucide-react';

// Icon mapping for dynamic icon rendering
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar, Gauge, Bike, Users, Car, Scale, Truck, Link, CheckCircle,
  User, FileText, BookOpen, Key, Settings, Cog, Package, Ruler, Ban, Leaf
};

const getIcon = (iconName: string, className: string = "w-8 h-8 text-primary-500"): React.ReactNode => {
  const IconComponent = ICON_MAP[iconName];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return null;
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description }) => {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="group flex flex-col items-center text-center p-6 rounded-xl bg-background-card/50 border border-transparent hover:border-primary-200 hover:bg-background-card hover:shadow-lg transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
      }}
    >
      <div className="mb-4 p-3 rounded-full bg-primary-50 group-hover:bg-primary-100 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-heading mb-2">{title}</h4>
      <p className="text-text text-sm leading-relaxed">{description}</p>
    </div>
  );
};

interface SubclassSectionProps {
  subclassCode: string;
  details: SubclassDetailInfo;
  isAlternate: boolean;
}

const SubclassSection: React.FC<SubclassSectionProps> = ({ subclassCode, details, isAlternate }) => {
  const iconColorClass = isAlternate ? "text-primary-600" : "text-primary-500";
  const sectionBg = isAlternate ? "bg-background-card/30" : "";
  
  return (
    <div className={`${sectionBg} bg-background`}>
      {/* Subclass Detail Card */}
      <Section background="transparent" padding="sm" className="bg-background">
        <Container>
          <KlassenDetailCard
            imageSrc={details.imagePath}
            imageAlt={details.imageAlt}
            title={details.title}
            description={details.description}
            restrictions={details.restrictions}
            imagePosition={details.imagePosition}
            variant={details.variant}
          />
        </Container>
      </Section>

      {/* Info Cards Grid */}
      <Section background="transparent" padding="sm" className="bg-background pb-8 md:pb-12">
        <Container>
          <div className="bg-background-card rounded-2xl p-6 md:p-8 lg:p-10 border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {details.infoCards.map((card, index) => (
                <InfoCard
                  key={`${subclassCode}-info-${index}`}
                  icon={getIcon(card.iconName, `w-7 h-7 ${iconColorClass}`)}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

interface KlassenDetailPageProps {
  classCode: HauptklasseCode;
}

export const KlassenDetailPage: React.FC<KlassenDetailPageProps> = ({ classCode }) => {
  const { isClassActive, getActiveSubclasses, config, loading } = useConfig();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();

  // Show loading state
  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-text">Laden...</div>
      </div>
    );
  }

  // Redirect to 404 if class is not active
  if (!isClassActive(classCode)) {
    return <Navigate to="/404" replace />;
  }

  const pageHeader = CLASS_PAGE_HEADERS[classCode];
  const cta = CLASS_CTA[classCode];
  const allSubclasses = MAIN_CLASS_SUBCLASSES[classCode];
  const activeSubclasses = getActiveSubclasses(classCode);
  
  // Filter to only show active subclasses in the correct order
  const displaySubclasses = allSubclasses.filter(sub => activeSubclasses.includes(sub));

  const fahrschuleName = config?.fahrschule?.name || 'Deine Fahrschule';

  return (
    <div className="bg-background">
      <Helmet>
        <title>{pageHeader.title} - {fahrschuleName}</title>
        <meta name="description" content={pageHeader.description1} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Hero/Header Section */}
      <section className="py-8 md:py-12 bg-background">
        <Container>
          <div
            ref={headerRef as React.RefObject<HTMLDivElement>}
            className="relative"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            {/* Decorative background element */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-5">
              <div className="w-96 h-96 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 blur-3xl"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading text-center mb-6 tracking-tight">
              {pageHeader.title}
            </h1>
            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-text text-center leading-relaxed">
                {pageHeader.description1}
              </p>
              <p className="text-lg md:text-xl text-text text-center leading-relaxed">
                {pageHeader.description2}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Subclass Sections */}
      {displaySubclasses.map((subclassCode, index) => {
        const details = SUBCLASS_DETAILS[subclassCode];
        if (!details) return null;
        
        return (
          <SubclassSection
            key={subclassCode}
            subclassCode={subclassCode}
            details={details}
            isAlternate={index % 2 === 1}
          />
        );
      })}

      {/* CTA Section */}
      <section className="py-8 md:py-12 bg-background">
        <Container>
          <div className="relative bg-gradient-to-br from-background-card to-background-tint rounded-2xl p-8 md:p-12 lg:p-16 border border-border shadow-lg text-center max-w-4xl mx-auto overflow-hidden">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-transparent rounded-br-full opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary-100 to-transparent rounded-tl-full opacity-50"></div>
            
            <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-4 tracking-tight">
              {cta.title}
            </h2>
            <p className="relative text-lg md:text-xl text-text mb-8 max-w-2xl mx-auto leading-relaxed">
              {cta.description}
            </p>
            <a
              href="/anmelden"
              className="relative inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
            >
              {cta.buttonText}
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default KlassenDetailPage;