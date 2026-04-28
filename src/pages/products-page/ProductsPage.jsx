import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/reducers/cartSlice'
import { LanguagesContext } from '../../context/languageContext'
import { motion } from 'framer-motion'
import { ShoppingBag, Star } from 'lucide-react'

const SKELETON_COUNT = 8;

function ProductsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { language } = useContext(LanguagesContext)
  const [productList, setProductList] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const searchTerm = searchParams.get("search")?.trim() || ""
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  }

  useEffect(() => {
    setPage(0)
  }, [searchTerm])

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true)
      try {
        const endpoint = searchTerm
          ? `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}&limit=10&skip=${page * 10}`
          : `https://dummyjson.com/products?limit=10&skip=${page * 10}`
        const responses = await axios.get(endpoint)
        const products = responses.data.products
        setProductList(products)
      } catch {
        setProductList([])
      } finally {
        setIsLoading(false)
      }
    }
    getProducts()
  }, [page, searchTerm])

  return (
    <div className="min-h-screen px-6 py-8 sm:px-10" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      <div className="mx-auto max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{ color: "var(--text-color)" }}
          className="mb-2 text-center text-4xl font-extrabold tracking-tight"
        >
          {language === "ar" ? "قائمة المنتجات" : "Products"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          style={{ color: "var(--text-secondary)" }}
          className="mb-10 text-center text-sm"
        >
          {searchTerm
            ? (language === "ar" ? `نتائج البحث عن: ${searchTerm}` : `Search results for: ${searchTerm}`)
            : (language === "ar" ? "اكتشف أحدث منتجاتنا" : "Discover our latest products")}
        </motion.p>

        {isLoading ? (
          <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="rounded-2xl border p-5 animate-pulse"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)", boxShadow: "0 18px 45px var(--card-shadow)" }}
              >
                <div className="mb-4 h-48 w-full rounded-xl bg-slate-200 dark:bg-[#1a1a1a]" />
                <div className="mb-3 h-5 rounded bg-slate-200 dark:bg-[#1a1a1a]" />
                <div className="mb-4 h-4 w-1/2 rounded bg-slate-200 dark:bg-[#1a1a1a]" />
                <div className="mb-2 h-3 rounded bg-slate-200 dark:bg-[#1a1a1a]" />
                <div className="mb-2 h-3 w-5/6 rounded bg-slate-200 dark:bg-[#1a1a1a]" />
                <div className="h-9 w-full rounded-lg bg-slate-200 dark:bg-[#1a1a1a]" />
              </div>
            ))}
          </div>
        ) : productList.length === 0 ? (
          <div className="mb-10 rounded-2xl border p-10 text-center shadow-sm" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
            <h2 style={{ color: "var(--text-color)" }} className="text-xl font-semibold">
              {language === "ar" ? "لا توجد منتجات" : "No products found"}
            </h2>
            <p style={{ color: "var(--text-secondary)" }} className="mt-2">
              {language === "ar"
                ? "جرّب البحث بكلمات مختلفة أو حاول لاحقًا."
                : "Try a different keyword or check back in a moment."}
            </p>
          </div>
        ) : (
          <motion.div variants={listVariants} initial="hidden" animate="visible" className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productList.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => navigate(`/products/${item.id}`)}
                variants={cardVariants}
                whileHover={{ scale: 1.025, y: -4 }}
                className="group cursor-pointer rounded-2xl border p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)", boxShadow: "0 18px 45px var(--card-shadow)" }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="mb-4 h-48 w-full rounded-xl object-cover"
                />
                <h2 style={{ color: "var(--text-color)" }} className="mb-1 line-clamp-1 text-lg font-semibold">{item.title}</h2>
                <p className="mb-3 text-base font-bold text-[#6b0b0b] dark:text-[#D4AF37]">${item.price}</p>

                <p style={{ color: "var(--text-secondary)" }} className="text-sm">
                  {language === "ar" ? "الماركة" : "Brand"}: <span style={{ color: "var(--text-color)" }} className="font-medium">{item.brand}</span>
                </p>
                <p style={{ color: "var(--text-secondary)" }} className="text-sm">
                  {language === "ar" ? "الفئة" : "Category"}: <span style={{ color: "var(--text-color)" }} className="font-medium">{item.category}</span>
                </p>
                <p className={`mt-1 text-sm font-semibold ${item.stock > 0 ? "text-emerald-700 dark:text-[#D4AF37]" : "text-rose-600"}`}>
                  {item.stock > 0
                    ? (language === "ar" ? `متوفر: ${item.stock}` : `In Stock: ${item.stock}`)
                    : (language === "ar" ? "غير متوفر" : "Out of Stock")}
                </p>

                <div className="mt-2 flex items-center">
                  {Array.from({ length: 5 }).map((val, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.round(item.rating) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-slate-300 dark:text-slate-700"}
                    />
                  ))}
                  <span className="ml-2 text-xs text-slate-500 dark:text-[#d6c59b]">({item.rating})</span>
                </div>

                <motion.button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    dispatch(addToCart(item))
                  }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#6b0b0b]/30 bg-[#6b0b0b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7b1111] dark:border-[#D4AF37]/30 dark:bg-[#4a0404] dark:text-[#f6e7bf] dark:hover:bg-[#5b0c0c]"
                >
                  <ShoppingBag size={15} />
                  {language === "ar" ? "إضافة سريعة للسلة" : "Quick Add to Cart"}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-center gap-6"
        >
          <motion.button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg border px-5 py-2 font-semibold transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)", color: "var(--text-color)" }}
          >
            {language === "ar" ? "السابق" : "Previous"}
          </motion.button>
          <span className="rounded-lg border px-4 py-2 font-bold" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)", color: "var(--text-color)" }}>
            {language === "ar" ? `صفحة ${page + 1}` : `Page ${page + 1}`}
          </span>
          <motion.button
            onClick={() => setPage(page + 1)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg border px-5 py-2 font-semibold transition hover:opacity-80"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)", color: "var(--text-color)" }}
          >
            {language === "ar" ? "التالي" : "Next"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductsPage
