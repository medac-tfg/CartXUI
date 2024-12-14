import Category from "./Category/Category";
import { getIcon } from "../../../utils/getIcon";

import { CategoriesProps } from "./@types/categories";

const Categories = ({
  categories,
  productCount,
  activeCategory,
  setActiveCategory,
}: CategoriesProps) => {
  return (
    <div className="categories">
      <Category
        name="All"
        Icon={getIcon("io5", "IOList")}
        productQuantity={productCount}
        active={activeCategory === "All"}
        setActiveCategory={setActiveCategory}
      />
      {categories.map((category, index) => {
        console.log(category);
        return (
          <Category
            key={index}
            name={category.name}
            Icon={getIcon(category.icon.lib, category.icon.icon)}
            productQuantity={category.productQuantity}
            active={activeCategory === category.name}
            setActiveCategory={setActiveCategory}
          />
        );
      })}
    </div>
  );
};

export default Categories;
