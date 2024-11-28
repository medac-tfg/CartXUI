import "../i18n/config";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Instructions = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { shoppingMethodInstructions } = location.state || {};

  return (
    <div className="instruction-container">
      <span className="instruction-text">{t(shoppingMethodInstructions)}</span>
    </div>
  );
};

export default Instructions;
