import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/Home/Header/Header";
import Categories from "../components/Home/Categories/Categories";
import Invoice from "../components/Home/Invoice/Invoice";
import Products from "../components/Home/Products/Products";
import ManageListView from "../components/Home/ManageListView/ManageListView";

import { ProductsAndCategories } from "../@types/home";

const Home = () => {
  const location = useLocation();
  const [listView, setListView] = useState(false);
  const productListRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [additionalProducts, setAdditionalProducts] = useState(
    location.state?.additionalProducts || []
  );
  const [invoice, setInvoice] = useState({
    subtotal: 0,
    discount: 0,
    totalTax: 0,
    total: 0,
  });

  useEffect(() => {
    window.electron.onSetProductsAndCategories(
      ({ products, categories }: ProductsAndCategories) => {
        setProducts(products);
        setCategories(categories);
      }
    );

    window.electron.onTicketInvoiceChange((data: any) => {
      setInvoice({
        total: data.total,
        subtotal: data.subtotal,
        discount: data.discount,
        totalTax: data.totalTax,
      });
    });

    window.electron.onAdditionalProductChange((data: any) => {
      setAdditionalProducts(data);
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="home">
        <Header />
        {!listView && (
          <Categories
            categories={categories}
            productCount={products.length}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}
        <div className="product__wrapper" ref={productListRef}>
          <Products
            listView={listView}
            products={products}
            activeCategory={activeCategory}
          />
        </div>
        <ManageListView
          listView={listView}
          setListView={setListView}
          productListRef={productListRef}
        />
      </div>
      <Invoice additionalProducts={additionalProducts} invoice={invoice} />
    </div>
  );
};

export default Home;
