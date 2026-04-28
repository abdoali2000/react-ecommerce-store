import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LanguagesContext } from "../../../context/languageContext";
import axios from "axios";
import { Gem } from "lucide-react";

const productTag = {
  en: "Featured",
  ar: "مميز",
};

function FeaturedSlider() {
  const { language } = useContext(LanguagesContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFeaturedProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://dummyjson.com/products?limit=8");
        setFeaturedProducts(response.data.products || []);
      } catch {
        setFeaturedProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getFeaturedProducts();
  }, []);

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
          <h2 className="text-3xl font-bold text-slate-900 dark:text-[#f6e7bf]">{language === "ar" ? "منتجات مميزة" : "Featured Products"}</h2>
          <p className="mt-2 text-slate-600 dark:text-[#d6c59b]">
            {language === "ar" ? "اسحب لاكتشاف مختاراتنا المفضلة." : "Drag to explore our hand-picked collection."}
          </p>
        </div>
        <Link to="/products" className="text-sm font-semibold text-[#6b0b0b] transition hover:text-[#7b1111] dark:text-[#D4AF37] dark:hover:text-[#f5d978]">
          {language === "ar" ? "عرض الكل" : "View All"}
        </Link>
      </motion.div>

      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`featured-skeleton-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 animate-pulse dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a]">
              <div className="h-44 rounded-xl bg-slate-200 dark:bg-[#1a1a1a]" />
              <div className="mt-4 h-4 w-2/5 rounded bg-slate-200 dark:bg-[#1a1a1a]" />
              <div className="mt-3 h-5 rounded bg-slate-200 dark:bg-[#1a1a1a]" />
              <div className="mt-3 h-4 w-1/3 rounded bg-slate-200 dark:bg-[#1a1a1a]" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div drag="x" dragConstraints={{ left: -320, right: 0 }} className="cursor-grab active:cursor-grabbing">
          <div className="grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-5 overflow-x-auto pb-3">
            {featuredProducts.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  loading="eager"
                  className="h-44 w-full rounded-xl object-cover"
                />
                <p className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6b0b0b] dark:text-[#D4AF37]">
                  <Gem size={12} />
                  {productTag[language]}
                </p>
                <h3 className="mt-2 line-clamp-1 text-lg font-bold text-slate-900 dark:text-[#f6e7bf]">{item.title}</h3>
                <p className="mt-2 text-base font-bold text-[#6b0b0b] dark:text-[#D4AF37]">${item.price}</p>
                <Link
                  to={`/products/${item.id}`}
                  className="mt-5 inline-flex rounded-lg border border-[#6b0b0b]/30 bg-[#6b0b0b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7b1111] dark:border-[#D4AF37]/30 dark:bg-[#4a0404] dark:text-[#f6e7bf] dark:hover:bg-[#5b0c0c]"
                >
                  {language === "ar" ? "عرض المنتج" : "View Product"}
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default FeaturedSlider;
