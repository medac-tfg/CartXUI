export type CategoriesProps = {
  activeCategory: string;
  setActiveCategory: (index: string) => void;
};

export type Categories = {
  name: string;
  productQuantity: number;
  icon: {
    lib: string;
    icon: string;
  };
}[];
