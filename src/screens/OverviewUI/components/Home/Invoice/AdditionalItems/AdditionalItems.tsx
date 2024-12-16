import { useState } from "react";
import Item from "./Item/Item";
import { AdditionalItemsComponentProps } from "./@types/additional";

const AdditionalItems = ({ itemList }: AdditionalItemsComponentProps) => {
  const [items, setItems] = useState(itemList);

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
    );

    window.electron.handleAdditionalProductChange(id, quantity);
  };

  return (
    <div className="invoice__additional-items">
      {items.map((item) => (
        <Item
          key={item._id}
          titleKey={item.name}
          price={item.priceWithTax}
          image={item.image}
          quantity={item.quantity}
          onQuantityChange={(newQuantity) =>
            updateQuantity(item._id, newQuantity)
          }
        />
      ))}
    </div>
  );
};

export default AdditionalItems;
