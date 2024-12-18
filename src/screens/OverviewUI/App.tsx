import { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ToastContainer, ToastOptions, toast } from "react-toastify";

import SplashScreen from "./pages/SplashScreen";
import Home from "./pages/Home";

import { RouteChange } from "./@types/app";
import { ToastEventPayload } from "./@types/toast";

const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.electron.onChangeRoute(({ route, state }: RouteChange) => {
      navigate(route, { state });
    });
  }, [navigate]);

  useEffect(() => {
    window.electron.onToast(({ type, message }: ToastEventPayload) => {
      const toastTypeMap: Record<string, ToastOptions["type"]> = {
        success: "success",
        info: "info",
        warning: "warning",
        error: "error",
      };

      const toastType = toastTypeMap[type] || "default";
      toast(message, {
        type: toastType,
        style: {
          fontFamily: "Montserrat-SemiBold",
          fontSize: "14px",
          width: "fit-content",
        },
      });
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <ToastContainer />
    <AppContent />
  </Router>
);

const root = createRoot(document.getElementById("root"));
root.render(<App />);
