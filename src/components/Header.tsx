import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from './LayoutComponents';
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
  const telefon = config?.fahrschule.kontakt.telefon || '';
  const email = config?.fahrschule.kontakt.email || '';
  const primaryLocation = getPrimaryLocation();
  const locationName = primaryLocation?.name || '';
  
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

      // Ignoriere kleine Scroll-Bewegungen, um "Hängen" zu vermeiden
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
      <header className="sticky top-0 z-50 pt-0 pb-0 border-b-4 border-primary-500 relative shadow-lg">
        <div className="bg-primary-500 py-3 md:py-2">
          <div className="px-4 text-center text-white">Laden...</div>
        </div>
      </header>
    );
  }

  return (
    <header className={`sticky top-0 z-50 pt-0 pb-0 border-b-4 border-primary-500 relative transition-all duration-300 ${isHeaderVisible ? '' : '-translate-y-full'} ${isScrolled ? 'shadow-xl' : 'shadow-lg'}`}>
      {/* Backdrop overlay for mobile menu */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenus}
      />
      <div className="relative">
        {/* White Bar on the left side */}
        <div className="absolute left-0 top-0 w-[30%] md:w-[25%] lg:w-1/5 bg-white z-10 h-[110%]" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)', boxShadow: '4px 4px 10px rgba(0,0,0,0.1)' }}>
          <Link to="/" onClick={closeMenus} className="absolute inset-0 flex items-center justify-center py-1 transition-transform duration-200 hover:scale-105 pr-[15%]">
            <img src={logo} alt="Führerschein Website" className="w-full h-full object-contain" />
          </Link>
        </div>
        {/* Top Bar - Contact Information */}
        <div className={`bg-primary-500 pl-[30%] md:pl-[26%] lg:pl-[22%] md:pr-[60px] lg:pr-[300px] transition-all duration-300 ${isScrolled ? 'py-2 md:py-1' : 'py-3 md:py-2'}`}>
          <div className="px-4">
            <div className="flex items-center justify-between lg:justify-center md:pr-[50px] lg:pr-[100px]">
              <div className="flex items-center flex-1 lg:flex-none justify-start pl-[20%] md:pl-[10%] lg:pl-0">
                <div className="flex lg:hidden flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-inverse text-xs md:text-sm font-medium">
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span>{telefon}</span>
                  </div>
                  <Link to="/anmelden" className="bg-white text-primary-500 px-2 py-1 rounded text-xs hover:bg-primary-600 hover:text-white transition-all duration-200 hover:shadow-md">
                    Online Anmelden
                  </Link>
                  <div className="hidden sm:flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span>{email}</span>
                  </div>
                </div>
                <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 text-inverse text-sm font-semibold">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span>{telefon}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span>{email}</span>
                  </div>
                  {locationName && (
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      <span>{locationName}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Mobile Menu Button - Hamburger to X animation */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden text-white hover:text-primary-200 font-bold p-2 rounded-lg transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="relative w-6 h-6">
                  {/* Top bar */}
                  <span className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'top-[11px] rotate-45' : 'top-1 rotate-0'}`} />
                  {/* Middle bar */}
                  <span className={`absolute left-0 top-[11px] w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
                  {/* Bottom bar */}
                  <span className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'top-[11px] -rotate-45' : 'top-[19px] rotate-0'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Navigation */}
        <div className={`bg-neutral-500 hidden lg:block pl-[22%] pr-[120px] xl:pr-[300px] transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
          <div className="px-4">
            <div className="relative flex items-center justify-between">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex flex-1 justify-center space-x-4 xl:space-x-8 text-white font-bold">
                <Link
                  to="/"
                  className={`relative py-1 transition-all duration-200 font-bold group
                    ${location.pathname === '/' ? 'text-primary-400' : 'text-white hover:text-primary-400'}
                  `}
                  onClick={closeMenus}
                >
                  Home
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-400 transform transition-transform duration-300 origin-left
                    ${location.pathname === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `} />
                </Link>

                <Link
                  to="/ueber-uns"
                  className={`relative py-1 transition-all duration-200 font-bold group
                    ${location.pathname === '/ueber-uns' ? 'text-primary-400' : 'text-white hover:text-primary-400'}
                  `}
                  onClick={closeMenus}
                >
                  Über Uns
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-400 transform transition-transform duration-300 origin-left
                    ${location.pathname === '/ueber-uns' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `} />
                </Link>

                {/* Führerscheine Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className={`relative py-1 transition-all duration-200 flex items-center font-bold group
                      ${location.pathname.startsWith('/fuehrerscheine') || location.pathname.startsWith('/klasse-') ? 'text-primary-400' : 'text-white hover:text-primary-400'}
                    `}
                  >
                    Führerscheine
                    <svg className={`ml-1 w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-400 transform transition-transform duration-300 origin-left
                      ${location.pathname.startsWith('/fuehrerscheine') || location.pathname.startsWith('/klasse-') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                    `} />
                  </button>
                  <div className={`absolute top-full left-0 mt-3 w-56 bg-neutral-500/95 backdrop-blur-md border border-neutral-600 rounded-xl shadow-2xl z-10 transition-all duration-300 ease-out origin-top ${isDropdownOpen ? 'opacity-100 visible scale-100 translate-y-0' : 'opacity-0 invisible scale-95 -translate-y-2'}`}>
                    <Link
                      to="/fuehrerscheine"
                      className="block px-4 py-3 text-white hover:bg-neutral-600/50 hover:text-primary-400 rounded-t-xl transition-all duration-200"
                      onClick={closeMenus}
                    >
                      Übersicht
                    </Link>
                    <div className="border-t border-neutral-600 mx-3" />
                    {fuehrerscheineSubpages.map((page, index) => (
                      <Link
                        key={page.path}
                        to={page.path}
                        className={`block px-4 py-3 text-white hover:bg-neutral-600/50 hover:text-primary-400 transition-all duration-200 ${index === fuehrerscheineSubpages.length - 1 ? 'rounded-b-xl' : ''}`}
                        onClick={closeMenus}
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/kontakt"
                  className={`relative py-1 transition-all duration-200 font-bold group
                    ${location.pathname === '/kontakt' ? 'text-primary-400' : 'text-white hover:text-primary-400'}
                  `}
                  onClick={closeMenus}
                >
                  Kontakt
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-400 transform transition-transform duration-300 origin-left
                    ${location.pathname === '/kontakt' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `} />
                </Link>
              </nav>

              {/* CTA Button */}
              <Link
                to="/anmelden"
                className="hidden lg:block bg-primary-500 text-white px-3 xl:px-5 py-2 xl:py-2.5 rounded-lg transition-all duration-200 ml-auto font-bold text-sm xl:text-base hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap"
                onClick={closeMenus}
              >
                anmelden
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Navigation - Slide-in animation */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[var(--header-height,80px)] bg-neutral-500/98 backdrop-blur-lg z-50 transition-all duration-300 ease-out transform ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        style={{ maxHeight: 'calc(100vh - var(--header-height, 80px))', overflowY: 'auto' }}
      >
          <Container>
            <div className="py-4 border-t border-neutral-700/50">
                <nav className="flex flex-col space-y-1 text-white">
                  {/* Staggered animation for menu items */}
                  <Link
                    to="/"
                    className={`py-3 px-3 rounded-lg font-bold min-h-[44px] flex items-center transition-all duration-200 transform
                      ${location.pathname === '/' ? 'text-primary-400 bg-neutral-600/50' : 'text-white hover:text-primary-400 hover:bg-neutral-600/30'}
                      ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                    `}
                    style={{ transitionDelay: isMobileMenuOpen ? '50ms' : '0ms' }}
                    onClick={closeMenus}
                  >
                    Home
                  </Link>

                  <Link
                    to="/ueber-uns"
                    className={`py-3 px-3 rounded-lg font-bold min-h-[44px] flex items-center transition-all duration-200 transform
                      ${location.pathname === '/ueber-uns' ? 'text-primary-400 bg-neutral-600/50' : 'text-white hover:text-primary-400 hover:bg-neutral-600/30'}
                      ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                    `}
                    style={{ transitionDelay: isMobileMenuOpen ? '100ms' : '0ms' }}
                    onClick={closeMenus}
                  >
                    Über Uns
                  </Link>

                  {/* Mobile Führerscheine Section */}
                  <div
                    className={`transition-all duration-200 transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                    style={{ transitionDelay: isMobileMenuOpen ? '150ms' : '0ms' }}
                  >
                    <button
                      onClick={toggleDropdown}
                      className={`py-3 px-3 rounded-lg flex items-center justify-between w-full text-left font-bold min-h-[44px] transition-all duration-200
                        ${location.pathname.startsWith('/fuehrerscheine') || location.pathname.startsWith('/klasse-') ? 'text-primary-400 bg-neutral-600/50' : 'text-white hover:text-primary-400 hover:bg-neutral-600/30'}
                      `}
                    >
                      <span>Führerscheine</span>
                      <svg className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-out ${isDropdownOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-neutral-600 pl-3">
                        <Link
                          to="/fuehrerscheine"
                          className="block text-gray-300 hover:text-primary-400 py-2 px-2 rounded font-semibold min-h-[44px] flex items-center transition-colors duration-200"
                          onClick={closeMenus}
                        >
                          Übersicht
                        </Link>
                        {fuehrerscheineSubpages.map((page) => (
                          <Link
                            key={page.path}
                            to={page.path}
                            className="block text-gray-300 hover:text-primary-400 py-2 px-2 rounded font-semibold min-h-[44px] flex items-center transition-colors duration-200"
                            onClick={closeMenus}
                          >
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/kontakt"
                    className={`py-3 px-3 rounded-lg font-bold min-h-[44px] flex items-center transition-all duration-200 transform
                      ${location.pathname === '/kontakt' ? 'text-primary-400 bg-neutral-600/50' : 'text-white hover:text-primary-400 hover:bg-neutral-600/30'}
                      ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                    `}
                    style={{ transitionDelay: isMobileMenuOpen ? '200ms' : '0ms' }}
                    onClick={closeMenus}
                  >
                    Kontakt
                  </Link>
                  
                  <div
                    className={`pt-3 transition-all duration-200 transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                    style={{ transitionDelay: isMobileMenuOpen ? '250ms' : '0ms' }}
                  >
                    <Link
                      to="/anmelden"
                      className="bg-primary-500 text-white px-4 py-3 rounded-lg transition-all duration-200 inline-flex items-center justify-center font-bold min-h-[44px] w-full hover:bg-primary-600 hover:shadow-lg active:scale-[0.98]"
                      onClick={closeMenus}
                    >
                      Online Anmelden
                    </Link>
                  </div>
                </nav>
              </div>
          </Container>
        </div>
    </header>
  );
};

export default Header;