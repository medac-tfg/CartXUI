import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.electron.onOrderStarted(() => {
      console.log(`Received order start on OverviewUI`);
      navigate("/home");
    });
  }, []);

  return (
    <div className="splash-screen-container">
      <span className="branding-text">Welcome to CartX!</span>
      <span className="branding-text">
        Touch the first screen to start the order.
      </span>
    </div>
  );
};

export default SplashScreen;
