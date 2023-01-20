import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import ja from "./translations/ja.json";

export const resources = {
  en: {
    translation: en,
  },
  ja: {
    translation: ja,
  },
} as const;

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export const useI18next = () => i18next;
