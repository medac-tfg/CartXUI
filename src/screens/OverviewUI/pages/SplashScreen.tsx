import "../i18n/config";
import { useTranslation } from "react-i18next";

const SplashScreen = () => {
  const { t } = useTranslation();

  return (
    <div className="splash-screen-container">
      <span className="branding-text">{t("welcome")}</span>
      <span className="branding-text">{t("touch_first_screen")}</span>
    </div>
  );
};

export default SplashScreen;
