import "../../../i18n/config";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { FiCalendar, FiClock, FiSliders } from "react-icons/fi";

const Header = () => {
  const [dateString, setDateString] = useState("");
  const [timeString, setTimeString] = useState("");
  const [amPm, setAmPm] = useState("");
  const { i18n, t } = useTranslation();

  const capitalizeWords = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Use current language for date formatting
      const locale = i18n.language || "en-US"; // Fallback to 'en-US' if language is not set

      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      };
      const formattedDate = now.toLocaleDateString(locale, dateOptions);
      const capitalizedDate = capitalizeWords(formattedDate);

      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const formattedTime = now.toLocaleTimeString("en-US", timeOptions);

      const [time, period] = formattedTime.split(" ");

      setDateString(capitalizedDate);
      setTimeString(time);
      setAmPm(period);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__date">
          <div className="header__icon">
            <FiCalendar className="icon" color="#2c70f7" size={16} />
          </div>
          <span className="header__date__text">{dateString}</span>
        </div>
        <div className="header__hour">
          <div className="header__icon">
            <FiClock color="#2c70f7" size={16} />
          </div>
          <span className="header__hour__text">{timeString}</span>
          <span className="header__am-pm">{amPm}</span>
        </div>
      </div>
      <div className="header__manageorder">
        <span className="header__manageorder__text">{t("manage_order")}</span>
        <div className="header__icon header__icon__blue">
          <FiSliders color="#2c70f7" size={16} />
        </div>
      </div>
    </div>
  );
};

export default Header;
