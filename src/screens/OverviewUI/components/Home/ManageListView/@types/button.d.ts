export type ManageListViewProps = {
  listView: boolean;
  setListView: React.Dispatch<React.SetStateAction<boolean>>;
  productListRef: React.RefObject<HTMLDivElement>;
};
