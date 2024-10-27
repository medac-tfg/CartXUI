// eslint-disable-next-line import/no-unresolved
import { ShoppingMethodProps } from "./@types/shoppingmethod";

const ShoppingMethod = ({
  option,
  title,
  icon,
  height,
  handleShoppingMethod,
}: ShoppingMethodProps) => {
  return (
    <div
      className="welcome__shopping-method"
      onClick={() => handleShoppingMethod(title)}
    >
      <div className="welcome__shopping-method-info">
        <span className="welcome__shopping-method-option">Option {option}</span>
        <span className="welcome__shopping-method-title">{title}</span>
      </div>
      <div className="welcome__shopping-method-icon-container">
        <img
          className="welcome__shopping-method-icon"
          src={icon}
          alt={title}
          style={{ height }}
        />
      </div>
    </div>
  );
};

export default ShoppingMethod;
