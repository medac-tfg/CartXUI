import "../i18n/config";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Language from "../components/Welcome/Language/Language";
import ShoppingMethod from "../components/Welcome/ShoppingMethod/ShoppingMethod";
import { useNavigate } from "react-router-dom";

const SHOPPING_METHODS = [
  {
    option: "1",
    titleKey: "option_shopping-cart",
    icon: "/img/shopping-cart.png",
    height: "140px",
  },
  {
    option: "2",
    titleKey: "option_shopping-basket",
    icon: "/img/shopping-basket.png",
    height: "170px",
  },
  {
    option: "3",
    titleKey: "option_by-hand",
    icon: "/img/shopping-hand.png",
    height: "140px",
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
    title: "Français",
    flag: "🇫🇷",
    code: "fr",
  },
  {
    title: "Italiano",
    flag: "🇮🇹",
    code: "it",
  },
  {
    title: "Deutsch",
    flag: "🇩🇪",
    code: "de",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [canSelectMethod, setCanSelectMethod] = useState(true);
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    window.electron.onOrderStarted(
      (data: { targetRoute: string; ticketId: string }) => {
        const { targetRoute, ticketId } = data;
        alert(
          `Order started. Target route: ${targetRoute}. Ticket ID: ${ticketId}`
        );
        navigate(targetRoute);
      }
    );
  }, []);

  const handleShoppingMethod = (title: string) => {
    if (!canSelectMethod) return;

    setCanSelectMethod(false);
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
