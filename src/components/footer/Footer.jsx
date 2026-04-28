import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LanguagesContext } from "../../context/languageContext";

function Footer() {
  const { language } = useContext(LanguagesContext);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-slate-200 bg-white/80 backdrop-blur-lg"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:px-10 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            {language === "ar" ? "متجر بريميوم" : "Premium Store"}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">Abdo Store</h3>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            {language === "ar"
              ? "تجربة تسوق حديثة تجمع بين السرعة والوضوح والأناقة."
              : "A modern commerce experience designed with speed, clarity, and elegance."}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-600">
            {language === "ar" ? "روابط سريعة" : "Quick Links"}
          </h4>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link to="/home" className="text-slate-600 transition hover:text-indigo-700">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <Link to="/products" className="text-slate-600 transition hover:text-indigo-700">
              {language === "ar" ? "المنتجات" : "Products"}
            </Link>
            <Link to="/contact" className="text-slate-600 transition hover:text-indigo-700">
              {language === "ar" ? "تواصل معنا" : "Contact"}
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-600">
            {language === "ar" ? "النشرة البريدية" : "Newsletter"}
          </h4>
          <p className="mt-4 text-sm text-slate-500">
            {language === "ar"
              ? "اشترك ليصلك الجديد عن العروض والمنتجات."
              : "Get updates on new collections and premium offers."}
          </p>
          <button className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
            {language === "ar" ? "اشترك الآن" : "Subscribe"}
          </button>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
