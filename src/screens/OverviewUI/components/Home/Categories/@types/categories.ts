// eslint-disable-next-line
import { CategoryProps } from "../Category/@types/category";

export type CategoriesProps = {
  categories: CategoryProps[];
  productCount: number;
  activeCategory: string;
  setActiveCategory: (index: string) => void;
};