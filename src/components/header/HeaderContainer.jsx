import React, { useContext, useEffect, useState } from 'react'
import Logo from './Logo'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LanguagesContext } from '../../context/languageContext';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

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

  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/60 bg-white/70 px-5 py-4 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Logo />
          <div className="relative lg:hidden">
            <Link to="/cart" className="text-2xl text-slate-700 transition hover:text-indigo-700">🛒</Link>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white shadow">
                {totalQuantity}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
          <div className="relative w-full lg:max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === "ar" ? "ابحث عن المنتجات..." : "Search products..."}
              className="w-full rounded-2xl border border-slate-200 bg-white/95 py-3 ps-10 pe-4 text-sm text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.08)] outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
            <span className="pointer-events-none absolute inset-y-0 inset-s-3 flex items-center text-slate-400">
              🔍
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            {navItems.map((item) => (
              <motion.div key={item.to} whileHover={{ y: -2 }}>
                <Link to={item.to} className="font-semibold text-slate-700 transition hover:text-indigo-700">
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <div className="relative hidden lg:block">
              <Link to="/cart" className="text-2xl text-slate-700 transition hover:text-indigo-700">🛒</Link>
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-3 rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white shadow">
                  {totalQuantity}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">🌐</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default HeaderContainer
