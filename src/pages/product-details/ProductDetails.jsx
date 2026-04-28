import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducers/cartSlice";
import { motion } from "framer-motion";
import { ShoppingBag, Star, PackageCheck } from "lucide-react";

function ProductDetails() {
  const { product_id } = useParams()
  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState("")
  const dispatch = useDispatch();

  useEffect(() => {
    const getProductByID = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${product_id}`)
        setProduct(response.data)
        setActiveImage(response.data.thumbnail)
      } catch {
        setProduct(null)
      }
    }
    getProductByID()
  }, [product_id])

  if (!product) return <div className="p-10 text-center text-[#D4AF37] text-xl">Loading...</div>

  return (
    <div className="min-h-screen bg-black px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 rounded-3xl border border-[#D4AF37]/25 bg-[#120707]/75 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl md:flex-row md:p-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex-1"
        >
          <img
            src={activeImage || product.thumbnail}
            alt={product.title}
            className="mb-6 h-[420px] w-full rounded-2xl border border-[#D4AF37]/25 object-cover shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
          />
          <div className="flex flex-wrap gap-3">
            {[product.thumbnail, ...product.images].slice(0, 6).map((img, index) => (
              <button
                key={`${img}-${index}`}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`overflow-hidden rounded-lg border transition ${activeImage === img ? "border-[#D4AF37]" : "border-[#D4AF37]/20 hover:border-[#D4AF37]/55"}`}
              >
                <img
                  src={img}
                  alt={`${product.title}-${index}`}
                  className="h-20 w-20 object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
          className="flex-1 space-y-5"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">{product.category}</p>
          <h1 className="text-4xl font-extrabold leading-tight text-[#f6e7bf]">{product.title}</h1>
          <p className="text-base leading-7 text-[#d6c59b]">{product.description}</p>
          <p className="text-4xl font-extrabold text-[#D4AF37]">${product.price}</p>

          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className={i < Math.round(product.rating) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#5d4444]"}
              />
            ))}
            <span className="ml-2 text-sm text-[#d6c59b]">({product.rating})</span>
          </div>

          <p className="flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
            <PackageCheck size={16} />
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
          </p>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/35 bg-[#4a0404] px-8 py-4 text-lg font-bold text-[#f6e7bf] shadow-[0_12px_30px_rgba(74,4,4,0.6)] transition hover:bg-[#5d0d0d]"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetails
