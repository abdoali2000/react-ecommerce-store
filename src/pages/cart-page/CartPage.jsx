import { useContext } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../../redux/reducers/cartSlice";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { LanguagesContext } from "../../context/languageContext"; 

function CartPage() {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  
  const { language } = useContext(LanguagesContext);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-white dark:bg-[#000000]">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 flex items-center justify-center gap-3 text-center text-4xl font-extrabold text-slate-900 dark:text-[#f6e7bf]"
      >
        <ShoppingBag className="text-[#6b0b0b] dark:text-[#D4AF37]" />
        {language === "ar" ? "سلة التسوق" : "Shopping Cart"}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="rounded-2xl border border-slate-200 dark:border-[#D4AF37]/20 p-6 shadow-2xl bg-white dark:bg-[#0a0a0a]"
      >
        {items.length === 0 ? (
          <p className="text-center text-lg text-slate-600 dark:text-[#d6c59b]">
            {language === "ar" ? "سلة التسوق فارغة" : "Your cart is empty"}
          </p>
        ) : (
          <motion.div variants={listVariants} initial="hidden" animate="visible">
            {items.map(item => (
              <motion.div
                variants={itemVariants}
                key={item.id}
                className="flex flex-col gap-5 border-b border-slate-200 dark:border-[#D4AF37]/20 py-6 last:border-b-0 md:flex-row md:items-center"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-24 w-24 rounded-xl border border-slate-200 dark:border-[#D4AF37]/20 object-cover shadow-md"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-[#f6e7bf]">{item.title}</h2>
                  <p className="font-medium text-[#6b0b0b] dark:text-[#D4AF37]">
                    ${item.price}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="rounded-md border border-slate-200 dark:border-[#D4AF37]/20 bg-white dark:bg-[#0a0a0a] px-3 py-2 transition text-slate-900 dark:text-[#f6e7bf] hover:bg-slate-100 dark:hover:bg-[#1a1a1a]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="rounded-md border border-slate-200 dark:border-[#D4AF37]/20 bg-white dark:bg-[#0a0a0a] px-4 py-1 font-semibold text-slate-900 dark:text-[#f6e7bf]">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="rounded-md border border-slate-200 dark:border-[#D4AF37]/20 bg-white dark:bg-[#0a0a0a] px-3 py-2 transition text-slate-900 dark:text-[#f6e7bf] hover:opacity-80"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 font-semibold text-white shadow transition hover:opacity-90 dark:border-[#D4AF37]/30 dark:bg-[#4a0404] dark:text-[#f6e7bf] dark:hover:bg-[#5d0d0d]"
                  style={{ borderColor: "#6b0b0b30", backgroundColor: "#6b0b0b" }}
                >
                  <Trash2 size={15} />
                  {language === "ar" ? "حذف" : "Remove"}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className={`mt-10 text-2xl font-bold text-slate-900 dark:text-[#f6e7bf] ${language === "ar" ? "text-left" : "text-right"}`}
      >
        {language === "ar" ? "الإجمالي: " : "Total: "}
        ${total.toFixed(2)}
      </motion.div>
    </div>
  )
}

export default CartPage;