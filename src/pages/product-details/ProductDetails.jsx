import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducers/cartSlice";

function ProductDetails() {
  const { product_id } = useParams()
  const [product, setProduct] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    const getProductByID = async () => {
      const response = await axios.get(`https://dummyjson.com/products/${product_id}`)
      setProduct(response.data)
    }
    getProductByID()
  }, [product_id])

  if (!product) return <div className="p-10 text-center text-indigo-700 text-xl">Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 p-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 flex flex-col md:flex-row gap-10">
        
        <div className="flex-1">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full rounded-xl shadow-md mb-6"
          />
          <div className="flex gap-3 flex-wrap">
            {product.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt="" 
                className="w-20 h-20 object-cover rounded-lg border shadow-sm hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-extrabold text-indigo-800">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-2xl font-bold text-pink-600">${product.price}</p>
          <p className="text-sm text-gray-600">Stock: {product.stock}</p>

          <div className="flex items-center">
            {Array.from({ length: 5 }).map((val, i) => (
              <span 
                key={i} 
                className={i < Math.round(product.rating) ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}
              >
                ★
              </span> 
            ))}
            <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
          </div>

          <button 
            onClick={() => dispatch(addToCart(product))}
            className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
