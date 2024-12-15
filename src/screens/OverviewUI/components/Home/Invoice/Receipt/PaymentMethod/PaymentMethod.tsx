import { PaymentMethodProps } from "./@types/pmethod";

const PaymentMethod = ({
  name,
  Icon,
  active,
  setMethodActive,
}: PaymentMethodProps) => {
  const containerClass = active
    ? "invoice__receipt__payment-method invoice__receipt__payment-method-active"
    : "invoice__receipt__payment-method";
  const methodNameClass = active
    ? "invoice__receipt__payment-method__name invoice__receipt__payment-method__name-active"
    : "invoice__receipt__payment-method__name";

  return (
    <div className={containerClass} onClick={setMethodActive}>
      <Icon color={active ? "#fff" : "#8392a7"} size={24} />
      <span className={methodNameClass}>{name}</span>
    </div>
  );
};

export default PaymentMethod;
