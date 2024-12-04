import "../../../i18n/config";
import { useTranslation } from "react-i18next";

import Product from "./Product/Product";
import InlineProduct from "./InlineProduct/InlineProduct";

// eslint-disable-next-line import/no-unresolved
import { ProductScreenProps } from "./@types/products";

const Products = ({
  listView,
  products,
  activeCategory,
}: ProductScreenProps) => {
  const { t } = useTranslation();

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return !listView ? (
    <div className="products">
      {filteredProducts.map((product, index) => (
        <Product
          key={index}
          name={product.name}
          quantity={product.quantity}
          category={product.category}
          categoryColor={product.categoryColor}
          price={product.price}
        />
      ))}
    </div>
  ) : (
    <div className="product-list">
      <span className="product-list__title">{t("product_list")}</span>
      {filteredProducts.map((product, index) => (
        <InlineProduct
          key={index}
          name={product.name}
          brand={product.brand}
          quantity={product.quantity}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default Products;
