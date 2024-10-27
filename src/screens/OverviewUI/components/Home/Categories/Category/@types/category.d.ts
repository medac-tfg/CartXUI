export type CategoryProps = {
  index: number;
  name: string;
  Icon: React.ComponentType<any>;
  itemCount: number;
  active?: boolean;
  setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
};