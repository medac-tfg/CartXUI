import { use } from "i18next";
import { initReactI18next } from "react-i18next";

// Translations
import esTranslation from "./es/translation.json";
import caTranslation from "./ca/translation.json";
import enTranslation from "./en/translation.json";
import frTranslation from "./fr/translation.json";
import itTranslation from "./it/translation.json";
import deTranslation from "./de/translation.json";

use(initReactI18next).init({
  lng: "es",
  debug: true,
  resources: {
    es: {
      translation: esTranslation,
    },
    ca: {
      translation: caTranslation,
    },
    en: {
      translation: enTranslation,
    },
    fr: {
      translation: frTranslation,
    },
    it: {
      translation: itTranslation,
    },
    de: {
      translation: deTranslation,
    },
  },
});
