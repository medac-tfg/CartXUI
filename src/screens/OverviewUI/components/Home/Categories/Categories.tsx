import { useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";

import Category from "./Category/Category";

import { CategoriesProps } from "./@types/categories";

const Categories = ({ categories, productCount, activeCategory, setActiveCategory }: CategoriesProps) => {
  return (
    <div className="categories">
      <Category
        name="All"
        Icon={IoFastFoodOutline}
        productQuantity={productCount}
        active={activeCategory === "All"}
        setActiveCategory={setActiveCategory}
      />
      { categories.map((category, index) => (
        <Category
          key={index}
          name={category.name}
          Icon={IoFastFoodOutline}
          productQuantity={category.productQuantity}
          active={activeCategory === category.name}
          setActiveCategory={setActiveCategory}
        />
      )) }
    </div>
  );
};

export default Categories;
