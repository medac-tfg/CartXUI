import "../../i18n/config";
import { useTranslation } from "react-i18next";

const ShoppingBasketInstructions = () => {
  const { t } = useTranslation();

  return (
    <div className="instruction-container">
      <span className="instruction-text">{t("enter_basket")}</span>
    </div>
  );
};

export default ShoppingBasketInstructions;
