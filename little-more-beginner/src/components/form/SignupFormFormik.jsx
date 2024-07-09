import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const SignupFormFormik = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        intro: "",
        job: "",
        term: false,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .min(2, "First name is too short!")
          .required("Required!"),
        lastName: Yup.string()
          .min(2, "Last name is too short!")
          .required("Required!"),
        email: Yup.string()
          .email("Email doesn't invalidated!")
          .required("Required!"),
        intro: Yup.string().required("Required!"),
        term: Yup.boolean().oneOf([true], "You need to accept the terms."),
      })}
      onSubmit={(values, action) => {
        setTimeout(() => {
          action.resetForm({
            firstName: "",
            lastName: "",
            email: "",
            intro: "",
            job: "",
            term: false,
          });
          action.setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="mx-auto w-full max-w-[500px] p-10" autoComplete="off">
          {/* First Name */}
          <MyInput
            id="firstName"
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
          ></MyInput>
          {/* Last name*/}
          <MyInput
            id="lastName"
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
          ></MyInput>
          {/* Email */}
          <MyInput
            id="email"
            label="Email"
            name="email"
            placeholder="Enter your email"
          ></MyInput>
          {/* Introduction */}
          <MyTextarea
            id="intro"
            label="Introduction"
            name="intro"
            placeholder="Enter your introduction"
          ></MyTextarea>
          {/* Job */}
          <MySelectBox name="job" label="Select your job">
            <option value="frontend">Fronted Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="fullstack">Fullstack Developer</option>
          </MySelectBox>
          {/* Term check box */}
          <MyCheckBox name="term">
            <p>I accept the terms and conditions.</p>
          </MyCheckBox>
          {/* Button submit */}
          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-400 p-4 font-semibold text-white"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const MyInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-3 flex flex-col gap-2">
      <label
        htmlFor={props.id || props.name}
        className="cursor-pointer text-[17px] font-semibold"
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        type="text"
        className="font-base rounded-md border-2 border-gray-400 p-5 font-medium focus:border-blue-400 focus:placeholder:text-blue-200"
      />
      {meta.touched && meta.error ? (
        <div className="text-base text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
MyInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

const MyTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-3 flex flex-col gap-2">
      <label
        htmlFor={props.id || props.name}
        className="cursor-pointer text-[17px] font-semibold"
      >
        {label}
      </label>
      <textarea
        className="font-base h-[150px] resize-none rounded-md border-2 border-gray-400 p-5 font-medium focus:border-blue-400 focus:placeholder:text-blue-200"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
MyTextarea.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

const MySelectBox = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-3 flex flex-col gap-2">
      <label
        htmlFor={props.id || props.name}
        className="cursor-pointer text-[17px] font-semibold"
      >
        {label}
      </label>
      <select
        className="appearance-none rounded-md border-2 border-gray-400 p-5 font-medium focus:border-blue-400 focus:placeholder:text-blue-200"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
MySelectBox.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

const MyCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-5 flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
MyCheckBox.propTypes = {
  children: PropTypes.any,
  id: PropTypes.string,
  name: PropTypes.string,
};
export default SignupFormFormik;
