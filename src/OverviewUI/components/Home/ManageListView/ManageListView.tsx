import { FiList } from "react-icons/fi";

import { ManageListViewProps } from "./@types/button";

const ManageListView = ({ listView, setListView }: ManageListViewProps) => {
  return (
    <button
      onClick={() => setListView(!listView)}
      className="home__manage-list-view"
    >
      <FiList size={18} color="#fff" />
    </button>
  );
};

export default ManageListView;
