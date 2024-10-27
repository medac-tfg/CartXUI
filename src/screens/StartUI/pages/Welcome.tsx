import { useState } from "react";

import Language from "../components/Welcome/Language/Language";
import ShoppingMethod from "../components/Welcome/ShoppingMethod/ShoppingMethod";

const SHOPPING_METHODS = [
  {
    option: "1",
    title: "Shopping Cart",
    icon: "/img/shopping-cart.png",
    height: "110px",
  },
  {
    option: "2",
    title: "Shopping Basket",
    icon: "/img/shopping-basket.png",
    height: "130px",
  },
  {
    option: "3",
    title: "By Hand",
    icon: "/img/shopping-hand.png",
    height: "110px",
  },
];

const LANGUAGES = [
  {
    title: "Spanish",
    flag: "🇪🇸",
  },
  {
    title: "Catalán",
    flag: (
      <img src="/img/catalan-flag.png" className="welcome__language-flag-img" />
    ),
  },
  {
    title: "English",
    flag: "🇬🇧",
  },
  {
    title: "French",
    flag: "🇫🇷",
  },
  {
    title: "Italian",
    flag: "🇮🇹",
  },
  {
    title: "German",
    flag: "🇩🇪",
  },
];

const Home = () => {
  const [language, setLanguage] = useState("English");
  const handleLanguage = (title: string) => setLanguage(title);

  const handleShoppingMethod = (title: string) => {
    window.electron.handleShoppingMethod(title);
  };

  return (
    <div className="welcome">
      <span className="welcome__select-purchase-method">
        How Did You Decide to Shop Today?
      </span>
      <div className="welcome__shopping-method-container">
        {SHOPPING_METHODS.map((method) => (
          <ShoppingMethod
            key={method.option}
            option={method.option}
            title={method.title}
            icon={method.icon}
            height={method.height}
            handleShoppingMethod={handleShoppingMethod}
          />
        ))}
      </div>

      <span className="welcome__select-language-title">
        Select Your Language
      </span>
      <div className="welcome__select-language">
        {LANGUAGES.map((lang) => (
          <Language
            key={lang.title}
            title={lang.title}
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
