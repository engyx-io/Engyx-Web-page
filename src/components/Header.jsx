import React, { useState, useMemo, memo, useEffect, useRef } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, BookOpen, HelpCircle, Mail } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useTranslation } from 'react-i18next';
    import { 
      DropdownMenu, 
      DropdownMenuTrigger, 
      DropdownMenuContent, 
      DropdownMenuItem, 
    } from '@/components/ui/dropdown-menu';
    import LanguageSwitcher from '@/components/LanguageSwitcher';
    import AuthNavButton from '@/components/AuthNavButton';

    const Header = ({ handleFeatureClick, showPresalePage }) => {

      const location = useLocation();
      const { t, i18n } = useTranslation('common');
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const [showHeader, setShowHeader] = useState(true);
      const lastScrollY = useRef(window.scrollY);

      useEffect(() => {
        const handleScroll = () => {
          const currentScrollY = window.scrollY;
          if (currentScrollY < 40) {
            setShowHeader(true);
            lastScrollY.current = currentScrollY;
            return;
          }
          if (currentScrollY > lastScrollY.current) {
            setShowHeader(false); // scrolling down
          } else {
            setShowHeader(true); // scrolling up
          }
          lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      const getLocalizedPath = (path) => {
        if (i18n.language === 'es') {
          switch (path) {
            case '/about-us': return '/sobre-nosotros';
            case '/contact': return '/contacto';
            case '/digital-assets': return '/activos-digitales';
            case '/services': return '/servicios';
            case '/get-started': return '/comenzar';
            case '/marketplace': return '/mercado';
            default: return path;
          }
        }
        return path;
      };

      const navItems = useMemo(() => {
        const baseItems = [
          { name: t('header.home'), path: '/' },
          { name: t('header.marketplace'), path: getLocalizedPath('/marketplace') },
          { name: t('header.services'), path: getLocalizedPath('/services') },
          { name: t('header.blockchain'), path: '/blockchain' },
        ];
        if (showPresalePage) {
          baseItems.splice(1, 0, { name: t('header.presale'), path: '/pre-sale' });
        }
        return baseItems;
      }, [t, showPresalePage, i18n.language]);

      const moreMenuItems = [
        { name: t('header.contact'), path: getLocalizedPath('/contact'), icon: <Mail className="mr-2 h-4 w-4" /> },
        { name: t('header.blog'), path: '/blog', icon: <BookOpen className="mr-2 h-4 w-4" /> },
        { name: t('header.faqs'), path: '/faqs', icon: <HelpCircle className="mr-2 h-4 w-4" /> },
      ];

      const handleNavClick = () => {
        setIsMobileMenuOpen(false);
      };

      const renderDesktopNav = () => (
        <>
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              className="relative"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <Link
                to={item.path}
                className={`transition-colors duration-300 font-medium`}
                style={{
                  color:
                    location.pathname === item.path && item.path !== '/pre-sale'
                      ? '#32d3a2'
                      : location.pathname === '/'
                        ? '#FFFFFF'
                        : '#071C38',
                  ...(location.pathname !== item.path && item.path !== '/pre-sale' ? { transition: 'color 0.3s' } : {}),
                }}
                onMouseEnter={e => {
                  if (item.path !== '/pre-sale' && location.pathname !== item.path) {
                    e.target.style.color = location.pathname === '/' ? '#32d3a2' : '#32d3a2';
                  }
                }}
                onMouseLeave={e => {
                  if (item.path !== '/pre-sale' && location.pathname !== item.path) {
                    e.target.style.color = location.pathname === '/' ? '#fff' : '#071c38';
                  }
                }}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                className="relative"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 + 0.5 }}
              >
                <Button variant="ghost" className={`transition-colors duration-300 font-medium hover:text-primary hover:bg-transparent p-0 ${location.pathname === '/' ? 'text-white/80' : ''}`} style={location.pathname !== '/' ? { color: '#071C38' } : {}}>
                  {t('header.more')}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="start">
              {moreMenuItems.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link to={item.path} className="flex items-center w-full">
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );

      const renderMobileNav = () => (
        <>
          {navItems.map((item) => (
            <Link key={item.name} to={item.path} onClick={handleNavClick} className={`text-2xl transition-colors`}
              style={{
                color:
                  location.pathname === item.path
                    ? '#32d3a2'
                    : location.pathname === '/'
                      ? '#fff'
                      : '#071c38',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => {
                if (location.pathname !== item.path) e.target.style.color = location.pathname === '/' ? '#32d3a2' : '#32d3a2';
              }}
              onMouseLeave={e => {
                if (location.pathname !== item.path) e.target.style.color = location.pathname === '/' ? '#fff' : '#071c38';
              }}
            >
              {item.name}
            </Link>
          ))}
          <div className={`text-2xl w-full text-center ${location.pathname === '/' ? 'text-white/80' : ''}`} style={location.pathname !== '/' && location.pathname !== '/pre-sale' ? { color: '#32d3a2' } : {}}>
            <h3 className="mb-4">{t('header.more')}</h3>
            <div className="flex flex-col items-center space-y-4">
              {moreMenuItems.map(item => (
                <Link key={item.name} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-muted-foreground hover:text-foreground flex items-center">
                  {React.cloneElement(item.icon, { className: 'mr-3 h-5 w-5' })}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      );

      return (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: showHeader ? 0 : -120, opacity: showHeader ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md"
          style={{ pointerEvents: showHeader ? 'auto' : 'none' }}
        >
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center h-20">
            <motion.div 
              className="flex items-center space-x-2 h-full"
              whileHover={{ scale: 1.05 }}
            >
              <Link to="/" className="flex items-center space-x-2 h-full">
                {location.pathname === '/' ? (
                  <img
                    src="https://hhoyatmfelywylbpeylz.supabase.co/storage/v1/object/public/general_documents//Logo%20Engyx%20Blanco%20Sin%20Margen%20Pequeno.png"
                    alt="ENGYX Logo"
                    className="h-16 w-auto object-contain"
                  />
                ) : (
                  <img
                    src="https://hhoyatmfelywylbpeylz.supabase.co/storage/v1/object/public/general_documents//Logo%20Engyx%20Azul%20Sin%20Margen%20Pequeno.png"
                    alt="ENGYX Logo"
                    className="h-16 w-auto object-contain"
                  />
                )}
              </Link>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {renderDesktopNav()}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitcher color={location.pathname === '/' ? '#fff' : '#071c38'} />
              <AuthNavButton />
            </div>

            <div className="md:hidden">
              <Button onClick={() => setIsMobileMenuOpen(true)} variant="ghost" size="icon">
                <Menu className="w-6 h-6 text-foreground" />
              </Button>
            </div>
          </nav>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="absolute top-0 right-0 w-full max-w-sm h-full bg-white p-6 border-l border-gray-200 shadow-2xl flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-16">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                       {location.pathname === '/' ? (
                         <img src="https://hhoyatmfelywylbpeylz.supabase.co/storage/v1/object/public/general_documents//Logo%20Engyx%20Blanco%20Sin%20Margen%20Pequeno.png" alt="ENGYX Logo" className="h-16 w-auto object-contain" />
                       ) : (
                         <img src="https://hhoyatmfelywylbpeylz.supabase.co/storage/v1/object/public/general_documents//Logo%20Engyx%20Azul%20Sin%20Margen%20Pequeno.png" alt="ENGYX Logo" className="h-12 w-auto object-contain" />
                       )}
                    </Link>
                    <Button onClick={() => setIsMobileMenuOpen(false)} variant="ghost" size="icon">
                      <X className="w-6 h-6 text-foreground" />
                    </Button>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-8 flex-grow">
                    {renderMobileNav()}
                  </div>

                  <div className="w-full border-t border-gray-200 pt-8 mt-8 flex flex-col items-center space-y-6">
                    <LanguageSwitcher color={location.pathname === '/' ? '#fff' : '#071c38'} />
                    <div className="w-full px-4">
                      <AuthNavButton variant="mobile" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      );
    }

    export default memo(Header);