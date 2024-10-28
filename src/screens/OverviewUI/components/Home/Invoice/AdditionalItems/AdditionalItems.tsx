import { useState } from "react";
import Item from "./Item/Item";

const AdditionalItems = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      titleKey: "plastic_bag",
      price: 0.1,
      image: "/img/shopping-bag.png",
      selectedQuantity: 0,
    },
    {
      id: 2,
      titleKey: "paper_bag",
      price: 0.15,
      image: "/img/shopping-bag-cardboard.png",
      selectedQuantity: 0,
    },
    {
      id: 3,
      titleKey: "reuseable_bag",
      price: 0.2,
      image: "/img/shopping-bag-reusable.png",
      selectedQuantity: 0,
    },
  ]);

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selectedQuantity: Math.max(0, quantity) } : item
      )
    );
  };

  return (
    <div className="invoice__additional-items">
      {items.map((item) => (
        <Item
          key={item.id}
          titleKey={item.titleKey}
          price={item.price}
          image={item.image}
          selectedQuantity={item.selectedQuantity}
          onQuantityChange={(newQuantity) =>
            updateQuantity(item.id, newQuantity)
          }
        />
      ))}
    </div>
  );
};

export default AdditionalItems;
