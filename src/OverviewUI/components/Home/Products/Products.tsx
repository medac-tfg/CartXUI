import Product from "./Product/Product";
import InlineProduct from "./InlineProduct/InlineProduct";

// eslint-disable-next-line import/no-unresolved
import { ProductScreenProps } from "./@types/products";

const Products = ({ listView }: ProductScreenProps) => {
  return !listView ? (
    <div className="products">
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <Product
            key={index}
            name="Leche Pascual"
            quantity={2}
            category="Lácteos"
            categoryColor="#ff0000"
            price="20,00€"
          />
        ))}
    </div>
  ) : (
    <div className="product-list">
      <span className="product-list__title">Lista de productos</span>
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <InlineProduct
            key={index}
            name="Cartón de Leche"
            brand="Pascual"
            quantity={2}
            price="20,00€"
          />
        ))}
    </div>
  );
};

export default Products;
