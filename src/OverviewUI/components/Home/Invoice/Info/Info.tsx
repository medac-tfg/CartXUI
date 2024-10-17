import { FiGift } from "react-icons/fi";

const Info = () => {
  return (
    <div className="invoice__info__container">
      <div className="invoice__info__overlay"></div>
      <div
        className="invoice__info__overlay"
        style={{ marginLeft: "99px" }}
      ></div>
      <div
        className="invoice__info__overlay"
        style={{ marginLeft: "198px" }}
      ></div>

      <div className="invoice__info">
        <div className="invoice__info__item">
          <span className="invoice__info__item__text">Subtotal</span>

          <div className="invoice__info__item__right">
            <span className="invoice__info__item__text invoice__info__item__currency">
              €
            </span>
            <span className="invoice__info__item__text">24,13</span>
          </div>
        </div>

        <div className="invoice__info__item">
          <span className="invoice__info__item__text">Tax</span>

          <div className="invoice__info__item__right">
            <span className="invoice__info__item__text invoice__info__item__currency">
              €
            </span>
            <span className="invoice__info__item__text">2,00</span>
          </div>
        </div>

        <div className="invoice__info__separator" />

        <div className="invoice__info__total">
          <span className="invoice__info__total__text">TOTAL</span>

          <div className="invoice__info__total__right">
            <span className="invoice__info__total__text invoice__info__total__currency">
              €
            </span>
            <span className="invoice__info__total__text">26,13</span>
          </div>
        </div>
      </div>

      <div className="invoice__addvoucher__container">
        <div className="invoice__addvoucher">
          <span className="invoice__addvoucher__text">
            Add Promo or Voucher
          </span>
          <div className="invoice__addvoucher__icon">
            <FiGift color="#000" size={14} />
          </div>
        </div>
      </div>

      <div className="invoice__placeorder">
        <span className="invoice__placeorder__text">Place Order</span>
      </div>
    </div>
  );
};

export default Info;
