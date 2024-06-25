import { useState } from "react";

const Toggle = () => {
  const [on, setOn] = useState(false);
  console.log(on);
  return (
    <div className="toggel" onClick={() => setOn(true)}>
      Toggle
    </div>
  );
};

export default Toggle;
