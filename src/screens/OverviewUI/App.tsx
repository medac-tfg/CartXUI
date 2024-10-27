import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
