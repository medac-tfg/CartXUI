import { ProductProps } from "../@types/product";

const Product = ({
  name,
  image,
  quantity,
  category,
  categoryColor,
  priceWithTax,
}: ProductProps) => {
  const price = quantity > 1 ? `${priceWithTax * quantity}` : priceWithTax;

  return (
    <div className="product">
      <div className="product__image__container">
        <img src={image} alt="Product" className="product__image" />
      </div>

      <div className="product__name__quantity__container">
        <span className="product__name">{name}</span>
        <span className="product__quantity">&nbsp;-&nbsp;(x{quantity})</span>
      </div>

      <div className="product__info__container">
        <div
          className="product__info__category"
          style={{ backgroundColor: categoryColor }}
        >
          <span
            className="product__info__category__text"
            style={{ color: categoryColor }}
          >
            {category}
          </span>
        </div>
        <span className="product__info__price">{price}€</span>
      </div>
    </div>
  );
};

export default Product;
