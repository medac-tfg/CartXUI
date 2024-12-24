import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/Home/Header/Header";
import Categories from "../components/Home/Categories/Categories";
import Invoice from "../components/Home/Invoice/Invoice";
import Products from "../components/Home/Products/Products";
import ManageListView from "../components/Home/ManageListView/ManageListView";

const Home = () => {
  const location = useLocation();
  const [listView, setListView] = useState(false);
  const productListRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="home">
        <Header />
        {!listView && (
          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}
        <div className="product__wrapper" ref={productListRef}>
          <Products listView={listView} activeCategory={activeCategory} />
        </div>
        <ManageListView
          listView={listView}
          setListView={setListView}
          productListRef={productListRef}
        />
      </div>
      <Invoice initialAdditionalProducts={location.state?.additionalProducts} />
    </div>
  );
};

export default Home;
