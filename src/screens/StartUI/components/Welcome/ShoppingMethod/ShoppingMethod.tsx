import "../../../i18n/config";
import { useTranslation } from "react-i18next";

import { ShoppingMethodProps } from "./@types/shoppingmethod";

const ShoppingMethod = ({
  option,
  titleKey,
  icon,
  height,
  handleShoppingMethod,
}: ShoppingMethodProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="welcome__shopping-method"
      onClick={() => handleShoppingMethod(titleKey)}
    >
      <div className="welcome__shopping-method-info">
        <span className="welcome__shopping-method-option">
          {t("option")} {option}
        </span>
        <span className="welcome__shopping-method-title">{t(titleKey)}</span>
      </div>
      <div className="welcome__shopping-method-icon-container">
        <img
          className="welcome__shopping-method-icon"
          src={icon}
          alt={t(titleKey)}
          style={{ height }}
        />
      </div>
    </div>
  );
};

export default ShoppingMethod;
