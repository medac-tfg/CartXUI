export type InvoiceType = {
  subtotal: number;
  discount: number;
  totalTax: number;
  total: number;
};

export type InvoiceComponentProps = {
  initialAdditionalProducts: Array<any>;
};
