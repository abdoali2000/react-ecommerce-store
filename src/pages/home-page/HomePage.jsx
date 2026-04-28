import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LanguagesContext } from '../../context/languageContext'
import FeaturedSlider from './components/FeaturedSlider'
import CategoryCards from './components/CategoryCards'

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1800&q=80",
    title: {
      en: "Elevate Your Style With Premium Collections",
      ar: "ارتق بذوقك مع مجموعات فاخرة",
    },
    subtitle: {
      en: "Curated fashion and tech picks designed for a modern lifestyle.",
      ar: "مختارات أزياء وتقنية مصممة لأسلوب حياة عصري.",
    },
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1800&q=80",
    title: {
      en: "Luxury Tech Essentials That Perform Beautifully",
      ar: "أساسيات تقنية فاخرة بأداء استثنائي",
    },
    subtitle: {
      en: "Shop high-end products with clean design and trusted quality.",
      ar: "تسوق منتجات عالية الجودة بتصميم أنيق وموثوق.",
    },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=80",
    title: {
      en: "From Trend To Timeless, Built For You",
      ar: "من الصيحات إلى الكلاسيكيات، كل ما يلائمك",
    },
    subtitle: {
      en: "Discover statement products crafted for confidence and comfort.",
      ar: "اكتشف منتجات مميزة تجمع بين الثقة والراحة.",
    },
  },
];

function HomePage() {
  const { language } = useContext(LanguagesContext)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-indigo-50 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="relative h-[68vh] min-h-[420px] overflow-hidden rounded-3xl border border-slate-200 shadow-[0_30px_70px_rgba(15,23,42,0.2)]">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroSlides[activeSlide].id}
              src={heroSlides[activeSlide].image}
              alt="Hero banner"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.03, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-linear-to-r from-slate-950/75 via-slate-900/45 to-indigo-900/30" />

          <motion.div
            key={`text-${heroSlides[activeSlide].id}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex h-full max-w-3xl flex-col justify-center px-8 text-white sm:px-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
              {language === "ar" ? "وجهة التسوق الفاخر" : "Premium Shopping Destination"}
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              {heroSlides[activeSlide].title[language]}
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-100 sm:text-lg">
              {heroSlides[activeSlide].subtitle[language]}
            </p>
            <motion.div whileHover={{ y: -2 }} className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl transition hover:bg-indigo-700"
              >
                {language === "ar" ? "تسوق الآن" : "Shop Now"}
              </Link>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition ${activeSlide === index ? "w-8 bg-white" : "w-2.5 bg-white/60"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <FeaturedSlider />
        <CategoryCards />
      </div>
    </div>
  )
}

export default HomePage
