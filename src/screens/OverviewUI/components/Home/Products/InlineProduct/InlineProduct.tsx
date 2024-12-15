import "../../../../i18n/config";
import { useTranslation } from "react-i18next";

import { ProductProps } from "../@types/product";

const InlineProduct = ({ name, quantity, brand, price }: ProductProps) => {
  const { t } = useTranslation();
  return (
    <div className="inlineproduct">
      <div className="inlineproduct__left">
        <div className="inlineproduct__image__container">
          <img
            src="/img/leche-pascual.png"
            alt="inlineproduct"
            className="inlineproduct__image"
          />
        </div>
        <div className="inlineproduct__info__container">
          <span className="inlineproduct__name">{name}</span>
          <span className="inlineproduct__quantity">x{quantity}</span>
          <span className="inlineproduct__brand">
            {t("brand")}: {brand}
          </span>
        </div>
      </div>
      <div className="inlineproduct__right">
        <span className="inlineproduct__price">{price}</span>
      </div>
    </div>
  );
};

export default InlineProduct;
