import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LanguagesContext } from "../../../context/languageContext";

const categories = [
  { key: "beauty", title: { en: "Beauty", ar: "الجمال" }, desc: { en: "Premium care and daily essentials.", ar: "عناية فاخرة واحتياجات يومية." } },
  { key: "fragrances", title: { en: "Fragrances", ar: "العطور" }, desc: { en: "Elegant scents for every occasion.", ar: "روائح أنيقة لكل مناسبة." } },
  { key: "furniture", title: { en: "Furniture", ar: "الأثاث" }, desc: { en: "Modern styles built for comfort.", ar: "تصاميم حديثة مريحة." } },
  { key: "groceries", title: { en: "Groceries", ar: "البقالة" }, desc: { en: "Quality picks for your home.", ar: "منتجات مختارة لمنزلك." } },
];

function CategoryCards() {
  const { language } = useContext(LanguagesContext);

  return (
    <section className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-slate-800">
          {language === "ar" ? "تسوق حسب الفئة" : "Shop by Category"}
        </h2>
        <p className="mt-2 text-slate-500">
          {language === "ar" ? "تشكيلة منسقة لتجربة تسوق أفضل." : "Curated categories for a premium browsing experience."}
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <motion.article
            key={category.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="rounded-2xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              {language === "ar" ? "فئة مميزة" : "Featured Category"}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-slate-800">{category.title[language]}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-500">{category.desc[language]}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default CategoryCards;
