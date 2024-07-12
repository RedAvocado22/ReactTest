import React, { useEffect, useState } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import { useWatch } from "react-hook-form";

const DropdownHook = ({
    control,
    setValue,
    name,
    data,
    dropdownLabel = "Select your job",
}) => {
    const { show, setShow, nodeRef } = useClickOutSide("span");
    const [label, setLabel] = useState(dropdownLabel);

    const dropdownValues = useWatch({
        control,
        name: "job",
        defaultValues: "",
    });

    const handleClickDropdownItem = (e) => {
        setValue(name, e.target.dataset.value);
        setShow(false);
        setLabel(e.target.textContent);
    };

    useEffect(() => {
        if (dropdownValues == "") setLabel(dropdownLabel);
    }, [dropdownValues]);
    return (
        <div className="relative" ref={nodeRef}>
            <div
                className="p-5 rounded-lg border border-gray-100 bg-white flex items-center justify-between cursor-pointer"
                onClick={() => setShow(!show)}
            >
                <span>{label}</span>
            </div>
            {show ? (
                <div className="absolute top-[105%] left-0 w-full rounded-lg bg-white">
                    {data?.map((item) => (
                        <div
                            className="p-5 cursor-pointer hover:bg-blue-100"
                            onClick={handleClickDropdownItem}
                            data-value={item.value}
                            key={item.id}
                        >
                            {item.text}
                        </div>
                    ))}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default DropdownHook;
