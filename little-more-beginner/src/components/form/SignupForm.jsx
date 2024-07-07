import { useFormik } from "formik";
import * as Yup from "yup";

const SignupForm = () => {
  // const validation = (values) => {
  //   const errors = {};
  //   if (!values.firstName) {
  //     errors.firstName = "Required!";
  //   } else if (values.firstName.length <= 1) {
  //     errors.firstName = "First name is too short!";
  //   }
  //   if (!values.lastName) {
  //     errors.lastName = "Required!";
  //   } else if (values.lastName.length <= 1) {
  //     errors.lastName = "Last name is too short!";
  //   }
  //   return errors;
  // };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "First name is too short!")
        .required("Required!"),
      lastName: Yup.string()
        .min(2, "Last name is too short!")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  // console.log(formik);
  return (
    <form
      onSubmit={formik.handleSubmit}
      autoComplete="off"
      className="mx-auto w-full max-w-[500px] p-10"
    >
      <div className="mb-3 flex flex-col gap-2">
        <label htmlFor="firstName" className="text-[17px] font-semibold">
          First name
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter your first name"
          {...formik.getFieldProps("firstName")}
          className="font-base rounded-md border-2 border-gray-400 p-5 font-medium focus:border-blue-400 focus:placeholder:text-blue-200"
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-base text-red-500">
            {formik.errors.firstName}
          </div>
        ) : null}
      </div>
      <div className="mb-3 flex flex-col gap-2">
        <label htmlFor="lastName" className="text-[17px] font-semibold">
          Last name
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter your last name"
          {...formik.getFieldProps("lastName")}
          className="font-base rounded-md border-2 border-gray-400 p-5 font-medium focus:border-blue-400 focus:placeholder:text-blue-200"
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-base text-red-500">{formik.errors.lastName}</div>
        ) : null}
      </div>
      <div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-400 p-4 font-semibold text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
