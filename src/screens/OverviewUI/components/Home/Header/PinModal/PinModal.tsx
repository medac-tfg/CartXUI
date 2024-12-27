import "../../../../i18n/config";
import { useTranslation } from "react-i18next";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useState } from "react";

const PinModal = ({ setIsModalOpen }: { setIsModalOpen: Function }) => {
  const [pin, setPin] = useState("");
  const { t } = useTranslation();

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPin("");
  };

  const handlePinSubmit = () => {
    if (pin === "1234") {
      window.sendToast({ type: "success", message: t("access_granted") });
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
    </>
  );
};

export default PinModal;
