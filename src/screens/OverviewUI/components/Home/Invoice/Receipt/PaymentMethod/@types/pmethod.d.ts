export type PaymentMethodProps = {
  name: string;
  Icon: React.ComponentType<any>;
  active?: boolean;
  setMethodActive: () => void;
};
