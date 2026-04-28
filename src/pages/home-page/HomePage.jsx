import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LanguagesContext } from '../../context/languageContext'
import FeaturedSlider from './components/FeaturedSlider'
import CategoryCards from './components/CategoryCards'

function HomePage() {
  const { language } = useContext(LanguagesContext)

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-indigo-50 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-8 rounded-3xl border border-white/70 bg-white/60 p-8 shadow-[0_25px_60px_rgba(15,23,42,0.1)] backdrop-blur-xl md:grid-cols-2 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
              {language === "ar" ? "تجربة تسوق فاخرة" : "Luxury Shopping Experience"}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              {language === "ar" ? "اختيارات مميزة بتصميم عصري يواكب ذوقك" : "Premium picks crafted for modern lifestyle"}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              {language === "ar"
                ? "اكتشف منتجات مختارة بعناية مع تجربة تصفح سلسة، بحث ذكي، وواجهة أنيقة."
                : "Discover hand-picked products with elegant visuals, smooth browsing, and a polished premium interface."}
            </p>
            <motion.div whileHover={{ y: -2 }} className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700"
              >
                {language === "ar" ? "تسوق الآن" : "Shop Now"}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
            className="relative overflow-hidden rounded-3xl border border-white/70 bg-linear-to-br from-indigo-500 via-indigo-400 to-slate-700 p-8 text-white"
          >
            <motion.div
              animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -inset-e-10 h-40 w-40 rounded-full bg-white/25 blur-2xl"
            />
            <motion.div
              animate={{ y: [0, 12, 0], x: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-12 -inset-s-6 h-44 w-44 rounded-full bg-indigo-200/35 blur-2xl"
            />
            <div className="relative z-10">
              <p className="text-sm font-medium text-indigo-100">
                {language === "ar" ? "منطقة صورة/أنيميشن" : "Image / Motion Placeholder"}
              </p>
              <h2 className="mt-3 text-2xl font-bold">
                {language === "ar" ? "مستوى جديد من واجهات التجارة الإلكترونية" : "A cinematic hero space for your brand"}
              </h2>
              <p className="mt-4 text-sm leading-6 text-indigo-100/95">
                {language === "ar"
                  ? "يمكن استبدال هذه المنطقة بصورة عالية الجودة أو أنيميشن مخصص باستخدام Framer Motion."
                  : "Replace this area with a high-quality campaign image or a custom Framer Motion abstract animation."}
              </p>
            </div>
          </motion.div>
        </section>

        <FeaturedSlider />
        <CategoryCards />
      </div>
    </div>
  )
}

export default HomePage
