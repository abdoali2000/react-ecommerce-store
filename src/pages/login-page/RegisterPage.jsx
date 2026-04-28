import React, { useContext } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const { setUSer } = useContext(AuthContext);

  const initialValues = {
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .required("Email is required"),
    name: Yup.string()
      .required("Name is required"),
    username: Yup.string()
      .matches(/^\S*$/, "Username must not contain spaces")
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values) => {
    setUSer({...values});
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white p-8 rounded-lg shadow-xl w-[350px]">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

          <div className="flex flex-col mb-4">
            <label>Email</label>
            <Field
              name="email"
              type="email"
              className="border p-2 rounded"
              placeholder="Enter email"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="name" >Name</label>
            <Field
              name="name"
              type="text"
              className="border p-2 rounded"
              placeholder="Enter name"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm"/>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="username">Username</label>
            <Field
              name="username"
              type="text"
              className="border p-2 rounded"
              placeholder="Enter username"
            />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm"/>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              type="password"
              className="border p-2 rounded"
              placeholder="Enter password"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field
              name="confirmPassword"
              type="password"
              className="border p-2 rounded"
              placeholder="Confirm password"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm"/>
          </div>

          <button
            type="submit"
            className="bg-blue-600 w-full text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default RegisterPage;