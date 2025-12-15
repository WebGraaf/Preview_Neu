# Agent.md - Fahrschule Website Template

## 📋 Projektübersicht

Dieses Projekt ist ein **wiederverwendbares Website-Template für Fahrschulen**. Es ermöglicht die schnelle Erstellung professioneller Websites für verschiedene Fahrschul-Kunden durch JSON-basierte Konfiguration.

### Technologie-Stack
- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Animationen**: GSAP + Framer Motion
- **Build Tool**: Vite
- **Icons**: Lucide React
- **SEO**: React Helmet Async

---

## 📁 Projektstruktur

```
├── public/
│   ├── bilder-config.json          # Bildkonfiguration
│   ├── fahrschule-config.json      # Hauptkonfiguration
│   ├── schema-markup.json          # SEO Schema Markup
│   ├── default_images/             # Platzhalter-Bilder
│   └── kunde_bilder_download/      # Kundenspezifische Bilder
│
├── src/
│   ├── components/                 # Wiederverwendbare UI-Komponenten
│   ├── pages/                      # Seitenkomponenten
│   ├── config/                     # Konfigurationssystem
│   ├── hooks/                      # Custom React Hooks
│   └── lib/                        # Utility-Funktionen
│
├── kunde_informationen.md          # Kundeninformationen (zu befüllen)
├── info.md                         # Bildinformationen (zu befüllen)
└── tailwind.config.js              # Tailwind Konfiguration
```

---

## ⚙️ Konfigurationssystem

Das Projekt verwendet drei JSON-Konfigurationsdateien im `public/` Ordner:

### 1. fahrschule-config.json

Hauptkonfiguration mit:
- **Fahrschul-Stammdaten**: Name, Logo, Inhaber, Kontaktdaten, Adresse
- **Texte**: Beschreibungstexte für verschiedene Sektionen
- **Standorte**: Array mit Standortinformationen (Adresse, Öffnungszeiten, Google Maps URL)
- **Führerscheinklassen**: Aktivierung/Deaktivierung von Hauptklassen (A, B, C, D, L, T) und deren Unterklassen

### 2. bilder-config.json

Bildkonfiguration mit:
- **Galerie-Bilder**: Array für Bilderstapel
- **Sektions-Bilder**: Pfade für spezifische Bereiche
- **Team-Bilder**: Array mit Teammitgliedern (Bild, Name, Beschreibung)

### 3. schema-markup.json

SEO-Konfiguration mit strukturierten Daten für Suchmaschinen (Schema.org Format).

### Config Context

Der Zugriff auf Konfigurationsdaten erfolgt über den React Context in `src/config/ConfigContext.tsx`:

```typescript
const { config, bilderConfig, loading, error } = useConfig();
```

**Verfügbare Helper-Funktionen:**
- `isClassActive(klasse)` - Prüft ob eine Führerscheinklasse aktiv ist
- `getActiveClasses()` - Gibt alle aktiven Hauptklassen zurück
- `getActiveSubclasses(klasse)` - Gibt aktive Unterklassen einer Hauptklasse zurück
- `getPrimaryLocation()` - Gibt den Hauptstandort zurück
- `getLocationsForDisplay()` - Gibt Standorte im UI-Format zurück
- `getNavigationItems()` - Gibt Navigation-Items basierend auf aktiven Klassen zurück

---

## 🧩 Komponenten-System

### Konzept

Alle UI-Komponenten befinden sich in `/src/components/`. Diese dienen als **Vorlagen-Bibliothek**:
- Komponenten können kopiert und auf neuen Seiten eingefügt werden
- Konsistentes Styling wird durch Tailwind-Klassen gewährleistet
- Animationen sind bereits integriert (GSAP ScrollTrigger, Framer Motion)

### Komponenten-Kategorien

1. **Layout**: Container, Section, Header, Footer
2. **Hero & Banner**: Hero-Sektionen, CTA-Banner
3. **Text & Media**: Split-Layouts (Bild + Text), Overlay-Layouts
4. **Galerien**: Grid-Galerie, Bilderstapel, Vorher/Nachher-Vergleich
5. **Führerschein**: Klassenübersicht, Detailkarten, Spotlight-Grid
6. **Standorte & Kontakt**: Standort-Tabs, Kontaktinformationen, Google Maps
7. **Team & Bewertungen**: Team-Karten, Testimonials
8. **Formulare**: Anmeldeformular, FAQ-Akkordeon
9. **UI-Effekte**: Spotlight-Karten, Text-Animationen

### Komponenten-Showcase

Die Seite `/components` ([`ComponentsTest.tsx`](src/pages/ComponentsTest.tsx)) zeigt alle verfügbaren Komponenten mit Beispieldaten.

---

## 📄 Seiten-System

### Hauptseiten

Die Hauptseiten der Website sind in `/src/pages/` definiert. Die Routen werden in [`App.tsx`](src/App.tsx) konfiguriert.

### Vorlagen-Seiten

Im `/src/pages/` Ordner befinden sich Vorlagen-Seiten (`Vorlage*.tsx`), die als Basis für neue Seiten dienen:
- Verschiedene Layout-Varianten (Text-fokussiert, Media-fokussiert, gemischt)
- Können kopiert und angepasst werden
- Zeigen Best Practices für Seitenaufbau

---

## 🖼️ Bilder-System

### Default-Bilder

Im Ordner `public/default_images/` befinden sich Platzhalter-Bilder für alle Bereiche:
- Logo
- Allgemeine Fahrschul-Bilder
- Team-Platzhalter
- Bilder für jede Führerscheinklasse und Unterklasse

Diese werden verwendet, wenn keine kundenspezifischen Bilder vorhanden sind.

### Kunden-Bilder

Kundenspezifische Bilder werden in `public/kunde_bilder_download/` abgelegt und in [`info.md`](info.md) dokumentiert.

---

## 📝 Kunden-Dokumentation

### kunde_informationen.md

Diese Datei wird mit allen gesammelten Kundeninformationen befüllt:
- Firmenname und Kontaktdaten
- Standorte und Öffnungszeiten
- Angebotene Führerscheinklassen
- Texte und Beschreibungen
- Social Media Links
- Besonderheiten

### info.md

Diese Datei dokumentiert die Kundenbilder:
- Dateiname und Pfad
- Beschreibung des Bildinhalts
- Empfohlene Verwendung auf der Website

---

## 🔧 Führerscheinklassen-Daten

Die statischen Daten für Führerscheinklassen sind in [`src/config/classData.ts`](src/config/classData.ts) definiert:

- **Hauptklassen**: A, B, C, D, L, T
- **Unterklassen**: Jede Hauptklasse hat spezifische Unterklassen
- **Details pro Unterklasse**: Titel, Beschreibung, Voraussetzungen, Info-Karten, Standardbild

Die Aktivierung/Deaktivierung erfolgt über `fahrschule-config.json`.

---

## 🚀 Workflow für neue Kunden

### 1. Informationen sammeln
- Kundendaten in [`kunde_informationen.md`](kunde_informationen.md) eintragen
- Bilder in `public/kunde_bilder_download/` ablegen
- Bilder in [`info.md`](info.md) dokumentieren

### 2. Konfiguration anpassen
1. `fahrschule-config.json` aktualisieren
2. `bilder-config.json` aktualisieren
3. `schema-markup.json` aktualisieren

### 3. Anpassungen vornehmen
- Texte in der Config anpassen
- Ggf. Komponenten auf Seiten hinzufügen/entfernen
- Vorlagen-Seiten als Basis für neue Seiten nutzen

### 4. Testen
- Alle Seiten durchgehen
- Responsive Design prüfen
- Links und Navigation testen

---

## 📚 Wichtige Dateien für LLMs

Bei der Arbeit mit diesem Projekt sollten folgende Dateien zuerst gelesen werden:

1. **Konfiguration**:
   - `public/fahrschule-config.json`
   - `public/bilder-config.json`
   - `src/config/ConfigContext.tsx`
   - `src/config/types.ts`

2. **Styling**:
   - `tailwind.config.js`

3. **Komponenten**:
   - `src/pages/ComponentsTest.tsx` (Übersicht aller Komponenten)
   - Einzelne Komponenten in `src/components/`

4. **Kundeninformationen**:
   - `kunde_informationen.md`
   - `info.md`

---

## 🎯 Best Practices

### Komponenten
- Bestehende Komponenten aus `/src/components/` verwenden
- Komponenten kopieren und anpassen statt neu erstellen
- Konsistentes Styling durch Tailwind-Klassen

### Bilder
- WebP-Format bevorzugen
- Aussagekräftige Alt-Texte
- Lazy Loading für Performance

### Konfiguration
- Alle kundenspezifischen Daten in JSON-Dateien
- Keine Hardcoded-Werte in Komponenten
- Config-Context für Datenzugriff nutzen

### Animationen
- GSAP für Scroll-Animationen
- Framer Motion für Interaktionen
- Performance beachten (will-change, GPU-Beschleunigung)

---

## ⚠️ Wichtige Hinweise für Seitenentwicklung

### Layout-Komponente und Footer

**WICHTIG:** Die `Layout`-Komponente (`src/components/Layout.tsx`) enthält bereits den **Header** und **Footer**.

Wenn eine Seite mit `<Layout>` umschlossen wird:
- ❌ **KEINEN** zusätzlichen Footer oder Footer-ähnliche CTA-Sektionen am Ende der Seite hinzufügen
- ✅ Stattdessen `BannerAnmelden` aus `/src/components/BannerAnmelden.tsx` importieren und verwenden
- ✅ Der Footer wird automatisch durch die Layout-Komponente gerendert

**Beispiel für korrekten Seitenaufbau:**
```tsx
import Layout from '../components/Layout';
import BannerAnmelden from '../components/BannerAnmelden';

const MeineSeite: React.FC = () => {
  return (
    <Layout>
      <div className="bg-background">
        {/* Seiteninhalt */}
        
        {/* CTA-Banner vor dem automatischen Footer */}
        <BannerAnmelden />
      </div>
    </Layout>
  );
};
```

### Abstände und Spacing

Für konsistente Abstände auf allen Seiten:
- **Hero/Header-Sektionen**: `py-8 md:py-12` (wie auf UeberUns-Seite)
- **Normale Sektionen**: `py-8 md:py-12` oder `padding="md"` bei Komponenten
- **Referenz**: Die `UeberUns.tsx` Seite dient als Referenz für korrekte Abstände

### Komponenten kopieren vs. importieren

- **Kopieren (inline)**: Wenn Änderungen an der Komponente keine Auswirkungen auf andere Seiten haben sollen
- **Importieren**: Für globale Komponenten wie `BannerAnmelden`, `Layout`, `Header`, `Footer`