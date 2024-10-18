export type AdditionalItemProps = {
  name: string;
  price: number;
  image: string;
  selectedQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
};