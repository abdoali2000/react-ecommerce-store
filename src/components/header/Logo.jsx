import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Logo() {
  return (
    <Link to="/home" className="inline-flex items-center gap-3">
      <motion.div
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-200/80 bg-white/80 shadow-sm"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
          alt="Store Logo"
          className="h-7 w-7 object-contain"
        />
      </motion.div>
      <div className="hidden sm:block">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-600">Premium</p>
        <p className="text-base font-bold text-slate-800">Abdo Store</p>
      </div>
    </Link>
  )
}

export default Logo
