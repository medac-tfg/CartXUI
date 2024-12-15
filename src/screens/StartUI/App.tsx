import {
  HashRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import { useEffect } from "react";

import SelectShoppingMethod from "./pages/SelectShoppingMethod";
import Instructions from "./pages/Instructions";

import { RouteChange } from "./@types/app";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    require: any;
  }
}

const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.electron.onChangeRoute(({ route, state }: RouteChange) => {
      navigate(route, { state });
    });
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<SelectShoppingMethod />} />
      <Route path="/instructions" element={<Instructions />} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

const root = createRoot(document.getElementById("root"));
root.render(<App />);
