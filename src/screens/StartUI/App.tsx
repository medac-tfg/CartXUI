import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";

import SelectShoppingMethod from "./pages/SelectShoppingMethod";
import ShoppingCartInstructions from "./pages/Instructions/ShoppingCartInstructions";
import ShoppingBasketInstructions from "./pages/Instructions/ShoppingBasketInstructions";
import ByHandInstructions from "./pages/Instructions/ByHandInstructions";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    require: any;
  }
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectShoppingMethod />} />
        <Route
          path="/shopping-cart-instructions"
          element={<ShoppingCartInstructions />}
        />
        <Route
          path="/shopping-basket-instructions"
          element={<ShoppingBasketInstructions />}
        />
        <Route path="/by-hand-instructions" element={<ByHandInstructions />} />
      </Routes>
    </Router>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
