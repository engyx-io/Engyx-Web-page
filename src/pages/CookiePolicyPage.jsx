import React from 'react';
    import { useTranslation } from 'react-i18next';
    import CookiePolicyPageEs from './CookiePolicyPageEs';
    import CookiePolicyPageEn from './CookiePolicyPageEn';

    const CookiePolicyPage = () => {
      const { i18n } = useTranslation();

      if (i18n.language === 'es') {
        return <CookiePolicyPageEs />;
      }

      return <CookiePolicyPageEn />;
    };

    export default CookiePolicyPage;