import React from 'react';
    import { useTranslation } from 'react-i18next';
    import TermsPageEs from './TermsPageEs';
    import TermsPageEn from './TermsPageEn';

    const TermsPage = () => {
      const { i18n } = useTranslation();

      if (i18n.language === 'es') {
        return <TermsPageEs />;
      }

      return <TermsPageEn />;
    };

    export default TermsPage;