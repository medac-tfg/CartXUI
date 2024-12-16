import { useState, useEffect } from "react";

import AdditionalItems from "./AdditionalItems/AdditionalItems";
import Receipt from "./Receipt/Receipt";

import { InvoiceComponentProps, InvoiceType } from "./@types/invoice";

const Invoice = ({ initialAdditionalProducts }: InvoiceComponentProps) => {
  const [additionalProducts, setAdditionalProducts] = useState(
    initialAdditionalProducts || []
  );
  const [invoice, setInvoice] = useState({
    subtotal: 0,
    discount: 0,
    totalTax: 0,
    total: 0,
  });

  useEffect(() => {
    window.electron.onAdditionalProductChange((data: any) => {
      setAdditionalProducts(data);
    });

    window.electron.onTicketInvoiceChange((data: InvoiceType) => {
      setInvoice({
        total: data.total,
        subtotal: data.subtotal,
        discount: data.discount,
        totalTax: data.totalTax,
      });
    });

  }, []);

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
