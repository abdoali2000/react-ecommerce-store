import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LanguagesContext } from '../../context/languageContext'
import FeaturedSlider from './components/FeaturedSlider'
import CategoryCards from './components/CategoryCards'
import { ArrowRight } from 'lucide-react'

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
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen bg-black px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="relative h-[70vh] min-h-[440px] overflow-hidden rounded-3xl border border-[#D4AF37]/30 shadow-[0_24px_80px_rgba(0,0,0,0.8)]">
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

          <div className="absolute inset-0 bg-linear-to-r from-black/85 via-[#1a0707]/65 to-[#4a0404]/60" />

          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            key={`text-${heroSlides[activeSlide].id}`}
            className="relative z-10 flex h-full max-w-3xl flex-col justify-center px-8 text-white sm:px-14"
          >
            <motion.p variants={itemVariants} className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              {language === "ar" ? "هوية ليلية فاخرة" : "Luxury Noir Identity"}
            </motion.p>
            <motion.h1 variants={itemVariants} className="mt-5 text-4xl font-extrabold leading-tight text-[#f7e8c0] sm:text-5xl lg:text-6xl">
              {heroSlides[activeSlide].title[language]}
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-5 max-w-2xl text-base font-medium leading-7 text-[#e9d6a0] sm:text-lg">
              {heroSlides[activeSlide].subtitle[language]}
            </motion.p>
            <motion.div variants={itemVariants} whileHover={{ y: -2 }} className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/40 bg-[#4a0404] px-8 py-3.5 text-sm font-semibold text-[#f7e8c0] shadow-xl transition hover:bg-[#5c0909]"
              >
                {language === "ar" ? "تسوق الآن" : "Shop Now"}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition ${activeSlide === index ? "w-8 bg-[#D4AF37]" : "w-2.5 bg-[#f6e7bf]/50"}`}
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
