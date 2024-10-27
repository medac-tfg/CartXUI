import { useState, useEffect } from "react";
import { FiCalendar, FiClock, FiSliders } from "react-icons/fi";

const Header = () => {
  const [dateString, setDateString] = useState("");
  const [timeString, setTimeString] = useState("");
  const [amPm, setAmPm] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      };
      const formattedDate = now.toLocaleDateString("en-US", dateOptions);

      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const formattedTime = now.toLocaleTimeString("en-US", timeOptions);

      const [time, period] = formattedTime.split(" ");

      setDateString(formattedDate);
      setTimeString(time);
      setAmPm(period);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__date">
          <div className="header__icon">
            <FiCalendar className="icon" color="#2c70f7" size={14} />
          </div>
          <span className="header__date__text">{dateString}</span>
        </div>
        <div className="header__hour">
          <div className="header__icon">
            <FiClock color="#2c70f7" size={14} />
          </div>
          <span className="header__hour__text">{timeString}</span>
          <span className="header__am-pm">{amPm}</span>
        </div>
      </div>
      <div className="header__manageorder">
        <span className="header__manageorder__text">Manage Order</span>
        <div className="header__icon header__icon__blue">
          <FiSliders color="#2c70f7" size={14} />
        </div>
      </div>
    </div>
  );
};

export default Header;
