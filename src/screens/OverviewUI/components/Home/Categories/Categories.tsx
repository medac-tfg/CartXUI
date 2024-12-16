import { useState, useEffect } from "react";
import { getIcon } from "../../../utils/getIcon";

import Category from "./Category/Category";

import { Categories, CategoriesProps } from "./@types/categories";

const Categories = ({ activeCategory, setActiveCategory }: CategoriesProps) => {
  const [categories, setCategories] = useState([]);

  const calculateProductCount = () => {
    return categories.reduce(
      (acc, category) => acc + category.productQuantity,
      0
    );
  };

  useEffect(() => {
    window.electron.onSetCategories((categories: Categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <div className="categories">
      <Category
        name="All"
        Icon={getIcon("io5", "IOList")}
        productQuantity={calculateProductCount()}
        active={activeCategory === "All"}
        setActiveCategory={setActiveCategory}
      />
      {categories.map((category, index) => (
        <Category
          key={index}
          name={category.name}
          Icon={getIcon(category.icon.lib, category.icon.icon)}
          productQuantity={category.productQuantity}
          active={activeCategory === category.name}
          setActiveCategory={setActiveCategory}
        />
      ))}
    </div>
  );
};

export default Categories;
