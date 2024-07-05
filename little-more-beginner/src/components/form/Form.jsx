import useHandleForm from "../hooks/useHandleForm";

const Form = () => {
  const { values, handleValue } = useHandleForm({
    fullname: "",
    email: "",
    hobby: false,
  });

  console.log(values);

  return (
    <form className="flex gap-5" autoComplete="off">
      <input
        type="text"
        name="fullname"
        className="block w-full max-w-[450px] rounded-md border border-gray-200 p-5 transition-all"
        placeholder="Enter your name"
        onChange={handleValue}
      />

      <input
        type="email"
        name="email"
        className="block w-full max-w-[450px] rounded-md border border-gray-200 p-5 transition-all"
        placeholder="Enter your email"
        onChange={handleValue}
      />

      {/* <input type="checkbox" name="hobby" onChange={handleValue} /> */}

      <button type="submit" className="rounded-lg bg-blue-400 p-5 text-white">
        Submit
      </button>
    </form>
  );
};

export default Form;
