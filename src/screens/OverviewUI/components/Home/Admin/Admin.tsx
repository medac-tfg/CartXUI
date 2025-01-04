import { IoClose } from "react-icons/io5";
import { AdminPageProps } from "./@types/admin";

const Admin = ({ setShowAdmin }: AdminPageProps) => {
  const handleAdminClose = () => setShowAdmin(false);

  const buttons = [
    {
      text: "Manage Products",
      action: () => console.log("Manage Products"),
    },
    {
      text: "Cancel Order",
      action: () => console.log("Cancel Order"),
    },
    {
      text: "Reset Machine",
      action: () => console.log("Reset Machine"),
    }
  ];

  return (
    <div className="admin__container">
      <div className="admin__modal">
        <div className="admin__modal__header">
          <div/>
          <span className="admin__modal__header__title">CartX | Manage Order</span>
          <div className="admin__modal__header__close" onClick={handleAdminClose}>
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
    </div>
  );
};

export default Admin;
