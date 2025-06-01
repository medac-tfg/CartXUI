import { PaymentMethodProps } from "./@types/pmethod";

interface ExtendedPaymentMethodProps extends PaymentMethodProps {
  disabled?: boolean;
}

const PaymentMethod = ({
  name,
  Icon,
  active,
  setMethodActive,
  disabled = false,
}: ExtendedPaymentMethodProps) => {
  const containerClass = active
    ? "invoice__receipt__payment-method invoice__receipt__payment-method-active"
    : "invoice__receipt__payment-method";

  const finalContainerClass = disabled
    ? `${containerClass} invoice__receipt__payment-method--disabled`
    : containerClass;

  const methodNameClass = active
    ? "invoice__receipt__payment-method__name invoice__receipt__payment-method__name-active"
    : "invoice__receipt__payment-method__name";

  const handleClick = () => {
    if (!disabled) {
      setMethodActive();
    }
  };

  return (
    <div className={finalContainerClass} onClick={handleClick}>
      <Icon color={active ? "#fff" : "#8392a7"} size={24} />
      <span className={methodNameClass}>{name}</span>
    </div>
  );
};

export default PaymentMethod;
