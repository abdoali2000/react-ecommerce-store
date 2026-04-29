import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'

function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-3">
      <motion.div
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/60 bg-[#120707]/80 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
      >
        <Crown size={20} className="text-[#D4AF37]" />
      </motion.div>
      <div className="hidden sm:block">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">Maison</p>
        <p className="text-base font-bold text-[#f6e7bf]">Velvet Cartel</p>
      </div>
    </Link>
  )
}

export default Logo
