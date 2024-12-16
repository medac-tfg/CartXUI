import AdditionalItems from "./AdditionalItems/AdditionalItems";
import Receipt from "./Receipt/Receipt";

import { InvoiceComponentProps } from "./@types/invoice";

const Invoice = ({ additionalProducts, invoice }: InvoiceComponentProps) => {
  return (
    <div className="invoice">
      <div className="invoice__main">
        <AdditionalItems itemList={additionalProducts} />
        <Receipt invoice={invoice} />
      </div>
    </div>
  );
};

export default Invoice;
