import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";

import SplashScreen from "./pages/SplashScreen";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
