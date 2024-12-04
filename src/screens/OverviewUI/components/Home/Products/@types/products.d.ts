// eslint-disable-next-line
import { ProductProps } from "./product";

export type ProductScreenProps = {
  listView: boolean;
  products: ProductProps[];
  activeCategory: string;
};