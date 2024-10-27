import AdditionalItems from "./AdditionalItems/AdditionalItems";
import Receipt from "./Receipt/Receipt";

const Invoice = () => {
  return (
    <div className="invoice">
      <div className="invoice__main">
        <AdditionalItems />
        <Receipt />
      </div>
    </div>
  );
};

export default Invoice;
