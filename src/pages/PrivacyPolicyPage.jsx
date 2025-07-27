import React from 'react';
    import { useTranslation } from 'react-i18next';
    import PrivacyPolicyPageEs from './PrivacyPolicyPageEs';
    import PrivacyPolicyPageEn from './PrivacyPolicyPageEn';

    const PrivacyPolicyPage = () => {
      const { i18n } = useTranslation();

      if (i18n.language === 'es') {
        return <PrivacyPolicyPageEs />;
      }

      return <PrivacyPolicyPageEn />;
    };

    export default PrivacyPolicyPage;