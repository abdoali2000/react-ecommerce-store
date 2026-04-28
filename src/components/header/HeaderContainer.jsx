import React, { useContext, useEffect, useState } from 'react'
import Logo from './Logo'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LanguagesContext } from '../../context/languageContext';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Globe, Moon, Search, ShoppingBag, Sun } from 'lucide-react';
import { toggleTheme } from '../../redux/reducers/themeSlice';

function HeaderContainer() {
  const { language, setLanguage } = useContext(LanguagesContext);
  const items = useSelector(state => state.cart.items);
  const themeMode = useSelector((state) => state.theme.mode);
  const isDarkMode = themeMode === "dark";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(() => {
    const query = new URLSearchParams(location.search).get("search");
    return query || "";
  });
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search");
    setSearchTerm(query || "");
  }, [location.search]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();
      const trimmedValue = searchTerm.trim();
      const isProductsPage = location.pathname === "/products";

      if (!trimmedValue && !isProductsPage) {
        return;
      }

      if (trimmedValue) {
        params.set("search", trimmedValue);
      }

      navigate(
        {
          pathname: "/products",
          search: params.toString() ? `?${params.toString()}` : "",
        },
        { replace: true }
      );
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, location.pathname, navigate]);

  const navItems = [
    { label: language === "ar" ? "الرئيسية" : "Home", to: "/home" },
    { label: language === "ar" ? "المنتجات" : "Products", to: "/products" },
    { label: language === "ar" ? "تواصل معنا" : "Contact", to: "/contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.08 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 px-5 py-4 sm:px-8"
    >
      <div className={`mx-auto flex w-full max-w-7xl flex-col gap-4 rounded-2xl px-4 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between ${isDarkMode ? "border border-[#D4AF37]/30 bg-[#120707]/55" : "border border-[#4a0404]/20 bg-white/80"}`}>
        <motion.div variants={itemVariants} className="flex items-center justify-between gap-4">
          <Logo />
          <div className="relative lg:hidden">
            <Link to="/cart" className={`transition ${isDarkMode ? "text-[#d7b252] hover:text-[#f5d978]" : "text-[#4a0404] hover:text-[#6b0b0b]"}`}>
              <ShoppingBag size={24} />
            </Link>
            {totalQuantity > 0 && (
              <span className={`absolute -top-2 -right-3 rounded-full px-2 py-0.5 text-xs font-bold shadow ${isDarkMode ? "bg-[#4a0404] text-[#f6e7bf]" : "bg-[#4a0404] text-white"}`}>
                {totalQuantity}
              </span>
            )}
          </div>
        </motion.div>

        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
          <motion.div variants={itemVariants} className="relative w-full lg:max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === "ar" ? "ابحث عن المنتجات..." : "Search products..."}
              className={`w-full rounded-2xl py-3 ps-10 pe-4 text-sm outline-none transition focus:ring-2 ${isDarkMode ? "border border-[#D4AF37]/35 bg-black/60 text-[#f6e7bf] shadow-[0_0_0_1px_rgba(212,175,55,0.12)] focus:border-[#D4AF37] focus:ring-[#D4AF37]/25" : "border border-[#4a0404]/20 bg-white text-[#374151] shadow-[0_0_0_1px_rgba(74,4,4,0.08)] focus:border-[#4a0404] focus:ring-[#4a0404]/20"}`}
            />
            <span className={`pointer-events-none absolute inset-y-0 inset-s-3 flex items-center ${isDarkMode ? "text-[#d7b252]" : "text-[#4a0404]"}`}>
              <Search size={16} />
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5">
            {navItems.map((item) => (
              <motion.div key={item.to} whileHover={{ y: -2 }}>
                <Link to={item.to} className={`font-semibold transition ${isDarkMode ? "text-[#e9d6a0] hover:text-[#D4AF37]" : "text-[#4a0404] hover:text-[#6b0b0b]"}`}>
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <div className="relative hidden lg:block">
              <Link to="/cart" className={`transition ${isDarkMode ? "text-[#d7b252] hover:text-[#f5d978]" : "text-[#4a0404] hover:text-[#6b0b0b]"}`}>
                <ShoppingBag size={24} />
              </Link>
              {totalQuantity > 0 && (
                <span className={`absolute -top-2 -right-3 rounded-full px-2 py-0.5 text-xs font-bold shadow ${isDarkMode ? "bg-[#4a0404] text-[#f6e7bf]" : "bg-[#4a0404] text-white"}`}>
                  {totalQuantity}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${isDarkMode ? "border border-[#D4AF37]/35 bg-black/60 text-[#f6e7bf] hover:bg-[#1a0808]" : "border border-[#4a0404]/20 bg-white text-[#4a0404] hover:bg-[#f9f4f4]"}`}
            >
              {isDarkMode ? <Sun size={15} className="text-[#D4AF37]" /> : <Moon size={15} className="text-[#4a0404]" />}
              {isDarkMode ? (language === "ar" ? "الوضع الفاتح" : "Light") : (language === "ar" ? "الوضع الداكن" : "Dark")}
            </button>

            <div className="flex items-center gap-2">
              <Globe size={16} className={isDarkMode ? "text-[#d7b252]" : "text-[#4a0404]"} />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`rounded-lg px-3 py-1 shadow-sm focus:outline-none focus:ring-2 ${isDarkMode ? "border border-[#D4AF37]/35 bg-black/70 text-[#f6e7bf] focus:ring-[#D4AF37]/30" : "border border-[#4a0404]/20 bg-white text-[#4a0404] focus:ring-[#4a0404]/20"}`}
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}

export default HeaderContainer
