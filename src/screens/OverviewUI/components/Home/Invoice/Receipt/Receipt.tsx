import "../../../../i18n/config";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCreditCard } from "react-icons/fa";
import { BsQrCodeScan } from "react-icons/bs";
import { IoIosCash } from "react-icons/io";

import PaymentMethod from "./PaymentMethod/PaymentMethod";
import AmountRow from "./AmountRow/AmountRow";

const PAYMENT_METHODS = [
  { name: "payment_method-card", Icon: FaCreditCard },
  { name: "payment_method-cash", Icon: IoIosCash },
  { name: "payment_method-qr", Icon: BsQrCodeScan },
];

const Receipt = () => {
  const [activePaymentMethod, setActivePaymentMethod] = useState(
    PAYMENT_METHODS[0]
  );
  const setActive = (index: number) =>
    setActivePaymentMethod(PAYMENT_METHODS[index]);

  const { t } = useTranslation();

  return (
    <div className="invoice__receipt">
      <span className="invoice__receipt__title">{t("payment_receipt")}</span>

      <div className="invoice__receipt__payment-methods">
        {PAYMENT_METHODS.map((method, index) => (
          <PaymentMethod
            key={index}
            name={t(method.name)}
            Icon={method.Icon}
            active={activePaymentMethod.name === method.name}
            setMethodActive={() => setActive(index)}
          />
        ))}
      </div>

      <div className="invoice__receipt__info">
        <AmountRow title={t("payment_subtotal")} amount={100} hasDivider />
        <AmountRow title={t("payment_discount")} amount={5} hasDivider />
        <AmountRow title={t("payment_total-tax")} amount={10} />

        <div className="invoice__receipt__info__total">
          <span className="invoice__receipt__info__total__title">
            {t("payment_total")} :
          </span>
          <span className="invoice__receipt__info__total__amount">115.00€</span>
        </div>

        <button className="invoice__receipt__info__pay-button">
          {t("payment_finish-order")}
        </button>
      </div>
    </div>
  );
};

export default Receipt;
