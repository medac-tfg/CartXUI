import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import { formatCurrency } from "../../../../utils/formatCurrency";

import { ProductModalProps } from "./@types/modal";
import { Products } from "../../Products/@types/products";

const ProductModal = ({ products, setShowProductList }: ProductModalProps) => {
  const handleClose = () => setShowProductList(false);

  const showProductInput = async () => {
    const { value: barcode } = await Swal.fire({
      title: "Enter the barcode of the product",
      input: "text",
      inputPlaceholder: "Barcode",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (!barcode) return;

    console.log("Barcode", barcode);
  };

  const buttons = [
    {
      text: "Add Product",
      action: showProductInput,
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
      quantity: 10,
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
            <IoClose size={24} />
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
