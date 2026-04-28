import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LanguagesContext } from "../../../context/languageContext";

const featuredProducts = [
  { id: 1, title: { en: "Aurora Headphones", ar: "سماعات أورورا" }, price: "$189", tag: { en: "Best Audio", ar: "أفضل صوت" } },
  { id: 2, title: { en: "Smart Watch Pro", ar: "ساعة ذكية برو" }, price: "$249", tag: { en: "New Arrival", ar: "وصل حديثا" } },
  { id: 3, title: { en: "Elegant Chair", ar: "كرسي أنيق" }, price: "$319", tag: { en: "Modern Living", ar: "معيشة عصرية" } },
  { id: 4, title: { en: "Daily Skincare Kit", ar: "مجموعة عناية يومية" }, price: "$99", tag: { en: "Top Rated", ar: "الأعلى تقييما" } },
];

function FeaturedSlider() {
  const { language } = useContext(LanguagesContext);

  return (
    <section className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{language === "ar" ? "منتجات مميزة" : "Featured Products"}</h2>
          <p className="mt-2 text-slate-500">
            {language === "ar" ? "اسحب لاكتشاف مختاراتنا المفضلة." : "Drag to explore our hand-picked collection."}
          </p>
        </div>
        <Link to="/products" className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700">
          {language === "ar" ? "عرض الكل" : "View All"}
        </Link>
      </motion.div>

      <motion.div drag="x" dragConstraints={{ left: -320, right: 0 }} className="cursor-grab active:cursor-grabbing">
        <div className="grid auto-cols-[minmax(260px,1fr)] grid-flow-col gap-5 overflow-x-auto pb-3">
          {featuredProducts.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-white/70 bg-white/75 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-md"
            >
              <div className="mb-5 h-40 rounded-xl bg-linear-to-br from-slate-100 to-indigo-100" />
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">{item.tag[language]}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-800">{item.title[language]}</h3>
              <p className="mt-2 text-base font-bold text-slate-700">{item.price}</p>
              <button className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                {language === "ar" ? "تسوق الآن" : "Shop Now"}
              </button>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default FeaturedSlider;
