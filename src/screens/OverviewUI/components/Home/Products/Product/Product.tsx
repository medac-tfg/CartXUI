import { ProductProps } from "../@types/product";

const Product = ({ name, category, categoryColor, price }: ProductProps) => {
  return (
    <div className="product">
      <div className="product__image__container">
        <img src="/img/leche-pascual.png" alt="Product" className="product__image" />
      </div>

      <span className="product__name">{name}</span>

      <div className="product__info__container">
        <div
          className="product__info__category"
          style={{ backgroundColor: `${categoryColor}1A` }}
        >
          <span
            className="product__info__category__text"
            style={{ color: categoryColor }}
          >
            {category}
          </span>
        </div>
        <span className="product__info__price">{price}</span>
      </div>
    </div>
  );
};

export default Product;
