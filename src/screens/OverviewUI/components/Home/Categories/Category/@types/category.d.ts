export type CategoryProps = {
  name: string;
  Icon: React.ComponentType<any>;
  productQuantity: number;
  active?: boolean;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
};