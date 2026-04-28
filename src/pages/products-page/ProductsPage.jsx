import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

function ProductsPage() {
  const navigate = useNavigate()
  const [productList, setProductList] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    const getProducts = async () => {
      const responses = await axios.get(`https://dummyjson.com/products?limit=10&skip=${page * 10}`)
      const products = responses.data.products
      setProductList(products)
    }
    getProducts()
  }, [page])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 px-10 py-8">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-800">✨ Products List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {productList.map((item) => (
          <div 
            key={item.id} 
            onClick={() => navigate(`/products/${item.id}`)}
            className="cursor-pointer bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl hover:scale-105 transition transform"
          >
            <img 
              src={item.thumbnail} 
              alt={item.title} 
              className="w-full h-48 object-cover mb-4 rounded-xl shadow-sm"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h2>
            <p className="text-pink-600 font-bold mb-2">${item.price}</p>

            <p className="text-sm text-gray-600">Brand: <span className="font-medium">{item.brand}</span></p>
            <p className="text-sm text-gray-600">Category: <span className="font-medium">{item.category}</span></p>
            <p className={`text-sm font-semibold mt-1 ${item.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {item.stock > 0 ? `In Stock: ${item.stock}` : "Out of Stock"}
            </p>
            <div className="flex items-center mt-2">
              {Array.from({ length: 5 }).map((val, i) => (
                <span 
                  key={i} 
                  className={i < Math.round(item.rating) ? "text-yellow-400 text-sm" : "text-gray-300 text-sm"}
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-xs text-gray-500">({item.rating})</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-6">
        <button 
          disabled={page === 0} 
          onClick={() => setPage(page - 1)} 
          className="px-5 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg font-semibold disabled:opacity-50 transition"
        >
          Previous
        </button>
        <span className="px-4 py-2 font-bold text-indigo-800 bg-white rounded-lg shadow">
          Page {page + 1}
        </span>
        <button 
          onClick={() => setPage(page + 1)} 
          className="px-5 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg font-semibold transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ProductsPage
