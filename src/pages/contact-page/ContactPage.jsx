import React, { useContext } from "react"; 
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Mail, Phone, Send, UserRound, MessageSquareText } from "lucide-react";
import { LanguagesContext } from "../../context/languageContext"; 

function ContactPage() {
  const { language } = useContext(LanguagesContext);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required(
      language === "ar" ? "الاسم الأول مطلوب" : "First name is required"
    ),
    lastName: Yup.string().required(
      language === "ar" ? "الاسم الأخير مطلوب" : "Last name is required"
    ),
    email: Yup.string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        language === "ar" ? "صيغة البريد غير صحيحة" : "Invalid email format"
      )
      .required(language === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required"),
    phone: Yup.string(),
    message: Yup.string()
      .min(
        10,
        language === "ar"
          ? "يجب أن تكون الرسالة 10 أحرف على الأقل"
          : "Message must be at least 10 characters"
      )
      .max(
        500,
        language === "ar"
          ? "يجب ألا تتجاوز الرسالة 500 حرف"
          : "Message must not exceed 500 characters"
      )
      .required(language === "ar" ? "الرسالة مطلوبة" : "Message is required"),
  });

  const handleSubmit = () => {
    alert(
      language === "ar"
        ? "✅ شكراً لك! سنتواصل معك قريباً."
        : "✅ Thank you! We will get to you soon."
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-10 text-slate-900 dark:bg-black dark:text-[#f6e7bf]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.12)] dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:shadow-[0_22px_70px_rgba(0,0,0,0.7)]">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-6 text-center text-3xl font-bold text-slate-900 dark:text-[#f6e7bf]"
          >
            {language === "ar" ? "اتصل بنا" : "Contact Us"}
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }} className="mb-4 flex flex-col">
            <label className="mb-1 flex items-center gap-2 text-slate-600 dark:text-[#d6c59b]">
              <UserRound size={14} /> {language === "ar" ? "الاسم الأول" : "First Name"}
            </label>
            <Field
              name="firstName"
              type="text"
              className="rounded-lg border border-slate-200 bg-white p-2 text-slate-900 outline-none focus:border-[#6b0b0b] dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:text-[#f6e7bf] dark:focus:border-[#D4AF37]"
              placeholder={language === "ar" ? "أدخل الاسم الأول" : "Enter first name"}
            />
            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1"/>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }} className="mb-4 flex flex-col">
            <label className="mb-1 flex items-center gap-2 text-slate-600 dark:text-[#d6c59b]">
              <UserRound size={14} /> {language === "ar" ? "الاسم الأخير" : "Last Name"}
            </label>
            <Field
              name="lastName"
              type="text"
              className="rounded-lg border border-slate-200 bg-white p-2 text-slate-900 outline-none focus:border-[#6b0b0b] dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:text-[#f6e7bf] dark:focus:border-[#D4AF37]"
              placeholder={language === "ar" ? "أدخل الاسم الأخير" : "Enter last name"}
            />
            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1"/>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 }} className="mb-4 flex flex-col">
            <label className="mb-1 flex items-center gap-2 text-slate-600 dark:text-[#d6c59b]">
              <Mail size={14} /> {language === "ar" ? "البريد الإلكتروني" : "Email Address"}
            </label>
            <Field
              name="email"
              type="email"
              className="rounded-lg border border-slate-200 bg-white p-2 text-slate-900 outline-none focus:border-[#6b0b0b] dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:text-[#f6e7bf] dark:focus:border-[#D4AF37]"
              placeholder={language === "ar" ? "أدخل البريد الإلكتروني" : "Enter email"}
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1"/>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.2 }} className="mb-4 flex flex-col">
            <label className="mb-1 flex items-center gap-2 text-slate-600 dark:text-[#d6c59b]">
              <Phone size={14} /> {language === "ar" ? "رقم الهاتف (اختياري)" : "Phone Number (optional)"}
            </label>
            <Field
              name="phone"
              type="tel"
              className="rounded-lg border border-slate-200 bg-white p-2 text-slate-900 outline-none focus:border-[#6b0b0b] dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:text-[#f6e7bf] dark:focus:border-[#D4AF37]"
              placeholder={language === "ar" ? "أدخل رقم الهاتف" : "Enter phone number"}
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1"/>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.25 }} className="mb-4 flex flex-col">
            <label className="mb-1 flex items-center gap-2 text-slate-600 dark:text-[#d6c59b]">
              <MessageSquareText size={14} /> {language === "ar" ? "الرسالة" : "Message"}
            </label>
            <Field
              as="textarea"
              name="message"
              className="h-28 rounded-lg border border-slate-200 bg-white p-2 text-slate-900 outline-none focus:border-[#6b0b0b] dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:text-[#f6e7bf] dark:focus:border-[#D4AF37]"
              placeholder={language === "ar" ? "اكتب رسالتك هنا..." : "Enter your message (10-500 chars)"}
            />
            <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1"/>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 }}
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#6b0b0b]/30 bg-[#6b0b0b] py-2 text-white transition font-semibold hover:bg-[#7b1111] dark:border-[#D4AF37]/30 dark:bg-[#4a0404] dark:text-[#f6e7bf] dark:hover:bg-[#5d0d0d]"
          >
            <Send size={15} />
            {language === "ar" ? "إرسال الرسالة" : "Send Message"}
          </motion.button>
        </Form>
      </Formik>
    </div>
  );
}

export default ContactPage;