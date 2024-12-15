import {
  HashRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import { useEffect } from "react";

import SplashScreen from "./pages/SplashScreen";
import Home from "./pages/Home";

import { RouteChange } from "./@types/app";

const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.electron.onChangeRoute(({ route, state }: RouteChange) => {
      navigate(route, { state });
    });
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<Home />} />
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
