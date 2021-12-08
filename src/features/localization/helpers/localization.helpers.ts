import i18next from "../config/localization.config";

export const changeLanguage = (language: string) => {
  i18next.changeLanguage(language);
};

export const getCurrentLanguage = () => {
  return i18next.language;
};
