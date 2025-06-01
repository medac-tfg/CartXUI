import { Products } from "../../../Products/@types/products";

export type ProductModalProps = {
  products: Products;
  setShowProductList: React.Dispatch<React.SetStateAction<boolean>>;
};
