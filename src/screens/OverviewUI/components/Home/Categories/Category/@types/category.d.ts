export type CategoryProps = {
  name: string;
  Icon?: React.ComponentType<any>;
  icon?: { lib: string; icon: string };
  productQuantity: number;
  active?: boolean;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
};