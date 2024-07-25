import React from "react";
import { useForm } from "react-hook-form";
import InputHook from "../input/InputHook";
import RadioHook from "../radio/RadioHook";
import CheckboxHook from "../checkbox/CheckboxHook";
import DropdownHook from "../dropdown/DropdownHook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const dropdownData = [
    {
        id: 1,
        value: "teacher",
        text: "Teacher",
    },
    {
        id: 2,
        value: "student",
        text: "Student",
    },
    {
        id: 3,
        value: "developer",
        text: "Developer",
    },
    {
        id: 4,
        value: "freelancer",
        text: "Freelancer",
    },
];

const schema = yup
    .object({
        username: yup.string().required("Please enter your username!"),
        email: yup
            .string()
            .email("The email is invalidated!")
            .required("Please enter your email!")
            .matches(/@[^.]*\./, "Invalided email!"),
        password: yup
            .string()
            .min(8, "Your password must have at least 8 characters!")
            .matches(
                /[a-z]/,
                "Your password must contain at least one lowercase letter!"
            )
            .matches(
                /[A-Z]/,
                "Your password must contain at least one uppercase letter!"
            )
            .matches(/\d/, "Your password must contain at least one number!")
            .matches(
                /[@$!%*?&]/,
                "Your password must contain at least one special character!"
            )
            .required("Please enter your password!"),
        gender: yup
            .string()
            .required("Please select your gender!")
            .oneOf(["male", "female"]),
        job: yup.string().required("Please select your job!"),
        term: yup
            .boolean()
            .oneOf([true], "Please agree to all the terms and conditions!")
            .required("Please agree to all the terms and conditions!"),
    })
    .required();

const RegisterHook = () => {
    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmitHandler = (value) => {
        if (isValid) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                    console.log(value);
                    reset({
                        username: "",
                        email: "",
                        password: "",
                        gender: "",
                        job: "",
                        term: false,
                    });
                }, 2000);
            });
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
            className=" max-w-[400px] p-3 mx-auto"
        >
            {/* Username  */}
            <div className="flex flex-col gap-3">
                <label
                    htmlFor="username"
                    className="cursor-pointer font-semibold"
                >
                    User's name
                </label>
                <InputHook
                    id="username"
                    name="username"
                    type="text"
                    control={control}
                    placeholder="Enter your name"
                ></InputHook>
                {errors.username && (
                    <p className="text-red-500 text-sm">
                        {errors.username.message}
                    </p>
                )}
            </div>
            {/* Email */}
            <div className="flex flex-col gap-3 mt-5">
                <label htmlFor="email" className="cursor-pointer font-semibold">
                    Email
                </label>
                <InputHook
                    id="email"
                    name="email"
                    type="email"
                    control={control}
                    placeholder="Enter your email address"
                ></InputHook>
                {errors.email && (
                    <p className="text-red-500 text-sm">
                        {errors.email.message}
                    </p>
                )}
            </div>
            {/* Password */}
            <div className="flex flex-col gap-3 mt-5">
                <label
                    htmlFor="password"
                    className="cursor-pointer font-semibold"
                >
                    Password
                </label>
                <InputHook
                    id="password"
                    name="password"
                    type="password"
                    control={control}
                    placeholder="Enter your password"
                ></InputHook>
                {errors.password && (
                    <p className="text-red-500 text-sm">
                        {errors.password.message}
                    </p>
                )}
            </div>
            {/* Gender */}
            <div className="flex flex-col gap-3 mt-5">
                <label className="cursor-pointer font-semibold">Gender</label>
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-x-3">
                        <RadioHook
                            control={control}
                            name="gender"
                            value="male"
                        ></RadioHook>
                        <span>Male</span>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <RadioHook
                            control={control}
                            name="gender"
                            value="female"
                        ></RadioHook>
                        <span>Female</span>
                    </div>
                </div>
                {errors.gender && (
                    <p className="text-red-500 text-sm">
                        {errors.gender.message}
                    </p>
                )}
            </div>
            {/* Job */}
            <div className="flex flex-col gap-3 mt-5">
                <label className="cursor-pointer font-semibold">Are you</label>
                <DropdownHook
                    control={control}
                    setValue={setValue}
                    name="job"
                    data={dropdownData}
                ></DropdownHook>
                {errors.job && (
                    <p className="text-red-500 text-sm">{errors.job.message}</p>
                )}
            </div>
            {/* Term */}
            <div className="mt-5">
                <CheckboxHook
                    control={control}
                    text="I accept terms and conditions."
                    name="term"
                ></CheckboxHook>
                {errors.term && (
                    <p className="text-red-500 text-sm mt-3">
                        {errors.term.message}
                    </p>
                )}
            </div>
            {/* submit  */}
            <button
                className="w-full bg-blue-500 p-5 text-white rounded-lg mt-5 font-semibold"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <div className="w-6 h-6 rounded-full border-white border-2 border-t-transparent mx-auto animate-spin"></div>
                ) : (
                    "Submit"
                )}
            </button>
        </form>
    );
};

export default RegisterHook;
