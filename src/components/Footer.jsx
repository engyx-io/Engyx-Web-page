import React, { memo } from 'react';
import { useWallet } from '@/contexts/WalletContext';
    import { Link } from 'react-router-dom';
    import { Linkedin, Send, Github } from 'lucide-react';
    import { XIcon } from '@/components/icons/XIcon';
    import { useTranslation } from 'react-i18next';

    const Footer = ({ handleFeatureClick }) => {
      const { i18n } = useTranslation();
      const currentLang = i18n.language;

      const { isConnected, authStatus, connectEvm } = useWallet();

      // Handler para el acceso seguro a Monitoring
      const handleMonitoringClick = (e) => {
        e.preventDefault();
        if (!isConnected) {
          connectEvm();
          return;
        }
        if (authStatus !== 'authenticated') {
          window.location.href = currentLang === 'es' ? '/login' : '/login';
          return;
        }
        window.location.href = '/dashboard';
      };

      // Handler para el acceso seguro a Marketplace
      const handleMarketplaceClick = (e) => {
        e.preventDefault();
        if (!isConnected || authStatus !== 'authenticated') {
          if (currentLang === 'es') {
            window.location.href = '/comenzar';
          } else {
            window.location.href = '/get-started';
          }
          return;
        }
        if (currentLang === 'es') {
          window.location.href = '/mercado';
        } else {
          window.location.href = '/marketplace';
        }
      };

      const footerLinks = {
        "Services": [
          { name: "Marketplace", onClick: handleMarketplaceClick },
          { name: "Monitoring", onClick: handleMonitoringClick },
        ],
        "Company": [
          { name: "About Us", path: currentLang === 'es' ? "/sobre-nosotros" : "/about-us" },
          { name: "Press", onClick: handleFeatureClick },
        ],
        "Support": [
          { name: "Help Center", path: currentLang === 'es' ? "/centro-de-ayuda" : "/help-center" },
          { name: "Documentation", onClick: handleFeatureClick },
          { name: "Contact", path: "/contacto" },
          { name: "Admin", path: "/admin" },
        ]
      };

      const socialLinks = [
        { icon: Linkedin, name: "LinkedIn", href: "https://www.linkedin.com/company/engyx-io/" },
        { icon: XIcon, name: "X", href: "https://x.com/engyx_io" },
        { icon: Send, name: "Telegram Community", href: "https://t.me/engyx_community" },
        { icon: Send, name: "Telegram Channel", href: "https://t.me/engyx_announcement" },
        { icon: Github, name: "GitHub", href: "https://github.com/orgs/engyx-io" },
      ];

      return (
        <footer className="py-12 px-6 bg-gray-50 border-t border-gray-200 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-6">
                <Link to="/" className="flex items-center space-x-3">
                  <img  alt="ENGYX Logo" className="w-16 h-16 object-contain" src="https://hhoyatmfelywylbpeylz.supabase.co/storage/v1/object/public/general_documents//Logo%20Engyx%20Azul%20Sin%20Margen.png" />
                </Link>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Engyx Digital Asset – Sustainable Investing Made Real.
                </p>
                
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors" aria-label={`Follow us on ${social.name}`}>
                      <social.icon className="w-5 h-5 text-gray-600" />
                    </a>
                  ))}
                </div>
              </div>
              
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title} className="space-y-4">
                  <span className="text-foreground font-semibold text-sm uppercase tracking-wider block">
                    {title}
                  </span>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        {link.path && !link.onClick ? 
                          <Link to={link.path} className="text-muted-foreground hover:text-foreground transition-all duration-300 text-sm hover:translate-x-1 block">
                            <span className="text-primary/50 mr-2">›</span>
                            {link.name}
                          </Link> : 
                          <button onClick={link.onClick} className="text-muted-foreground hover:text-foreground transition-all duration-300 text-sm hover:translate-x-1 flex items-center text-left">
                            <span className="text-primary/50 mr-2">›</span>
                            {link.name}
                          </button>
                        }
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <p className="text-muted-foreground text-sm">© 2025 Engyx Digital Assets Inc.</p>
                </div>
                
                <div className="flex space-x-6 text-sm">
                  <Link to={currentLang === 'es' ? "/privacidad" : "/privacy"} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                    Privacy
                  </Link>
                  <Link to={currentLang === 'es' ? "/terminos" : "/terms"} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                    Terms
                  </Link>
                  <Link to={currentLang === 'es' ? "/cookies" : "/cookies"} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                    Cookies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      );
    }

    export default memo(Footer);