import "../../../../i18n/config";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaCreditCard, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { BsQrCodeScan } from "react-icons/bs";
import { IoIosCash } from "react-icons/io";
import { formatCurrency } from "../../../../utils/formatCurrency";

import PaymentMethod from "./PaymentMethod/PaymentMethod";
import AmountRow from "./AmountRow/AmountRow";

import { InvoiceType } from "../@types/invoice";

const PAYMENT_METHODS = [
  { name: "payment_method-card", Icon: FaCreditCard },
  { name: "payment_method-cash", Icon: IoIosCash },
  { name: "payment_method-qr", Icon: BsQrCodeScan },
];

type PaymentStatus = "idle" | "processing" | "success" | "completed";

const Receipt = ({ invoice }: { invoice: InvoiceType }) => {
  const [activePaymentMethod, setActivePaymentMethod] = useState(
    PAYMENT_METHODS[0]
  );
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [processingMessage, setProcessingMessage] = useState("");

  const setActive = (index: number) => {
    if (paymentStatus === "idle") {
      setActivePaymentMethod(PAYMENT_METHODS[index]);
    }
  };

  const { t } = useTranslation();

  const getPaymentMessages = (methodName: string) => {
    switch (methodName) {
      case "payment_method-card":
        return {
          processing: t("payment_processing_card"),
          success: t("payment_success_card"),
        };
      case "payment_method-cash":
        return {
          processing: t("payment_processing_cash"),
          success: t("payment_success_cash"),
        };
      case "payment_method-qr":
        return {
          processing: t("payment_processing_qr"),
          success: t("payment_success_qr"),
        };
      default:
        return {
          processing: t("payment_processing_default"),
          success: t("payment_success_default"),
        };
    }
  };

  const handleFinishOrder = () => {
    if (paymentStatus !== "idle") return;

    const messages = getPaymentMessages(activePaymentMethod.name);
    setPaymentStatus("processing");
    setProcessingMessage(messages.processing);

    let countdown = 7;

    const countdownInterval = setInterval(() => {
      countdown--;

      if (countdown <= 0) {
        clearInterval(countdownInterval);
        setPaymentStatus("success");
        setProcessingMessage(messages.success);

        setTimeout(() => {
          setPaymentStatus("completed");

          setTimeout(window.electron.handleOrderFinished, 10000);
        }, 2000);
      }
    }, 1000);
  };

  const renderPaymentButton = () => {
    switch (paymentStatus) {
      case "processing":
        return (
          <button
            className="invoice__receipt__info__pay-button invoice__receipt__info__pay-button--processing"
            disabled
          >
            <FaSpinner className="invoice__receipt__info__pay-button__spinner" />
            <div className="invoice__receipt__info__pay-button__content">
              <span>{processingMessage}</span>
            </div>
          </button>
        );

      case "success":
        return (
          <button
            className="invoice__receipt__info__pay-button invoice__receipt__info__pay-button--success"
            disabled
          >
            <FaCheckCircle className="invoice__receipt__info__pay-button__check" />
            <span>{processingMessage}</span>
          </button>
        );

      case "completed":
        return (
          <button
            className="invoice__receipt__info__pay-button invoice__receipt__info__pay-button--completed"
            disabled
          >
            <FaCheckCircle />
            <span>{t("payment_order_completed")}</span>
          </button>
        );

      default:
        return (
          <button
            className="invoice__receipt__info__pay-button"
            onClick={handleFinishOrder}
          >
            {t("payment_finish-order")}
          </button>
        );
    }
  };

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
            disabled={paymentStatus !== "idle"}
          />
        ))}
      </div>

      <div className="invoice__receipt__info">
        <AmountRow
          title={t("payment_subtotal")}
          amount={invoice?.subtotal}
          hasDivider
        />
        <AmountRow
          title={t("payment_discount")}
          amount={invoice?.discount}
          hasDivider
        />
        <AmountRow title={t("payment_total-tax")} amount={invoice?.totalTax} />

        <div className="invoice__receipt__info__total">
          <span className="invoice__receipt__info__total__title">
            {t("payment_total")} :
          </span>
          <span className="invoice__receipt__info__total__amount">
            {formatCurrency(invoice.total)}
          </span>
        </div>

        {renderPaymentButton()}
      </div>
    </div>
  );
};

export default Receipt;
