import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

function ContactPage() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .required("Email is required"),
    phone: Yup.string(), 
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .max(500, "Message must not exceed 500 characters")
      .required("Message is required"),
  });

  const handleSubmit = () => {
    alert("✅ Thank you! We will get to you soon.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white p-8 rounded-lg shadow-xl w-[400px]">
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Contact Us</h2>

          <div className="flex flex-col mb-4">
            <label>First Name</label>
            <Field
              name="firstName"
              type="text"
              className="border p-2 rounded"
              placeholder="Enter first name"
            />
            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm"/>
          </div>

          <div className="flex flex-col mb-4">
            <label>Last Name</label>
            <Field
              name="lastName"
              type="text"
              className="border p-2 rounded"
              placeholder="Enter last name"
            />
            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm"/>
          </div>

          <div className="flex flex-col mb-4">
            <label>Email Address</label>
            <Field
              name="email"
              type="email"
              className="border p-2 rounded"
              placeholder="Enter email"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>
          </div>

          <div className="flex flex-col mb-4">
            <label>Phone Number (optional)</label>
            <Field
              name="phone"
              type="tel"
              className="border p-2 rounded"
              placeholder="Enter phone number"
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm"/>
          </div>

          <div className="flex flex-col mb-4">
            <label>Message</label>
            <Field
              as="textarea"
              name="message"
              className="border p-2 rounded h-28"
              placeholder="Enter your message (10-500 chars)"
            />
            <ErrorMessage name="message" component="div" className="text-red-500 text-sm"/>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 w-full text-white py-2 rounded hover:bg-indigo-700 transition font-semibold"
          >
            Send Message
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default ContactPage;
