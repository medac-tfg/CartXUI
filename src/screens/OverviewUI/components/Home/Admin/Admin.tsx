import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

import ProductModal from "./ProductModal/ProductModal";

import { AdminPageProps } from "./@types/admin";
import { Products } from "../Products/@types/products";

const Admin = ({ setShowAdmin }: AdminPageProps) => {
  const [showProductList, setShowProductList] = useState(false);
  const handleAdminClose = () => setShowAdmin(false);
  const [products, setProducts] = useState<Products>([]);

  useEffect(() => {
    window.electron.onSetProducts((products: Products) => {
      setProducts(products);
    });
  }, []);

  const buttons = [
    {
      text: "Manage Products",
      action: () => setShowProductList(true),
    },
    {
      text: "Cancel Order",
      action: () => console.log("Cancel Order"),
    },
    {
      text: "Reset Machine",
      action: () => console.log("Reset Machine"),
    },
  ];

  return (
    <div className="admin__container">
      {!showProductList ? (
        <div className="admin__modal">
          <div className="admin__modal__header">
            <div />
            <span className="admin__modal__header__title">
              CartX | Manage Order
            </span>
            <div
              className="admin__modal__header__close"
              onClick={handleAdminClose}
            >
              <IoClose />
            </div>
          </div>
          <div className="button-group">
            {buttons.map((button, index) => (
              <button
                key={index}
                className="button-group__btn"
                onClick={button.action}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <ProductModal
          products={products}
          setShowProductList={setShowProductList}
        />
      )}
    </div>
  );
};

export default Admin;
