import useClickOutSide from "../hooks/useClickOutSide";

const Dropdown = () => {
  const { show, setShow, nodeRef } = useClickOutSide();

  // console.log(setShow);
  // console.log(nodeRef);

  return (
    <div>
      <div className="relative w-full max-w-[400px]" ref={nodeRef}>
        <div
          className="w-full cursor-pointer rounded-lg border border-gray-200 p-5"
          onClick={() => {
            setShow(!show);
          }}
        >
          Selected
        </div>
        {show && (
          <div className="absolute left-0 top-[125%] w-full rounded-lg border border-gray-200 bg-white">
            <div className="cursor-pointer p-5">Javascript</div>
            <div className="cursor-pointer p-5">ReactJS</div>
            <div className="cursor-pointer p-5">VueJS</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
