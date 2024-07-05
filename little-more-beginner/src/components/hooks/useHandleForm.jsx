import { useState } from "react";

export default function useHandleForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleValue = (e) => {
    const type = e.target.type;

    setValues({
      ...values,
      [e.target.name]: type == "checkbox" ? e.target.checked : e.target.value,
    });
  };

  return {
    values,
    handleValue,
  };
}
