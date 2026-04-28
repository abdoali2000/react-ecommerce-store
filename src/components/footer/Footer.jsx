import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguagesContext } from "../../context/languageContext";
import { Crown, Mail, Phone } from "lucide-react";
import { useSelector } from "react-redux";

function Footer() {
  const { language } = useContext(LanguagesContext);
  const isDarkMode = useSelector((state) => state.theme.mode === "dark");
  return (
    <footer className={`border-t ${isDarkMode ? "border-[#D4AF37]/25 bg-black" : "border-[#4a0404]/20 bg-[#fffdf8]"}`}>
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:px-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Crown size={16} className={isDarkMode ? "text-[#D4AF37]" : "text-[#4a0404]"} />
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDarkMode ? "text-[#D4AF37]" : "text-[#4a0404]"}`}>
              {language === "ar" ? "دار فيلفيت" : "Maison Velvet"}
            </p>
          </div>
          <h3 className={`mt-2 text-2xl font-bold ${isDarkMode ? "text-[#f6e7bf]" : "text-[#4a0404]"}`}>Velvet Cartel</h3>
          <p className={`mt-3 text-sm leading-6 ${isDarkMode ? "text-[#d6c59b]" : "text-[#6b7280]"}`}>
            {language === "ar" ? "متجر بريميوم" : "Premium Store"}
          </p>
          <p className={`mt-2 text-sm leading-6 ${isDarkMode ? "text-[#d6c59b]" : "text-[#6b7280]"}`}>
            {language === "ar"
              ? "تجربة تسوق داكنة وفاخرة تجمع بين الأناقة والدقة."
              : "A sleek high-end commerce experience crafted with dark luxury aesthetics."}
          </p>
        </div>

        <div>
          <h4 className={`text-sm font-semibold uppercase tracking-wider ${isDarkMode ? "text-[#D4AF37]" : "text-[#4a0404]"}`}>
            {language === "ar" ? "روابط سريعة" : "Quick Links"}
          </h4>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link to="/home" className={`transition ${isDarkMode ? "text-[#d6c59b] hover:text-[#D4AF37]" : "text-[#6b7280] hover:text-[#4a0404]"}`}>
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <Link to="/products" className={`transition ${isDarkMode ? "text-[#d6c59b] hover:text-[#D4AF37]" : "text-[#6b7280] hover:text-[#4a0404]"}`}>
              {language === "ar" ? "المنتجات" : "Products"}
            </Link>
            <Link to="/contact" className={`transition ${isDarkMode ? "text-[#d6c59b] hover:text-[#D4AF37]" : "text-[#6b7280] hover:text-[#4a0404]"}`}>
              {language === "ar" ? "تواصل معنا" : "Contact"}
            </Link>
          </div>
        </div>

        <div>
          <h4 className={`text-sm font-semibold uppercase tracking-wider ${isDarkMode ? "text-[#D4AF37]" : "text-[#4a0404]"}`}>
            {language === "ar" ? "التواصل" : "Contact"}
          </h4>
          <div className={`mt-4 space-y-3 text-sm ${isDarkMode ? "text-[#d6c59b]" : "text-[#6b7280]"}`}>
            <p className="flex items-center gap-2"><Mail size={14} className={isDarkMode ? "text-[#D4AF37]" : "text-[#4a0404]"} /> aabodawali@gmail.com</p>
            <p className="flex items-center gap-2"><Phone size={14} className={isDarkMode ? "text-[#D4AF37]" : "text-[#4a0404]"} /> +20 127 620 5842</p>
            {/* <p className="flex items-center gap-2"><Instagram size={14} className="text-[#D4AF37]" /> @velvetcartel</p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
