import React from 'react'
import { Link } from 'react-router'

function HomePage() {
  return (
    <div className="px-10 py-20 min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-indigo-800 mb-6">Welcome to Abdo's Store</h1>
        <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
          Discover our wide range of products with the best prices and quality. Start exploring now!
        </p>
        <Link 
          to="/products" 
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold shadow-md"
        >
          Browse Products
        </Link>
      </div>
    </div>
  )
}

export default HomePage
