import "../../../../i18n/config";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line import/no-unresolved
import { CategoryProps } from "./@types/category";

const Category = ({
  index,
  name,
  Icon,
  itemCount,
  active,
  setActiveCategory,
}: CategoryProps) => {
  const containerClassName = active
    ? "category__container category__container__active"
    : "category__container";
  const iconClassName = active
    ? "category__icon category__icon__active"
    : "category__icon";
  const { t } = useTranslation();

  return (
    <div
      className={containerClassName}
      onClick={() => setActiveCategory(index)}
    >
      <div className={iconClassName}>
        <Icon size={22} color={active ? "#fff" : "#000"} />
      </div>
      <span className="category__name">{name}</span>
      <span className="category__item-count">
        {itemCount}{" "}
        {itemCount > 1 ? t("items").toLowerCase() : t("item").toLowerCase()}
      </span>
    </div>
  );
};

export default Category;
