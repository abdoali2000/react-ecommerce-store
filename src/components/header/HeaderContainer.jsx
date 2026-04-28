import React, { useContext } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { LanguagesContext } from '../../context/languageContext';
import { useSelector } from 'react-redux';

function HeaderContainer() {
  const { language, setLanguage } = useContext(LanguagesContext);
  const items = useSelector(state => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-indigo-100 to-pink-100 shadow-md">
      <Logo />
      <div className="flex gap-8 items-center">
        <Link to="/home" className="hover:text-indigo-700 font-semibold">Home</Link>
        <Link to="/products" className="hover:text-indigo-700 font-semibold">Products</Link>
        <Link to="/contact" className="hover:text-indigo-700 font-semibold">Contact Us</Link>
        
        <div className="relative">
          <Link to="/cart" className="text-2xl hover:text-indigo-700">🛒</Link>
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              {totalQuantity}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600">🌐</span>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)} 
            className="border border-gray-300 rounded px-3 py-1 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
      </div>
    </nav>
  )
}

export default HeaderContainer
