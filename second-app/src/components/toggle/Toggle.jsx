import { useState } from "react";
import "../../css/toggle.css";

const Toggle = () => {
  const [on, setOn] = useState(false);
  const handleToggle = () => {
    setOn((on) => !on);
  };
  return (
    <>
      <div className={`toggle ${on ? "active" : ""}`} onClick={handleToggle}>
        <div className={`spinner ${on ? "active" : ""}`}></div>
      </div>
    </>
  );
};

export default Toggle;
