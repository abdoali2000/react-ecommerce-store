import React, { useContext, useEffect, useState } from 'react'
import Logo from './Logo'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LanguagesContext } from '../../context/languageContext';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Globe, Search, ShoppingBag } from 'lucide-react';

function HeaderContainer() {
  const { language, setLanguage } = useContext(LanguagesContext);
  const items = useSelector(state => state.cart.items);
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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 rounded-2xl border border-[#D4AF37]/30 bg-[#120707]/55 px-4 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
        <motion.div variants={itemVariants} className="flex items-center justify-between gap-4">
          <Logo />
          <div className="relative lg:hidden">
            <Link to="/cart" className="text-[#d7b252] transition hover:text-[#f5d978]">
              <ShoppingBag size={24} />
            </Link>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 rounded-full bg-[#4a0404] px-2 py-0.5 text-xs font-bold text-[#f6e7bf] shadow">
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
              className="w-full rounded-2xl border border-[#D4AF37]/35 bg-black/60 py-3 ps-10 pe-4 text-sm text-[#f6e7bf] shadow-[0_0_0_1px_rgba(212,175,55,0.12)] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25"
            />
            <span className="pointer-events-none absolute inset-y-0 inset-s-3 flex items-center text-[#d7b252]">
              <Search size={16} />
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5">
            {navItems.map((item) => (
              <motion.div key={item.to} whileHover={{ y: -2 }}>
                <Link to={item.to} className="font-semibold text-[#e9d6a0] transition hover:text-[#D4AF37]">
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <div className="relative hidden lg:block">
              <Link to="/cart" className="text-[#d7b252] transition hover:text-[#f5d978]">
                <ShoppingBag size={24} />
              </Link>
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-3 rounded-full bg-[#4a0404] px-2 py-0.5 text-xs font-bold text-[#f6e7bf] shadow">
                  {totalQuantity}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Globe size={16} className="text-[#d7b252]" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-lg border border-[#D4AF37]/35 bg-black/70 px-3 py-1 text-[#f6e7bf] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30"
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
