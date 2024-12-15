import { FiList } from "react-icons/fi";

import { ManageListViewProps } from "./@types/button";

const ManageListView = ({
  listView,
  setListView,
  productListRef,
}: ManageListViewProps) => {
  const handleButtonClick = () => {
    setListView(!listView);

    if (productListRef.current) {
      productListRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  return (
    <button onClick={handleButtonClick} className="home__manage-list-view">
      <FiList size={24} color="#fff" />
    </button>
  );
};

export default ManageListView;
