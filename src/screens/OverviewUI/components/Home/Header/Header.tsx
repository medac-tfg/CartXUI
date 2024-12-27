import "../../../i18n/config";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { FiCalendar, FiClock, FiSliders } from "react-icons/fi";

const Header = () => {
  const [dateString, setDateString] = useState("");
  const [timeString, setTimeString] = useState("");
  const [amPm, setAmPm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState("");
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
      const locale = i18n.language || "en-US";

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

  const handleManageOrderClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPin("");
  };

  const handlePinSubmit = () => {
    if (pin === "1234") {
      window.sendToast({ type: "error", message: t("access_granted") });
      setIsModalOpen(false);
    } else {
      window.sendToast({ type: "error", message: t("invalid_pin") });
    }
  };

  const handleKeyboardInput = (input: string) => {
    setPin(input.slice(0, 4));
  };

  return (
    <>
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
        <div className="header__manageorder" onClick={handleManageOrderClick}>
          <span className="header__manageorder__text">{t("manage_order")}</span>
          <div className="header__icon header__icon__blue">
            <FiSliders color="#2c70f7" size={16} />
          </div>
        </div>

        {isModalOpen && (
          <div className="header__modal">
            <div className="header__modal__content">
              <h3 className="header__modal__title">{t("enter_pin")}</h3>
              <input
                type="password"
                value={pin}
                readOnly
                placeholder={t("pin_placeholder")}
              />
              <div className="header__modal__actions">
                <button onClick={handlePinSubmit}>{t("submit")}</button>
                <button onClick={handleModalClose}>{t("cancel")}</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="keyboard-container">
          <Keyboard
            onChange={handleKeyboardInput}
            layout={{
              default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp}"],
            }}
            display={{
              "{bksp}": "⌫",
            }}
            maxLength={4}
          />
        </div>
      )}
    </>
  );
};

export default Header;
