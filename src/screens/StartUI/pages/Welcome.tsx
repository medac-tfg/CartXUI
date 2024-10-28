import "../i18n/config";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import Language from "../components/Welcome/Language/Language";
import ShoppingMethod from "../components/Welcome/ShoppingMethod/ShoppingMethod";

const SHOPPING_METHODS = [
  {
    option: "1",
    titleKey: "option_shopping-cart",
    icon: "/img/shopping-cart.png",
    height: "110px",
  },
  {
    option: "2",
    titleKey: "option_shopping-basket",
    icon: "/img/shopping-basket.png",
    height: "130px",
  },
  {
    option: "3",
    titleKey: "option_by-hand",
    icon: "/img/shopping-hand.png",
    height: "110px",
  },
];

const LANGUAGES = [
  {
    title: "Spanish",
    flag: "🇪🇸",
    code: "es",
  },
  {
    title: "Catalán",
    flag: (
      <img src="/img/catalan-flag.png" className="welcome__language-flag-img" />
    ),
    code: "ca",
  },
  {
    title: "English",
    flag: "🇬🇧",
    code: "en",
  },
  {
    title: "French",
    flag: "🇫🇷",
    code: "fr",
  },
  {
    title: "Italian",
    flag: "🇮🇹",
    code: "it",
  },
  {
    title: "German",
    flag: "🇩🇪",
    code: "de",
  },
];

const Home = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("English");

  const handleShoppingMethod = (title: string) => {
    window.electron.handleShoppingMethod(title);
  };

  const handleLanguage = (title: string, code: string) => {
    setLanguage(title);
    i18n.changeLanguage(code);
  };

  return (
    <div className="welcome">
      <span className="welcome__select-purchase-method">
        {t("how_decide_shop")}
      </span>
      <div className="welcome__shopping-method-container">
        {SHOPPING_METHODS.map((method) => (
          <ShoppingMethod
            key={method.option}
            option={method.option}
            titleKey={method.titleKey}
            icon={method.icon}
            height={method.height}
            handleShoppingMethod={handleShoppingMethod}
          />
        ))}
      </div>

      <span className="welcome__select-language-title">
        {t("select_language")}
      </span>
      <div className="welcome__select-language">
        {LANGUAGES.map((lang) => (
          <Language
            key={lang.title}
            title={lang.title}
            code={lang.code}
            flag={lang.flag}
            active={language === lang.title}
            handleLanguage={handleLanguage}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
