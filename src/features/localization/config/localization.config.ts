import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { INITIAL_LANG, DEFAULT_NS } from "../constants/localization.constants";
import enTranslation from "./languages/en-EN.json";
import jaTranslation from "./languages/ja-JP.json";

const resources = {
  "en-EN": {
    translation: enTranslation,
  },
  "ja-JP": {
    translation: jaTranslation,
  },
};

i18next.use(initReactI18next).init({
  fallbackLng: INITIAL_LANG,
  lng: INITIAL_LANG,
  interpolation: {
    escapeValue: false,
  },
  defaultNS: DEFAULT_NS,
  resources,
});

export default i18next;
