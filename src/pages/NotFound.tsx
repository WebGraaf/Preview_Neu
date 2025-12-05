import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container } from '../components/LayoutComponents';
import { useConfig } from '../config';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const { config } = useConfig();
  const fahrschuleName = config?.fahrschule?.name || 'Fahrschule';

  return (
    <div className="bg-background min-h-[calc(100vh-200px)] flex items-center">
      <Helmet>
        <title>Seite nicht gefunden - {fahrschuleName}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Container>
        <div className="py-8 md:py-12">
          <div className="max-w-2xl mx-auto text-center">
            {/* Decorative 404 */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 blur-3xl"></div>
              </div>
              <h1 className="relative text-9xl md:text-[12rem] font-bold text-primary-500 drop-shadow-lg tracking-tight">
                404
              </h1>
            </div>
            
            {/* Message */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-4 tracking-tight">
              Hoppla! Seite nicht gefunden.
            </h2>
            <p className="text-lg md:text-xl text-text max-w-lg mx-auto mb-10 leading-relaxed">
              Das ist uns jetzt aber unangenehm. Die von Ihnen gesuchte Seite scheint sich verfahren zu haben.
              Aber keine Sorge, wir bringen Sie sicher zurück.
            </p>
            
            {/* Navigation Options */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
              >
                <Home className="w-5 h-5" />
                Zur Startseite
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-8 py-4 bg-background-card text-heading border border-border rounded-xl font-semibold hover:bg-background-tint hover:shadow-md transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Zurück
              </button>
            </div>
            
            {/* Quick Links */}
            <div className="bg-background-card rounded-2xl p-8 border border-border shadow-sm">
              <h3 className="text-lg font-semibold text-heading mb-6">
                Vielleicht suchen Sie nach:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  to="/fuehrerscheine"
                  className="p-4 rounded-xl bg-background hover:bg-background-tint border border-transparent hover:border-primary-200 transition-all duration-300 text-center"
                >
                  <span className="text-sm font-medium text-text hover:text-heading">Führerscheinklassen</span>
                </Link>
                <Link
                  to="/anmelden"
                  className="p-4 rounded-xl bg-background hover:bg-background-tint border border-transparent hover:border-primary-200 transition-all duration-300 text-center"
                >
                  <span className="text-sm font-medium text-text hover:text-heading">Anmeldung</span>
                </Link>
                <Link
                  to="/ueber-uns"
                  className="p-4 rounded-xl bg-background hover:bg-background-tint border border-transparent hover:border-primary-200 transition-all duration-300 text-center"
                >
                  <span className="text-sm font-medium text-text hover:text-heading">Über uns</span>
                </Link>
                <Link
                  to="/kontakt"
                  className="p-4 rounded-xl bg-background hover:bg-background-tint border border-transparent hover:border-primary-200 transition-all duration-300 text-center"
                >
                  <span className="text-sm font-medium text-text hover:text-heading">Kontakt</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;