// eslint-disable-next-line import/no-unresolved
import { AmountRowProps } from "./@types/arow";

const AmountRow = ({ title, amount, hasDivider }: AmountRowProps) => {
  return (
    <div
      className="invoice__receipt__info__amount-row"
      style={{ borderBottom: hasDivider ? "1.4px solid #e0e0e0" : "none" }}
    >
      <span className="invoice__receipt__info__amount-row__title">
        {title} :
      </span>
      <span className="invoice__receipt__info__amount-row__amount">
        {title !== "Discount"
          ? `${amount.toFixed(2)}€`
          : `-${amount.toFixed(2)}€`}
      </span>
    </div>
  );
};

export default AmountRow;
