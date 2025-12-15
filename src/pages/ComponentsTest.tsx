import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Car, Shield, Users, Award, Clock, MapPin, Phone, CheckCircle, Star, Zap, GraduationCap, Trophy, ThumbsUp, HeartHandshake } from 'lucide-react';

// Import all components from /src/components (excluding ui/, Layout, Header, ScrollToTop, SchemaMarkup, ConsentBanner, ConsentSettings)
import { AnmeldeFormular } from '../components/AnmeldeFormular';
import { IconBadgeTextSplit } from '../components/IconBadgeTextSplit';
import { IconListTextSplit } from '../components/IconListTextSplit';
import { IconTextFeature } from '../components/IconTextFeature';
import { IconTextList } from '../components/IconTextList';
import BannerAnmelden from '../components/BannerAnmelden';
import BannerMitIcons from '../components/BannerMitIcons';
import Bewertungen from '../components/Bewertungen';
import { BilderGallerie } from '../components/BilderGallerie';
import BilderGallerieStapel from '../components/BilderGallerieStapel';
import { FAQ } from '../components/FAQ';
import { GoogleMaps } from '../components/GoogleMaps';
import { HeroStartseite } from '../components/HeroStartseite';
import KartenSpotlight from '../components/KartenSpotlight';
import { KlassenDetailCard } from '../components/KlassenDetailCard';
import { KlassenUebersicht } from '../components/KlassenUebersicht';
import { KlassenUebersichtGridSpotlight } from '../components/KlassenUebersichtGridSpotlight';
import { Kontaktinformationen } from '../components/Kontaktinformationen';
import { OverlayMediaText } from '../components/OverlayMediaText';
import { Preisliste } from '../components/Preisliste';
import { SplitMediaText } from '../components/SplitMediaText';
import { SplitMediaText1zu1 } from '../components/SplitMediaText1zu1';
import { SplitMediaText1zu1invert } from '../components/SplitMediaText1zu1invert';
import { SplitMediaTextInvert } from '../components/SplitMediaTextInvert';
import SpotlightCard from '../components/SpotlightCard';
import { StandorteUebersicht } from '../components/StandorteUebersicht';
import { TeamBilder } from '../components/TeamBilder';
import { DemoTextAnimationHero } from '../components/TextAnimationHero';
import { TextGalerieStapel } from '../components/TextGalerieStapel';
import VorherNacherBildVergleich from '../components/VorherNacherBildVergleich';

// Default images for demo purposes
const Platzhalter_Teammitglied = '/default_images/Platzhalter_Teammitglied.webp';
const Klasse_B_Default = '/default_images/Klasse_B_Default.webp';
const Klasse_A_Default = '/default_images/Klasse_A_Default.webp';
const Klasse_A1_Default = '/default_images/Klasse_A1_Default.webp';
const Klasse_A2_Default = '/default_images/Klasse_A2_Default.webp';
const Klasse_AM_Default = '/default_images/Klasse_AM_Default.webp';
const Klasse_C_Default = '/default_images/Klasse_C_Default.webp';
const Klasse_D_Default = '/default_images/Klasse_D_Default.webp';
const Klasse_L_Default = '/default_images/Klasse_L_Default.webp';
const Klasse_T_Default = '/default_images/Klasse_T_Default.webp';
const LogoDefault = '/default_images/logo_default.webp';

// Component Section Wrapper for consistent styling
const ComponentSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ 
  title, 
  children, 
  className = '' 
}) => (
  <section className={`py-12 border-b border-neutral-200 ${className}`}>
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6 pb-2 border-b-2 border-primary-500 inline-block">
        {title}
      </h2>
      <div className="mt-6">
        {children}
      </div>
    </div>
  </section>
);

const ComponentsTest: React.FC = () => {
  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>Component Showcase</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Page Header */}
      <div className="bg-neutral-900 text-white py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h1 className="text-4xl font-bold mb-4">Component Showcase</h1>
          <p className="text-neutral-300 text-lg">
            Live preview of all components from /src/components. Changes to components are reflected here immediately.
          </p>
        </div>
      </div>

      {/* NEW: IconBadgeTextSplit */}
      <ComponentSection title="IconBadgeTextSplit (NEU)">
        <IconBadgeTextSplit
          title="Unsere Stärken auf einen Blick"
          description="Mit über 20 Jahren Erfahrung in der Fahrausbildung haben wir tausende Fahrschüler erfolgreich zum Führerschein begleitet. Unser Team aus qualifizierten Fahrlehrern setzt auf moderne Lehrmethoden und individuelle Betreuung, damit Sie sicher und selbstbewusst auf die Straße kommen."
          badges={[
            {
              icon: <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
              label: "Erfahrung"
            },
            {
              icon: <Trophy className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
              label: "Erfolgsquote"
            },
            {
              icon: <ThumbsUp className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
              label: "Qualität"
            },
            {
              icon: <HeartHandshake className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
              label: "Betreuung"
            }
          ]}
          variant="bordered"
          badgePosition="left"
        />
      </ComponentSection>

      {/* IconBadgeTextSplit - Elevated Variant */}
      <ComponentSection title="IconBadgeTextSplit (Elevated, Right)">
        <IconBadgeTextSplit
          title="Moderne Ausstattung"
          description="Unsere Fahrschule verfügt über eine moderne Fahrzeugflotte und digitale Lernmittel. Von der Theorie-App bis zum Fahrsimulator – wir nutzen die neuesten Technologien für Ihren Lernerfolg."
          badges={[
            {
              icon: <Car className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
              label: "Fahrzeuge"
            },
            {
              icon: <Shield className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
              label: "Sicherheit"
            },
            {
              icon: <Zap className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
              label: "Technik"
            }
          ]}
          variant="elevated"
          badgePosition="right"
        />
      </ComponentSection>

      {/* NEW: IconListTextSplit */}
      <ComponentSection title="IconListTextSplit (NEU)">
        <IconListTextSplit
          title="Ihre Vorteile bei uns"
          description="Wir begleiten Sie auf dem Weg zum Führerschein mit einem umfassenden Ausbildungskonzept. Von der ersten Theoriestunde bis zur bestandenen Prüfung stehen wir Ihnen mit Rat und Tat zur Seite. Profitieren Sie von unserer langjährigen Erfahrung und unserem engagierten Team."
          items={[
            {
              icon: <CheckCircle className="w-6 h-6 text-primary" />,
              text: "Individuelle Betreuung durch erfahrene Fahrlehrer"
            },
            {
              icon: <Clock className="w-6 h-6 text-primary" />,
              text: "Flexible Terminvereinbarung auch am Wochenende"
            },
            {
              icon: <Car className="w-6 h-6 text-primary" />,
              text: "Moderne Fahrzeuge mit neuester Sicherheitstechnik"
            },
            {
              icon: <Award className="w-6 h-6 text-primary" />,
              text: "Hohe Erfolgsquote bei Erst- und Wiederholungsprüfungen"
            }
          ]}
          variant="bordered"
          listPosition="left"
        />
      </ComponentSection>

      {/* IconListTextSplit - Right Variant */}
      <ComponentSection title="IconListTextSplit (Elevated, Right)">
        <IconListTextSplit
          title="Unser Ausbildungskonzept"
          description="Mit unserem bewährten Ausbildungskonzept erreichen Sie Ihr Ziel schnell und sicher. Wir setzen auf eine Kombination aus fundierter Theorie und praxisnaher Fahrausbildung."
          items={[
            {
              icon: <GraduationCap className="w-6 h-6 text-primary" />,
              text: "Strukturierter Theorieunterricht mit modernen Medien"
            },
            {
              icon: <MapPin className="w-6 h-6 text-primary" />,
              text: "Praxisnahe Fahrstunden in Stadt und Umgebung"
            },
            {
              icon: <Users className="w-6 h-6 text-primary" />,
              text: "Kleine Gruppen für optimalen Lernerfolg"
            },
            {
              icon: <Star className="w-6 h-6 text-primary" />,
              text: "Intensive Prüfungsvorbereitung inklusive"
            }
          ]}
          variant="elevated"
          listPosition="right"
        />
      </ComponentSection>

      {/* IconTextFeature */}
      <ComponentSection title="IconTextFeature">
        <IconTextFeature
          title="Warum unsere Fahrschule?"
          subtitle="Entdecken Sie die Vorteile einer Ausbildung bei uns"
          features={[
            {
              icon: <Star className="w-8 h-8 text-primary-500" />,
              title: "Top Bewertungen",
              description: "Über 500 zufriedene Fahrschüler mit 5-Sterne-Bewertungen."
            },
            {
              icon: <Clock className="w-8 h-8 text-primary-500" />,
              title: "Flexible Zeiten",
              description: "Fahrstunden auch abends und am Wochenende möglich."
            },
            {
              icon: <Zap className="w-8 h-8 text-primary-500" />,
              title: "Schneller Erfolg",
              description: "Durchschnittlich nur 8 Wochen bis zur bestandenen Prüfung."
            }
          ]}
          columns={3}
          variant="bordered"
        />
      </ComponentSection>

      {/* NEW: IconTextList */}
      <ComponentSection title="IconTextList (NEU)">
        <IconTextList
          title="Unsere Leistungen im Überblick"
          items={[
            {
              icon: <CheckCircle className="w-6 h-6 text-primary-500" />,
              title: "Theorieunterricht",
              description: "Moderner Unterricht mit digitalen Medien und interaktiven Übungen."
            },
            {
              icon: <Car className="w-6 h-6 text-primary-500" />,
              title: "Praktische Fahrstunden",
              description: "Individuelle Betreuung mit erfahrenen Fahrlehrern."
            },
            {
              icon: <MapPin className="w-6 h-6 text-primary-500" />,
              title: "Zentrale Lage",
              description: "Gut erreichbar mit öffentlichen Verkehrsmitteln."
            },
            {
              icon: <Phone className="w-6 h-6 text-primary-500" />,
              title: "Persönliche Beratung",
              description: "Wir sind jederzeit für Ihre Fragen da."
            }
          ]}
          variant="card"
          iconPosition="left"
        />
      </ComponentSection>

      {/* 1. AnmeldeFormular */}
      <ComponentSection title="AnmeldeFormular">
        <AnmeldeFormular />
      </ComponentSection>

      {/* 2. BannerAnmelden */}
      <ComponentSection title="BannerAnmelden">
        <BannerAnmelden />
      </ComponentSection>

      {/* 3. BannerMitIcons */}
      <ComponentSection title="BannerMitIcons">
        <BannerMitIcons
          items={[
            {
              icon: <Car className="w-12 h-12 text-primary-500" />,
              title: "Moderne Fahrzeuge",
              description: "Unsere Fahrzeugflotte besteht aus modernen, sicheren Autos."
            },
            {
              icon: <Shield className="w-12 h-12 text-primary-500" />,
              title: "Sicherheit zuerst",
              description: "Wir legen größten Wert auf Ihre Sicherheit."
            },
            {
              icon: <Users className="w-12 h-12 text-primary-500" />,
              title: "Erfahrene Fahrlehrer",
              description: "Qualifizierte und erfahrene Fahrlehrer."
            },
            {
              icon: <Award className="w-12 h-12 text-primary-500" />,
              title: "Hohe Erfolgsquote",
              description: "Über 95% bestehen beim ersten Versuch."
            }
          ]}
        />
      </ComponentSection>

      {/* 4. Bewertungen */}
      <ComponentSection title="Bewertungen">
        <Bewertungen />
      </ComponentSection>

      {/* 5. BilderGallerie */}
      <ComponentSection title="BilderGallerie">
        <BilderGallerie
          images={[
            Klasse_A_Default,
            Klasse_A1_Default,
            Klasse_A2_Default,
            Klasse_B_Default,
            Klasse_C_Default,
            Klasse_D_Default,
          ]}
        />
      </ComponentSection>

      {/* 6. BilderGallerieStapel */}
      <ComponentSection title="BilderGallerieStapel">
        <BilderGallerieStapel
          images={[
            { src: Klasse_A_Default, alt: "Klasse A" },
            { src: Klasse_A1_Default, alt: "Klasse A1" },
            { src: Klasse_A2_Default, alt: "Klasse A2" },
            { src: Klasse_AM_Default, alt: "Klasse AM" },
            { src: Klasse_B_Default, alt: "Klasse B" },
          ]}
        />
      </ComponentSection>

      {/* 7. FAQ */}
      <ComponentSection title="FAQ">
        <FAQ
          faqs={[
            {
              question: 'Wie melde ich mich an?',
              answer: 'Personalausweis/Reisepass, biometrisches Passfoto, Sehtest, Erste-Hilfe-Kurs.'
            },
            {
              question: 'Wie lange dauert der Führerschein?',
              answer: 'Typisch 6–12 Wochen – abhängig von Kursstart und Lernfortschritt.'
            },
            {
              question: 'Was kostet der Führerschein?',
              answer: 'Kosten variieren regional; als grober Richtwert für B: ca. 1.800–3.000 €.'
            }
          ]}
        />
      </ComponentSection>

      {/* 8. GoogleMaps */}
      <ComponentSection title="GoogleMaps">
        <GoogleMaps
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.381238421374!2d6.955932615749427!3d50.941278979546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf25a8d8ee0685%3A0x40dabd2a4b6d3e0!2sK%C3%B6lner%20Dom!5e0!3m2!1sde!2sde!4v1620000000000!5m2!1sde!2sde"
          height="300px"
        />
      </ComponentSection>

      {/* 9. HeroStartseite */}
      <ComponentSection title="HeroStartseite">
        <HeroStartseite
          title="Wir machen dich mobil!"
          subtitle="Deine Fahrschule"
          description="Erfahren Sie mehr über unsere Kurse und starten Sie Ihre Fahrausbildung."
          buttonText="Jetzt anmelden"
          buttonLink="/anmelden"
          logoSrc={LogoDefault}
          logoAlt="Fahrschule Logo"
        />
      </ComponentSection>

      {/* 10. KartenSpotlight */}
      <ComponentSection title="KartenSpotlight">
        <KartenSpotlight className="max-w-md" spotlightColor="primary">
          <h3 className="text-2xl font-bold text-card-foreground mb-4">Spotlight Card Demo</h3>
          <p className="text-muted-foreground">
            Hover over the card to see the spotlight effect following your mouse.
          </p>
        </KartenSpotlight>
      </ComponentSection>

      {/* 11. KlassenDetailCard */}
      <ComponentSection title="KlassenDetailCard">
        <KlassenDetailCard
          imageSrc={Klasse_B_Default}
          imageAlt="Klasse B Fahrzeug"
          title="Klasse B"
          description="Die Klasse B berechtigt zum Führen von Kraftfahrzeugen mit einer zulässigen Gesamtmasse von nicht mehr als 3.500 kg."
          restrictions={[
            'Mindestalter: 18 Jahre (17 mit BF17)',
            'Sehtest erforderlich',
            'Erste-Hilfe-Kurs erforderlich'
          ]}
          imagePosition="left"
          variant="default"
        />
      </ComponentSection>

      {/* 12. KlassenUebersicht */}
      <ComponentSection title="KlassenUebersicht">
        <KlassenUebersicht
          tabs={[
            {
              label: 'Klasse A',
              title: 'Führerschein Klasse A',
              content: 'Die Klasse A berechtigt zum Führen von Krafträdern.',
              link: '/fuehrerscheine/klasse-a',
              subclasses: [
                { code: 'AM', description: 'Kleinkrafträder bis 45 km/h' },
                { code: 'A1', description: 'Leichtkrafträder bis 125 ccm' },
                { code: 'A2', description: 'Motorräder bis 35 kW' },
                { code: 'A', description: 'Alle Motorräder' }
              ]
            },
            {
              label: 'Klasse B',
              title: 'Führerschein Klasse B',
              content: 'Die Klasse B berechtigt zum Führen von PKW.',
              link: '/fuehrerscheine/klasse-b',
              subclasses: [
                { code: 'B', description: 'Pkw bis 3,5 t' },
                { code: 'BE', description: 'Pkw + Anhänger' }
              ]
            }
          ]}
        />
      </ComponentSection>

      {/* 13. KlassenUebersichtGridSpotlight */}
      <ComponentSection title="KlassenUebersichtGridSpotlight">
        <KlassenUebersichtGridSpotlight />
      </ComponentSection>

      {/* 14. Kontaktinformationen */}
      <ComponentSection title="Kontaktinformationen">
        <Kontaktinformationen />
      </ComponentSection>

      {/* 15. OverlayMediaText */}
      <ComponentSection title="OverlayMediaText">
        <OverlayMediaText
          imageSrc={Klasse_L_Default}
          imageAlt="Sample Image"
          title="Overlay Media Text"
          description="Text overlaid on an image with customizable opacity."
          overlayOpacity={0.5}
          textPosition="center"
          variant="default"
        />
      </ComponentSection>

      {/* 16. Preisliste */}
      <ComponentSection title="Preisliste">
        <Preisliste />
      </ComponentSection>

      {/* 17. SplitMediaText */}
      <ComponentSection title="SplitMediaText">
        <SplitMediaText
          imageSrc={Klasse_A_Default}
          imageAlt="Sample Image"
          title="Split Media Text"
          description="Image alongside text in a split layout."
          imagePosition="left"
          variant="default"
        />
      </ComponentSection>

      {/* 18. SplitMediaText1zu1 */}
      <ComponentSection title="SplitMediaText1zu1">
        <SplitMediaText1zu1
          imageSrc={Klasse_C_Default}
          imageAlt="Sample Image"
          title="Split Media Text 1:1"
          description="Image and text in a 50/50 split layout."
          variant="default"
        />
      </ComponentSection>

      {/* 19. SplitMediaText1zu1invert */}
      <ComponentSection title="SplitMediaText1zu1invert">
        <SplitMediaText1zu1invert
          imageSrc={Klasse_D_Default}
          imageAlt="Sample Image"
          title="Split Media Text 1:1 Invert"
          description="Image on right, text on left in 50/50 layout."
          variant="default"
        />
      </ComponentSection>

      {/* 20. SplitMediaTextInvert */}
      <ComponentSection title="SplitMediaTextInvert">
        <SplitMediaTextInvert
          imageSrc={Klasse_B_Default}
          imageAlt="Sample Image"
          title="Split Media Text Invert"
          description="Image on right, text on left."
          variant="default"
        />
      </ComponentSection>

      {/* 21. SpotlightCard */}
      <ComponentSection title="SpotlightCard">
        <SpotlightCard className="max-w-md">
          <h3 className="text-xl font-bold text-white mb-2">Spotlight Card</h3>
          <p className="text-neutral-300">
            A card with a spotlight effect that follows your mouse.
          </p>
        </SpotlightCard>
      </ComponentSection>

      {/* 22. StandorteUebersicht */}
      <ComponentSection title="StandorteUebersicht">
        <StandorteUebersicht
          locations={[
            {
              label: 'Köln',
              address: 'Domkloster 4, 50667 Köln',
              phone: '+49 221 12345678',
              hours: 'Mo-Fr: 9:00-18:00',
              mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.381238421374!2d6.955932615749427!3d50.941278979546'
            },
            {
              label: 'Stuttgart',
              address: 'Königstraße 1, 70173 Stuttgart',
              phone: '+49 711 98765432',
              hours: 'Mo-Fr: 9:00-18:00',
              mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.0000000000005!2d9.175!3d48.775'
            }
          ]}
        />
      </ComponentSection>

      {/* 23. TeamBilder */}
      <ComponentSection title="TeamBilder">
        <TeamBilder
          teams={[
            {
              imageSrc: Platzhalter_Teammitglied,
              imageAlt: "Team Member 1",
              title: "Max Mustermann",
              description: "Erfahrener Fahrlehrer mit über 15 Jahren Erfahrung."
            },
            {
              imageSrc: Platzhalter_Teammitglied,
              imageAlt: "Team Member 2",
              title: "Anna Schmidt",
              description: "Expertin für Theorieunterricht und Prüfungsvorbereitung."
            }
          ]}
          variant="default"
        />
      </ComponentSection>

      {/* 24. TextAnimationHero (DemoTextAnimationHero) */}
      <ComponentSection title="TextAnimationHero (Demo)">
        <DemoTextAnimationHero />
      </ComponentSection>

      {/* 25. TextGalerieStapel */}
      <ComponentSection title="TextGalerieStapel">
        <TextGalerieStapel
          title="Entdecken Sie unsere Fahrschule"
          description="Moderne Fahrschule mit erfahrenen Fahrlehrern."
          images={[
            { src: Klasse_A_Default, alt: "Klasse A" },
            { src: Klasse_B_Default, alt: "Klasse B" },
            { src: Klasse_C_Default, alt: "Klasse C" },
            { src: Klasse_D_Default, alt: "Klasse D" },
          ]}
          imagePosition="right"
        />
      </ComponentSection>

      {/* 26. VorherNacherBildVergleich */}
      <ComponentSection title="VorherNacherBildVergleich">
        <VorherNacherBildVergleich
          beforeImage={Klasse_A_Default}
          afterImage={Klasse_B_Default}
          beforeLabel="Vorher"
          afterLabel="Nachher"
        />
      </ComponentSection>

      {/* Footer note */}
      <div className="py-8 text-center text-neutral-500 text-sm">
        <p>Components not shown: Layout, LayoutComponents, Header, ScrollToTop, SchemaMarkup, ConsentBanner, ConsentSettings, KlassenDetailPage</p>
        <p className="mt-2">These are structural or consent-related components that may interfere with the page.</p>
      </div>
    </div>
  );
};

export default ComponentsTest;