export type AdditionalItemProps = {
  titleKey: string;
  price: number;
  image: string;
  selectedQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
};