import { IoClose, IoRemove } from "react-icons/io5";
import { formatCurrency } from "../../../../utils/formatCurrency";

import { ProductModalProps } from "./@types/modal";
import { Products } from "../../Products/@types/products";

const ProductModal = ({ products, setShowProductList }: ProductModalProps) => {
  const handleClose = () => setShowProductList(false);

  const buttons = [
    {
      text: "Add Product",
      action: () => console.log("Add Product"),
    },
    {
      // Aquí añadimos un timeout de 10 segundos con un temporizador y enviamos el call a la función de rescan
      text: "Rescan Products",
      action: () => console.log("Rescan Products"),
    },
  ];

  const transformProducts = (products: Products) => {
    return products.flatMap((product) =>
      Array(product.quantity).fill({
        name: product.name,
        priceWithTax: product.priceWithTax,
        image: product.image,
      })
    );
  };

  products = [
    {
      name: "Product 1",
      quantity: 2,
      priceWithTax: 100,
      image: "https://placehold.co/150",
    },
  ];

  const transformedProducts = transformProducts(products);

  return (
    <div className="admin__product-modal">
      <div className="admin__product-modal__header">
        <div className="admin__product-modal__header__top">
          <div />
          <span className="admin__product-modal__header__title">
            CartX | Manage Products
          </span>
          <div
            className="admin__product-modal__header__close"
            onClick={handleClose}
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
      <div className="admin__product-modal__content">
        {transformedProducts.map((product, index) => (
          <div key={index} className="admin__product-modal__product__container">
            <div className="admin__product-modal__product__left">
              <img
                src={product.image}
                alt="product"
                className="admin__product-modal__product__image"
              />
              <span className="admin__product-modal__product__name">
                {product.name}
              </span>
            </div>
            <div className="admin__product-modal__product__right">
              <span className="admin__product-modal__product__pricequantity">
                {formatCurrency(product.priceWithTax)}
              </span>
              <div className="admin__product-modal__product__remove">
                <IoClose size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductModal;
