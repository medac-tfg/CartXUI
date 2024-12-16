import "../../../i18n/config";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Product from "./Product/Product";
import InlineProduct from "./InlineProduct/InlineProduct";

import { Products, ProductScreenProps } from "./@types/products";

const Products = ({ listView, activeCategory }: ProductScreenProps) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Products>([]);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  useEffect(() => {
    window.electron.onSetProducts((products: Products) => {
      setProducts(products);
    });
  }, []);

  return !listView ? (
    <div className="products">
      {filteredProducts.map((product, index) => (
        <Product
          key={index}
          name={product.name}
          image={product.image}
          quantity={product.quantity}
          category={product.category}
          categoryColor={product.categoryColor}
          priceWithTax={product.priceWithTax}
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
          image={product.image}
          brand={product.brand}
          quantity={product.quantity}
          priceWithTax={product.priceWithTax}
        />
      ))}
    </div>
  );
};

export default Products;
