import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    supportedLngs: ['en', 'es'],
    fallbackLng: 'en',
    defaultNS: 'translation',
    ns: ['translation', 'common', 'roadmap', 'tokenomics', 'blog', 'faqs', 'home'],
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['localStorage', 'cookie'],
      caches: ['localStorage', 'cookie'],
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;