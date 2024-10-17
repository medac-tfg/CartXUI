import { IoFastFoodOutline } from "react-icons/io5";
import Category from "./Category/Category";

const Categories = () => {
  return (
    <div className="categories">
      {Array(100)
        .fill(0)
        .map((_, index) => (
          <Category
            key={index}
            name="Category"
            Icon={IoFastFoodOutline}
            itemCount={10}
            active={index === 0}
          />
        ))}
    </div>
  );
};

export default Categories;
