import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LanguagesContext } from "../../context/languageContext";
import { Crown, Mail, Phone } from "lucide-react";

function Footer() {
  const { language } = useContext(LanguagesContext);
  const sectionVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.12, duration: 0.4 }
    }),
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-[#D4AF37]/25 bg-black"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:px-10 md:grid-cols-3">
        <motion.div custom={0} variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="flex items-center gap-2">
            <Crown size={16} className="text-[#D4AF37]" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              {language === "ar" ? "دار فيلفيت" : "Maison Velvet"}
            </p>
          </div>
          <h3 className="mt-2 text-2xl font-bold text-[#f6e7bf]">Velvet Cartel</h3>
          <p className="mt-3 text-sm leading-6 text-[#d6c59b]">
            {language === "ar" ? "متجر بريميوم" : "Premium Store"}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#d6c59b]">
            {language === "ar"
              ? "تجربة تسوق داكنة وفاخرة تجمع بين الأناقة والدقة."
              : "A sleek high-end commerce experience crafted with dark luxury aesthetics."}
          </p>
        </motion.div>

        <motion.div custom={1} variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">
            {language === "ar" ? "روابط سريعة" : "Quick Links"}
          </h4>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link to="/home" className="text-[#d6c59b] transition hover:text-[#D4AF37]">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <Link to="/products" className="text-[#d6c59b] transition hover:text-[#D4AF37]">
              {language === "ar" ? "المنتجات" : "Products"}
            </Link>
            <Link to="/contact" className="text-[#d6c59b] transition hover:text-[#D4AF37]">
              {language === "ar" ? "تواصل معنا" : "Contact"}
            </Link>
          </div>
        </motion.div>

        <motion.div custom={2} variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">
            {language === "ar" ? "التواصل" : "Contact"}
          </h4>
          <div className="mt-4 space-y-3 text-sm text-[#d6c59b]">
            <p className="flex items-center gap-2"><Mail size={14} className="text-[#D4AF37]" /> aabodawali@gmail.com</p>
            <p className="flex items-center gap-2"><Phone size={14} className="text-[#D4AF37]" /> +20 127 620 5842</p>
            {/* <p className="flex items-center gap-2"><Instagram size={14} className="text-[#D4AF37]" /> @velvetcartel</p> */}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
