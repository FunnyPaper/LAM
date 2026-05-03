import { initTranslations } from "@lam/frontend";
import enTranslations from './locales/en/translation';
import plTranslations from './locales/pl/translation';

initTranslations({
  additionalResources: {
    pl: plTranslations,
    en: enTranslations
  }
});