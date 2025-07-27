import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  es: {
    // Header
    'nav.home': 'Inicio',
    'nav.presale': 'Pre-sale',
    'nav.services': 'Servicios',
    'nav.blockchain': 'Blockchain',
    'nav.contact': 'Contacto',
    'nav.connectWallet': 'Conectar Wallet',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.close': 'Cerrar',
    'common.save': 'Guardar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.back': 'Volver',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    
    // Dashboard
    'dashboard.title': 'Dashboard ENGYX',
    'dashboard.subtitle': 'Sistema de Monitoreo Energético',
    'dashboard.lastUpdate': 'Última actualización',
    'dashboard.systemActive': 'SISTEMA ACTIVO',
    'dashboard.update': 'Actualizar',
    'dashboard.profile': 'Perfil',
    'dashboard.metaDescription': 'Dashboard de ENGYX - Monitorea tus inversiones en energía renovable en tiempo real.',
    
    // Tabs
    'tabs.overview': 'Resumen Global',
    'tabs.plants': 'Plantas Activas',
    'tabs.development': 'En Desarrollo',
    'tabs.forSale': 'Proyectos en Venta',
    'tabs.portfolio': 'Mi Portafolio',
    'tabs.map': 'Mapa Global',
    'tabs.simulator': 'Simulador',
    'tabs.staking': 'Staking',
    'tabs.admin': 'Admin',
    
    // Presale
    'presale.title': 'Pre-sale $ENGYX',
    'presale.subtitle': 'Únete a la revolución energética. Obtén tokens $ENGYX con 50% de descuento antes del lanzamiento público.',
    'presale.endsIn': 'Pre-sale termina en:',
    'presale.connectWallet': 'Conectar Wallet',
    'presale.buyTokens': 'Comprar $ENGYX',
    'presale.payWith': 'Pagar con:',
    'presale.amount': 'Cantidad',
    'presale.youWillReceive': 'Recibirás:',
    'presale.currentPrice': 'Precio actual:',
    'presale.processing': 'Procesando...',
    
    // Contact
    'contact.title': 'Contacto',
    'contact.subtitle': '¿Listo para revolucionar el futuro energético? Conectemos y construyamos juntos un ecosistema sostenible.',
    'contact.sendMessage': 'Envíanos un mensaje',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.company': 'Empresa',
    'contact.subject': 'Asunto',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.info': 'Información de Contacto',
    'contact.phone': 'Teléfono',
    'contact.office': 'Oficina',
    'contact.joinTelegram': 'Unirse a Telegram',
    
    // Notifications
    'notification.featureNotImplemented': '🚧 Esta funcionalidad aún no está implementada—¡pero no te preocupes! Puedes solicitarla en tu próximo mensaje! 🚀',
    'notification.walletConnected': '🎉 ¡Wallet conectada exitosamente!',
    'notification.walletDisconnected': '👋 Wallet desconectada',
    'notification.purchaseSuccess': '🎉 ¡Compra exitosa!',
    'notification.investmentSuccess': '🎉 ¡Inversión exitosa!',
    'notification.walletNotConnected': '⚠️ Wallet no conectada',
    'notification.addressCopied': '📋 Dirección copiada',
    'notification.dataUpdated': '✅ Datos actualizados exitosamente',
    'notification.dataUpdatedDesc': 'Los datos del dashboard han sido actualizados con la información más reciente.',
    'notification.stakingSuccess': '🎉 ¡Staking exitoso!',
    'notification.stakingSuccessDesc': 'Has bloqueado {amount} $ENGYX por {period} días exitosamente.',
    'notification.unstakingSuccess': '🎉 ¡Unstaking exitoso!',
    'notification.unstakingSuccessDesc': 'Tus tokens han sido desbloqueados y las recompensas transferidas.',
    
    // Simulator
    'simulator.title': 'Simulación de Inversión',
    'simulator.configureInvestment': 'Configurar Inversión',
    'simulator.investmentAmount': 'Monto de Inversión (USD)',
    'simulator.period': 'Período (meses)',
    'simulator.period12': '12 meses',
    'simulator.period24': '24 meses',
    'simulator.period36': '36 meses',
    'simulator.selectProject': 'Seleccionar Proyecto',
    'simulator.projectedReturns': 'Proyección de Retornos',
    'simulator.projectedGain': 'Ganancia Proyectada',
    'simulator.initialInvestment': 'Inversión Inicial',
    'simulator.estimatedROI': 'ROI Estimado',
    'simulator.finalTotal': 'Total Final',
    'simulator.startInvestment': 'Comenzar Inversión',
    'simulator.projectSoldOut': '❌ Proyecto Vendido Completamente',
    'simulator.projectSoldOutDesc': 'Este proyecto ha agotado todos sus tokens disponibles. Por favor, selecciona otro proyecto.',
    'simulator.noProjectsAvailable': 'No hay proyectos disponibles',
    'simulator.noProjectsDesc': 'Todos los proyectos están vendidos. Nuevos proyectos estarán disponibles pronto.',
    'simulator.noProjectSelected': 'Proyecto no encontrado',
    'simulator.inMonths': 'en {months} meses',
    'simulator.annual': 'anual',
    'simulator.project': 'Proyecto',
    'simulator.environmentalImpact': 'Impacto Ambiental Estimado',
    'simulator.co2Avoided': 'CO₂ Evitado',
    'simulator.treesEquivalent': 'Árboles Equivalentes',
    
    // Staking
    'staking.title': 'Simulador de Staking',
    'staking.availablePools': 'Pools Disponibles',
    'staking.myStakes': 'Mis Stakes',
    'staking.newStake': 'Nuevo Stake',
    'staking.amount': 'Cantidad',
    'staking.selectedPool': 'Pool Seleccionado',
    'staking.projectedRewards': 'Recompensas Proyectadas',
    'staking.stakingAmount': 'Cantidad a Stakear',
    'staking.lockPeriod': 'Período de Bloqueo',
    'staking.estimatedRewards': 'Recompensas Estimadas',
    'staking.stakeNow': 'Stakear Ahora',
    'staking.processing': 'Procesando...',
    'staking.minStakeRequired': 'Mínimo requerido: ${amount}',
    'staking.benefits': 'Beneficios del Staking',
    'staking.benefit1': 'Gana recompensas pasivas',
    'staking.benefit2': 'Participa en la gobernanza',
    'staking.benefit3': 'Acceso a pools exclusivos',
    'staking.benefit4': 'Bloqueo flexible de tokens',
    'staking.pool30Days': 'Pool 30 Días',
    'staking.pool90Days': 'Pool 90 Días',
    'staking.pool180Days': 'Pool 180 Días',
    'staking.pool365Days': 'Pool 365 Días',
    'staking.minStake': 'Stake Mínimo',
    'staking.totalStaked': 'Total Stakeado',
    'staking.participants': 'Participantes',
    'staking.active': 'Activo',
    'staking.completed': 'Completado',
    'staking.staked': 'Stakeado',
    'staking.rewards': 'Recompensas',
    'staking.unstake': 'Unstake',
    'staking.noStakes': 'No tienes stakes activos',
    'staking.days': 'días',
    
    // Language
    'language.spanish': 'Español',
    'language.english': 'English'
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.presale': 'Pre-sale',
    'nav.services': 'Services',
    'nav.blockchain': 'Blockchain',
    'nav.contact': 'Contact',
    'nav.connectWallet': 'Connect Wallet',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    
    // Dashboard
    'dashboard.title': 'ENGYX Dashboard',
    'dashboard.subtitle': 'Energy Monitoring System',
    'dashboard.lastUpdate': 'Last update',
    'dashboard.systemActive': 'SYSTEM ACTIVE',
    'dashboard.update': 'Update',
    'dashboard.profile': 'Profile',
    'dashboard.metaDescription': 'ENGYX Dashboard - Monitor your renewable energy investments in real time.',
    
    // Tabs
    'tabs.overview': 'Global Overview',
    'tabs.plants': 'Active Plants',
    'tabs.development': 'In Development',
    'tabs.forSale': 'Projects for Sale',
    'tabs.portfolio': 'My Portfolio',
    'tabs.map': 'Global Map',
    'tabs.simulator': 'Simulator',
    'tabs.staking': 'Staking',
    'tabs.admin': 'Admin',
    
    // Presale
    'presale.title': '$ENGYX Pre-sale',
    'presale.subtitle': 'Join the energy revolution. Get $ENGYX tokens with a 50% discount before the public launch.',
    'presale.endsIn': 'Pre-sale ends in:',
    'presale.connectWallet': 'Connect Wallet',
    'presale.buyTokens': 'Buy $ENGYX',
    'presale.payWith': 'Pay with:',
    'presale.amount': 'Amount',
    'presale.youWillReceive': 'You will receive:',
    'presale.currentPrice': 'Current price:',
    'presale.processing': 'Processing...',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Ready to revolutionize the energy future? Let\'s connect and build a sustainable ecosystem together.',
    'contact.sendMessage': 'Send us a message',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.company': 'Company',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.info': 'Contact Information',
    'contact.phone': 'Phone',
    'contact.office': 'Office',
    'contact.joinTelegram': 'Join Telegram',
    
    // Notifications
    'notification.featureNotImplemented': '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀',
    'notification.walletConnected': '🎉 Wallet connected successfully!',
    'notification.walletDisconnected': '👋 Wallet disconnected',
    'notification.purchaseSuccess': '🎉 Purchase successful!',
    'notification.investmentSuccess': '🎉 Investment successful!',
    'notification.walletNotConnected': '⚠️ Wallet not connected',
    'notification.addressCopied': '📋 Address copied',
    'notification.dataUpdated': '✅ Data updated successfully',
    'notification.dataUpdatedDesc': 'Dashboard data has been updated with the latest information.',
    'notification.stakingSuccess': '🎉 Staking successful!',
    'notification.stakingSuccessDesc': 'You have successfully staked {amount} $ENGYX for {period} days.',
    'notification.unstakingSuccess': '🎉 Unstaking successful!',
    'notification.unstakingSuccessDesc': 'Your tokens have been unlocked and rewards transferred.',
    
    // Simulator
    'simulator.title': 'Investment Simulation',
    'simulator.configureInvestment': 'Configure Investment',
    'simulator.investmentAmount': 'Investment Amount (USD)',
    'simulator.period': 'Period (months)',
    'simulator.period12': '12 months',
    'simulator.period24': '24 months',
    'simulator.period36': '36 months',
    'simulator.selectProject': 'Select Project',
    'simulator.projectedReturns': 'Projected Returns',
    'simulator.projectedGain': 'Projected Gain',
    'simulator.initialInvestment': 'Initial Investment',
    'simulator.estimatedROI': 'Estimated ROI',
    'simulator.finalTotal': 'Final Total',
    'simulator.startInvestment': 'Start Investment',
    'simulator.projectSoldOut': '❌ Project Completely Sold Out',
    'simulator.projectSoldOutDesc': 'This project has sold out all available tokens. Please select another project.',
    'simulator.noProjectsAvailable': 'No Projects Available',
    'simulator.noProjectsDesc': 'All projects are sold out. New projects will be available soon.',
    'simulator.noProjectSelected': 'Project not found',
    'simulator.inMonths': 'in {months} months',
    'simulator.annual': 'annual',
    'simulator.project': 'Project',
    'simulator.environmentalImpact': 'Estimated Environmental Impact',
    'simulator.co2Avoided': 'CO₂ Avoided',
    'simulator.treesEquivalent': 'Trees Equivalent',
    
    // Staking
    'staking.title': 'Staking Simulator',
    'staking.availablePools': 'Available Pools',
    'staking.myStakes': 'My Stakes',
    'staking.newStake': 'New Stake',
    'staking.amount': 'Amount',
    'staking.selectedPool': 'Selected Pool',
    'staking.projectedRewards': 'Projected Rewards',
    'staking.stakingAmount': 'Staking Amount',
    'staking.lockPeriod': 'Lock Period',
    'staking.estimatedRewards': 'Estimated Rewards',
    'staking.stakeNow': 'Stake Now',
    'staking.processing': 'Processing...',
    'staking.minStakeRequired': 'Minimum required: ${amount}',
    'staking.benefits': 'Staking Benefits',
    'staking.benefit1': 'Earn passive rewards',
    'staking.benefit2': 'Participate in governance',
    'staking.benefit3': 'Access to exclusive pools',
    'staking.benefit4': 'Flexible token locking',
    'staking.pool30Days': '30 Days Pool',
    'staking.pool90Days': '90 Days Pool',
    'staking.pool180Days': '180 Days Pool',
    'staking.pool365Days': '365 Days Pool',
    'staking.minStake': 'Min Stake',
    'staking.totalStaked': 'Total Staked',
    'staking.participants': 'Participants',
    'staking.active': 'Active',
    'staking.completed': 'Completed',
    'staking.staked': 'Staked',
    'staking.rewards': 'Rewards',
    'staking.unstake': 'Unstake',
    'staking.noStakes': 'You have no active stakes',
    'staking.days': 'days',
    
    // Language
    'language.spanish': 'Español',
    'language.english': 'English'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('engyx-language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('engyx-language', newLanguage);
    }
  };

  const t = (key, params = {}) => {
    let translation = translations[language][key] || key;
    
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};