export type AdditionalItemProps = {
  titleKey: string;
  price: number;
  image: string;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
};
