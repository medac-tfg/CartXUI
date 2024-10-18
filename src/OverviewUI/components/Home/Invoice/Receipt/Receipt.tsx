import { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { BsQrCodeScan } from "react-icons/bs";
import { IoIosCash } from "react-icons/io";

import PaymentMethod from "./PaymentMethod/PaymentMethod";
import AmountRow from "./AmountRow/AmountRow";

const Receipt = () => {
  const [activePaymentMethod, setActivePaymentMethod] = useState("Card");
  const setActive = (name: string) => setActivePaymentMethod(name);

  return (
    <div className="invoice__receipt">
      <span className="invoice__receipt__title">Receipt</span>

      <div className="invoice__receipt__payment-methods">
        <PaymentMethod name="Card" Icon={FaCreditCard} active={activePaymentMethod === "Card"} setMethodActive={() => setActive("Card")} />
        <PaymentMethod name="Cash" Icon={IoIosCash} active={activePaymentMethod === "Cash"} setMethodActive={() => setActive("Cash")} />
        <PaymentMethod name="QR" Icon={BsQrCodeScan} active={activePaymentMethod === "QR"} setMethodActive={() => setActive("QR")} />
      </div>

      <div className="invoice__receipt__info">
        <AmountRow title="Subtotal" amount={100} hasDivider />
        <AmountRow title="Discount" amount={5} hasDivider />
        <AmountRow title="Total tax" amount={10} />

        <div className="invoice__receipt__info__total" >
          <span className="invoice__receipt__info__total__title">Total :</span>
          <span className="invoice__receipt__info__total__amount">115.00€</span>
        </div>

        <button className="invoice__receipt__info__pay-button">Finish Order</button>
      </div>
    </div>
  )
};

export default Receipt;
