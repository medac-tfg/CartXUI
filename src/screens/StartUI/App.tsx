import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";

import SelectShoppingMethod from "./pages/SelectShoppingMethod";
import Instructions from "./pages/Instructions";

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
          path="/instructions"
          element={<Instructions />}
        />
      </Routes>
    </Router>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
