import "../../i18n/config";
import { useTranslation } from "react-i18next";

const ByHandInstructions = () => {
  const { t } = useTranslation();

  return (
    <div className="instruction-container">
      <span className="instruction-text">{t("enter_products_hand")}</span>
    </div>
  );
};

export default ByHandInstructions;
