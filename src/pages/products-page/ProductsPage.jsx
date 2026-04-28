import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/reducers/cartSlice'
import { LanguagesContext } from '../../context/languageContext'
import { motion } from 'framer-motion'

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
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-indigo-50 px-6 py-8 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-2 text-center text-4xl font-extrabold tracking-tight text-slate-800"
        >
          {language === "ar" ? "قائمة المنتجات" : "Products"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mb-10 text-center text-sm text-slate-500"
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
                className="rounded-2xl border border-white/70 bg-white/70 p-5 animate-pulse shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-md"
              >
                <div className="mb-4 h-48 w-full rounded-xl bg-slate-200" />
                <div className="mb-3 h-5 rounded bg-slate-200" />
                <div className="mb-4 h-4 w-1/2 rounded bg-slate-200" />
                <div className="mb-2 h-3 rounded bg-slate-200" />
                <div className="mb-2 h-3 w-5/6 rounded bg-slate-200" />
                <div className="h-9 w-full rounded-lg bg-slate-200" />
              </div>
            ))}
          </div>
        ) : productList.length === 0 ? (
          <div className="mb-10 rounded-2xl border border-slate-200 bg-white/80 p-10 text-center shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-slate-800">
              {language === "ar" ? "لا توجد منتجات" : "No products found"}
            </h2>
            <p className="mt-2 text-slate-500">
              {language === "ar"
                ? "جرّب البحث بكلمات مختلفة أو حاول لاحقًا."
                : "Try a different keyword or check back in a moment."}
            </p>
          </div>
        ) : (
          <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productList.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => navigate(`/products/${item.id}`)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                whileHover={{ scale: 1.025, y: -4 }}
                className="group cursor-pointer rounded-2xl border border-white/70 bg-white/70 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.09)] backdrop-blur-md transition"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="mb-4 h-48 w-full rounded-xl object-cover"
                />
                <h2 className="mb-1 line-clamp-1 text-lg font-semibold text-slate-800">{item.title}</h2>
                <p className="mb-3 text-base font-bold text-indigo-700">${item.price}</p>

                <p className="text-sm text-slate-500">
                  {language === "ar" ? "الماركة" : "Brand"}: <span className="font-medium text-slate-700">{item.brand}</span>
                </p>
                <p className="text-sm text-slate-500">
                  {language === "ar" ? "الفئة" : "Category"}: <span className="font-medium text-slate-700">{item.category}</span>
                </p>
                <p className={`mt-1 text-sm font-semibold ${item.stock > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {item.stock > 0
                    ? (language === "ar" ? `متوفر: ${item.stock}` : `In Stock: ${item.stock}`)
                    : (language === "ar" ? "غير متوفر" : "Out of Stock")}
                </p>

                <div className="mt-2 flex items-center">
                  {Array.from({ length: 5 }).map((val, i) => (
                    <span
                      key={i}
                      className={i < Math.round(item.rating) ? "text-sm text-amber-400" : "text-sm text-slate-300"}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-xs text-slate-500">({item.rating})</span>
                </div>

                <motion.button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    dispatch(addToCart(item))
                  }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  {language === "ar" ? "إضافة سريعة للسلة" : "Quick Add to Cart"}
                </motion.button>
              </motion.div>
            ))}
          </div>
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
            className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {language === "ar" ? "السابق" : "Previous"}
          </motion.button>
          <span className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-bold text-slate-700">
            {language === "ar" ? `صفحة ${page + 1}` : `Page ${page + 1}`}
          </span>
          <motion.button
            onClick={() => setPage(page + 1)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
          >
            {language === "ar" ? "التالي" : "Next"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductsPage
