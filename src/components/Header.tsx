import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useConfig } from '../config';

const Header: React.FC = () => {
  const { config, loading, getNavigationItems, getPrimaryLocation } = useConfig();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Get dynamic data from config
  const logo = config?.fahrschule.logo || '/default_images/logo_default.webp';
  
  // Get phone number from primary location or general contact
  const primaryLocation = getPrimaryLocation();
  const phoneNumber = primaryLocation?.telefon || config?.fahrschule.kontakt?.telefon || '';
  
  // Get navigation items based on active classes
  const fuehrerscheineSubpages = getNavigationItems();

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsHeaderVisible(true);
      return; // Do not add scroll listener when menu is open
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for shadow/compact header
      setIsScrolled(currentScrollY > 20);

      // Mobile-only hide/show behavior
      if (window.innerWidth >= 768) return;

      const scrollDifference = currentScrollY - lastScrollY;

      // Ignore small scroll movements to avoid "sticking"
      if (Math.abs(scrollDifference) < 10) return;

      if (scrollDifference > 0 && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else if (scrollDifference < 0) {
        setIsHeaderVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Show loading state or minimal header while config loads
  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 px-[5%] md:px-[10%] pt-1 md:pt-2">
        <div className="bg-primary-600 rounded-xl shadow-lg py-2 px-4">
          <div className="text-center text-white">Laden...</div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Floating Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-[5%] md:px-[10%] pt-1 md:pt-2 transition-all duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div
          className={`bg-primary-600 rounded-xl transition-all duration-300 ${
            isScrolled ? 'shadow-2xl' : 'shadow-lg'
          }`}
        >
          <div className="px-3 md:px-4 py-2 md:py-2.5">
            <div className="flex items-center justify-between">
              {/* Logo and Phone - Left Side (Desktop) */}
              <div className="flex items-center gap-3 lg:gap-4">
                <Link
                  to="/"
                  onClick={closeMenus}
                  className="flex-shrink-0 transition-transform duration-200 hover:scale-105"
                >
                  <img
                    src={logo}
                    alt="Fahrschule Logo"
                    className="h-8 md:h-10 lg:h-11 w-auto object-contain"
                  />
                </Link>
                
                {/* Desktop: Phone number next to logo */}
                {phoneNumber && (
                  <a
                    href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                    className="hidden lg:flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{phoneNumber}</span>
                  </a>
                )}
              </div>
              
              {/* Mobile: Phone number in center */}
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                  className="lg:hidden flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {phoneNumber}
                </a>
              )}

              {/* Desktop Navigation - Right Side */}
              <nav className="hidden lg:flex items-center space-x-5 xl:space-x-6">
                <Link
                  to="/"
                  className={`relative py-1.5 transition-all duration-200 font-bold group ${
                    location.pathname === '/' ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                  onClick={closeMenus}
                >
                  Home
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 origin-left ${
                    location.pathname === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>

                <Link
                  to="/ueber-uns"
                  className={`relative py-1.5 transition-all duration-200 font-bold group ${
                    location.pathname === '/ueber-uns' ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                  onClick={closeMenus}
                >
                  Über Uns
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 origin-left ${
                    location.pathname === '/ueber-uns' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>

                {/* Führerscheine Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className={`relative py-1.5 transition-all duration-200 flex items-center font-bold group ${
                      location.pathname.startsWith('/fuehrerscheine') || location.pathname.startsWith('/klasse-')
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Führerscheine
                    <svg
                      className={`ml-1 w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 origin-left ${
                      location.pathname.startsWith('/fuehrerscheine') || location.pathname.startsWith('/klasse-')
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div
                    className={`absolute top-full right-0 mt-2 w-56 bg-primary-700/95 backdrop-blur-md border border-primary-500/30 rounded-xl shadow-2xl z-10 transition-all duration-300 ease-out origin-top ${
                      isDropdownOpen
                        ? 'opacity-100 visible scale-100 translate-y-0'
                        : 'opacity-0 invisible scale-95 -translate-y-2'
                    }`}
                  >
                    <Link
                      to="/fuehrerscheine"
                      className="block px-4 py-2.5 text-white hover:bg-primary-600/50 rounded-t-xl transition-all duration-200"
                      onClick={closeMenus}
                    >
                      Übersicht
                    </Link>
                    <div className="border-t border-primary-500/30 mx-3" />
                    {fuehrerscheineSubpages.map((page, index) => (
                      <Link
                        key={page.path}
                        to={page.path}
                        className={`block px-4 py-2.5 text-white hover:bg-primary-600/50 transition-all duration-200 ${
                          index === fuehrerscheineSubpages.length - 1 ? 'rounded-b-xl' : ''
                        }`}
                        onClick={closeMenus}
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/kontakt"
                  className={`relative py-1.5 transition-all duration-200 font-bold group ${
                    location.pathname === '/kontakt' ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                  onClick={closeMenus}
                >
                  Kontakt
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform duration-300 origin-left ${
                    location.pathname === '/kontakt' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>

                {/* CTA Button - stands out with contrasting colors */}
                <Link
                  to="/anmelden"
                  className="bg-white text-primary-600 px-4 py-1.5 rounded-lg transition-all duration-200 font-bold hover:bg-primary-50 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-0.5 active:scale-[0.98]"
                  onClick={closeMenus}
                >
                  Anmelden
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden text-white hover:text-white/80 p-1.5 rounded-lg transition-all duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="relative w-6 h-6">
                  {/* Top bar */}
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? 'top-[11px] rotate-45' : 'top-1 rotate-0'
                    }`}
                  />
                  {/* Middle bar */}
                  <span
                    className={`absolute left-0 top-[11px] w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                    }`}
                  />
                  {/* Bottom bar */}
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? 'top-[11px] -rotate-45' : 'top-[19px] rotate-0'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenus}
      />

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden fixed left-0 right-0 z-50 px-[5%] transition-all duration-300 ease-out transform ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{ top: 'calc(1rem + 70px + 0.5rem)' }}
      >
        <div
          className="bg-primary-700/98 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden"
          style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
        >
          <div className="p-3">
            <nav className="flex flex-col space-y-1 text-white">
              {/* Home */}
              <Link
                to="/"
                className={`py-2.5 px-3 rounded-lg font-bold min-h-[40px] flex items-center transition-all duration-200 transform ${
                  location.pathname === '/'
                    ? 'text-white bg-primary-600/50'
                    : 'text-white/90 hover:text-white hover:bg-primary-600/30'
                } ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                style={{ transitionDelay: isMobileMenuOpen ? '50ms' : '0ms' }}
                onClick={closeMenus}
              >
                Home
              </Link>

              {/* Über Uns */}
              <Link
                to="/ueber-uns"
                className={`py-2.5 px-3 rounded-lg font-bold min-h-[40px] flex items-center transition-all duration-200 transform ${
                  location.pathname === '/ueber-uns'
                    ? 'text-white bg-primary-600/50'
                    : 'text-white/90 hover:text-white hover:bg-primary-600/30'
                } ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                style={{ transitionDelay: isMobileMenuOpen ? '100ms' : '0ms' }}
                onClick={closeMenus}
              >
                Über Uns
              </Link>

              {/* Führerscheine Section */}
              <div
                className={`transition-all duration-200 transform ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? '150ms' : '0ms' }}
              >
                <button
                  onClick={toggleDropdown}
                  className={`py-2.5 px-3 rounded-lg flex items-center justify-between w-full text-left font-bold min-h-[40px] transition-all duration-200 ${
                    location.pathname.startsWith('/fuehrerscheine') || location.pathname.startsWith('/klasse-')
                      ? 'text-white bg-primary-600/50'
                      : 'text-white/90 hover:text-white hover:bg-primary-600/30'
                  }`}
                >
                  <span>Führerscheine</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Mobile Dropdown Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isDropdownOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-3 mt-1 space-y-1 border-l-2 border-primary-500/50 pl-3">
                    <Link
                      to="/fuehrerscheine"
                      className="block text-white/80 hover:text-white py-2 px-3 rounded font-semibold min-h-[40px] flex items-center transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      Übersicht
                    </Link>
                    {fuehrerscheineSubpages.map((page) => (
                      <Link
                        key={page.path}
                        to={page.path}
                        className="block text-white/80 hover:text-white py-2 px-3 rounded font-semibold min-h-[40px] flex items-center transition-colors duration-200"
                        onClick={closeMenus}
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kontakt */}
              <Link
                to="/kontakt"
                className={`py-2.5 px-3 rounded-lg font-bold min-h-[40px] flex items-center transition-all duration-200 transform ${
                  location.pathname === '/kontakt'
                    ? 'text-white bg-primary-600/50'
                    : 'text-white/90 hover:text-white hover:bg-primary-600/30'
                } ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                style={{ transitionDelay: isMobileMenuOpen ? '200ms' : '0ms' }}
                onClick={closeMenus}
              >
                Kontakt
              </Link>
              
              {/* CTA Button */}
              <div
                className={`pt-2 transition-all duration-200 transform ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? '250ms' : '0ms' }}
              >
                <Link
                  to="/anmelden"
                  className="bg-white text-primary-600 px-4 py-2.5 rounded-lg transition-all duration-200 inline-flex items-center justify-center font-bold min-h-[40px] w-full hover:bg-primary-50 hover:shadow-lg active:scale-[0.98]"
                  onClick={closeMenus}
                >
                  Online Anmelden
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-14 md:h-16 lg:h-18" />
    </>
  );
};

export default Header;