import { useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import Category from "./Category/Category";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="categories">
      {Array(100)
        .fill(0)
        .map((_, index) => (
          <Category
            index={index}
            name="Category"
            Icon={IoFastFoodOutline}
            itemCount={10}
            active={activeCategory === index}
            setActiveCategory={setActiveCategory}
          />
        ))}
    </div>
  );
};

export default Categories;
