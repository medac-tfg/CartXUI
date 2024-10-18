import { useState,useRef } from "react";

import Header from "../components/Home/Header/Header";
import Categories from "../components/Home/Categories/Categories";
import Invoice from "../components/Home/Invoice/Invoice";
import Products from "../components/Home/Products/Products";
import ManageListView from "../components/Home/ManageListView/ManageListView";

const Home = () => {
  const [listView, setListView] = useState(false);
  const productListRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="home">
        <Header />
        {!listView && <Categories />}
        <div className="product__wrapper" ref={productListRef}>
          <Products listView={listView} />
        </div>
        <ManageListView listView={listView} setListView={setListView} productListRef={productListRef} />
      </div>
      <Invoice />
    </div>
  );
};

export default Home;
