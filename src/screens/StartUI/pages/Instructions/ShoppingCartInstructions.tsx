import "../../i18n/config";
import { useTranslation } from "react-i18next";

const ShoppingCartInstructions = () => {
  const { t } = useTranslation();

  return (
    <div className="instruction-container">
      <span className="instruction-text">{t("enter_cart")}</span>
    </div>
  );
};

export default ShoppingCartInstructions;
