import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  //stale state
  const handleIncrement = () => {
    setTimeout(function delay() {
      //(count) => count + 1 is called back that help resolve stale state.
      setCount((count) => count + 1);
    }, 1000);
  };
  return <div onClick={handleIncrement}>Increment: {count}</div>;
};

export default Counter;
