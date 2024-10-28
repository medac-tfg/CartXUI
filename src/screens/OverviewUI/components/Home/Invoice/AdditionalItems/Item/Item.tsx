import "../../../../../i18n/config";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line import/no-unresolved
import { AdditionalItemProps } from "./@types/item";

const Item = ({
  titleKey,
  price,
  image,
  selectedQuantity,
  onQuantityChange,
}: AdditionalItemProps) => {
  const { t } = useTranslation();

  const changeQuantity = (number: number) =>
    onQuantityChange(selectedQuantity + number);

  return (
    <div className="invoice__additional-items__item">
      <img
        src={image}
        alt={t(titleKey)}
        className="invoice__additional-items__item__img"
      />
      <div className="invoice__additional-items__item__info">
        <span className="invoice__additional-items__item__info__title">
          {t(titleKey)}
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
