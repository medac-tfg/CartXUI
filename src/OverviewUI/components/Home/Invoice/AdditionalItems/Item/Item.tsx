// eslint-disable-next-line import/no-unresolved
import { AdditionalItemProps } from "./@types/item";

const Item = ({
  name,
  price,
  image,
  selectedQuantity,
  onQuantityChange,
}: AdditionalItemProps) => {
  const changeQuantity = (number: number) =>
    onQuantityChange(selectedQuantity + number);

  return (
    <div className="invoice__additional-items__item">
      <img
        src={image}
        alt={name}
        className="invoice__additional-items__item__img"
      />
      <div className="invoice__additional-items__item__info">
        <span className="invoice__additional-items__item__info__title">
          {name}
        </span>
        <div className="invoice__additional-items__item__info__price-quantity">
          <span className="invoice__additional-items__item__info__price">
            {price.toFixed(2)}€
          </span>
          <div className="invoice__additional-items__item__info__quantity">
            <button
              type="button"
              className="invoice__additional-items__item__info__quantity__button"
              onClick={() => changeQuantity(-1)}
            >
              -
            </button>
            <span className="invoice__additional-items__item__info__quantity__number">
              {selectedQuantity}
            </span>
            <button
              type="button"
              className="invoice__additional-items__item__info__quantity__button"
              onClick={() => changeQuantity(1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
