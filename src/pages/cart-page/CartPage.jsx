import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../../redux/reducers/cartSlice";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

function CartPage() {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

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
    <div className="min-h-screen p-6 sm:p-10" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ color: "var(--text-color)" }}
        className="mb-10 flex items-center justify-center gap-3 text-center text-4xl font-extrabold"
      >
        <ShoppingBag className="text-[#6b0b0b] dark:text-[#D4AF37]" />
        Shopping Cart
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="rounded-2xl border p-6 shadow-2xl"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        {items.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }} className="text-center text-lg">Your cart is empty</p>
        ) : (
          <motion.div variants={listVariants} initial="hidden" animate="visible">
            {items.map(item => (
              <motion.div
                variants={itemVariants}
                key={item.id}
                className="flex flex-col gap-5 border-b py-6 last:border-b-0 md:flex-row md:items-center"
                style={{ borderColor: "var(--card-border)" }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-24 w-24 rounded-xl border object-cover shadow-md"
                  style={{ borderColor: "var(--card-border)" }}
                />
                <div className="flex-1">
                  <h2 style={{ color: "var(--text-color)" }} className="text-xl font-semibold">{item.title}</h2>
                  <p className="font-medium text-[#6b0b0b] dark:text-[#D4AF37]">${item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="rounded-md border bg-white px-3 py-2 transition hover:bg-slate-100 dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:text-[#f6e7bf] dark:hover:bg-[#1a1a1a]"
                    style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
                  >

                    <Minus size={14} />
                  </button>
                  <span className="rounded-md border px-4 py-1 font-semibold"
                    style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)", color: "var(--text-color)" }}
                  >{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="rounded-md border px-3 py-2 transition hover:opacity-80"
                    style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
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
                  Remove
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
        style={{ color: "var(--text-color)" }}
        className="mt-10 text-right text-2xl font-bold"
      >
        Total: ${total.toFixed(2)}
      </motion.div>
    </div>
  )
}

export default CartPage;
