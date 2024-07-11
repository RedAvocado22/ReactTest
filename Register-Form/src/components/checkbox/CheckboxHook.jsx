import React from "react";
import { useController } from "react-hook-form";

const CheckboxHook = ({ control, text, ...props }) => {
    const { field } = useController({
        control,
        name: props.name,
        defaultValue: false,
    });

    return (
        <label className="w-5 h-5 cursor-pointer custom-checkbox">
            <input
                type="checkbox"
                {...field}
                value={props.value}
                id={props.name}
                checked={field.value}
                className="hidden"
            />
            <div className="flex items-center gap-x-3">
                <div className="bg-white w-full h-full rounded-md custom-checkbox-square flex items-center justify-center transition-all">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                        />
                    </svg>
                </div>
                <label htmlFor={props.name} className="text-sm cursor-pointer">
                    {text}
                </label>
            </div>
        </label>
    );
};

export default CheckboxHook;
