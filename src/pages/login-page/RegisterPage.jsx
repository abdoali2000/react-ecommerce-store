import React, { useContext } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, User, Lock } from "lucide-react";
import { useSelector } from "react-redux";

function RegisterPage() {
  const navigate = useNavigate();
  const { setUSer } = useContext(AuthContext);
  const themeMode = useSelector((state) => state.theme.mode);
  const isDarkMode = themeMode === "dark";

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
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black px-4 py-10">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <Form className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.12)] dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:shadow-[0_22px_70px_rgba(0,0,0,0.7)]">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="mb-2 text-center text-3xl font-bold text-slate-900 dark:text-[#f6e7bf]"
            >
              Register
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="mb-6 text-center text-sm text-slate-600 dark:text-[#d6c59b]"
            >
              Create your luxury account
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="mb-4 flex flex-col"
            >
              <label className="mb-1 flex items-center gap-2 text-slate-600 dark:text-[#d6c59b]">
                <Mail size={14} /> Email
              </label>
              <Field
                name="email"
                type="email"
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-900 outline-none focus:border-[#6b0b0b] dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:text-[#f6e7bf] dark:focus:border-[#D4AF37]"
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="mb-4 flex flex-col"
            >
              <label htmlFor="name" className="mb-1 flex items-center gap-2 text-slate-600 dark:text-[#d6c59b]">
                <User size={14} /> Name
              </label>
              <Field
                name="name"
                type="text"
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-900 outline-none focus:border-[#6b0b0b] dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:text-[#f6e7bf] dark:focus:border-[#D4AF37]"
                placeholder="Enter name"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm"/>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="mb-4 flex flex-col"
            >
              <label htmlFor="username" className="mb-1 flex items-center gap-2 text-slate-600 dark:text-[#d6c59b]">
                <User size={14} /> Username
              </label>
              <Field
                name="username"
                type="text"
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-900 outline-none focus:border-[#6b0b0b] dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:text-[#f6e7bf] dark:focus:border-[#D4AF37]"
                placeholder="Enter username"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm"/>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.3 }}
              className="mb-4 flex flex-col"
            >
              <label htmlFor="password" className="mb-1 flex items-center gap-2 text-slate-600 dark:text-[#d6c59b]">
                <Lock size={14} /> Password
              </label>
              <Field
                name="password"
                type="password"
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-900 outline-none focus:border-[#6b0b0b] dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:text-[#f6e7bf] dark:focus:border-[#D4AF37]"
                placeholder="Enter password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.35 }}
              className="mb-6 flex flex-col"
            >
              <label htmlFor="confirmPassword" className="mb-1 flex items-center gap-2 text-slate-600 dark:text-[#d6c59b]">
                <Lock size={14} /> Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-900 outline-none focus:border-[#6b0b0b] dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:text-[#f6e7bf] dark:focus:border-[#D4AF37]"
                placeholder="Confirm password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm"/>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full rounded-lg border border-[#6b0b0b]/30 bg-[#6b0b0b] py-3 font-semibold text-white shadow-lg transition hover:bg-[#7b1111] dark:border-[#D4AF37]/30 dark:bg-[#4a0404] dark:text-[#f6e7bf] dark:hover:bg-[#5d0d0d]"
            >
              Register
            </motion.button>
          </Form>
        </motion.div>
      </Formik>
    </div>
  );
}

export default RegisterPage;