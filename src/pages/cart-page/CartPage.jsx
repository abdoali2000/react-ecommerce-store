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
    <div className="min-h-screen bg-black p-6 sm:p-10">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 flex items-center justify-center gap-3 text-center text-4xl font-extrabold text-[#f6e7bf]"
      >
        <ShoppingBag className="text-[#D4AF37]" />
        Shopping Cart
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="rounded-2xl border border-[#D4AF37]/25 bg-[#120707]/70 p-6 shadow-2xl"
      >
        {items.length === 0 ? (
          <p className="text-center text-lg text-[#d6c59b]">Your cart is empty</p>
        ) : (
          <motion.div variants={listVariants} initial="hidden" animate="visible">
            {items.map(item => (
              <motion.div
                variants={itemVariants}
                key={item.id}
                className="flex flex-col gap-5 border-b border-[#D4AF37]/20 py-6 last:border-b-0 md:flex-row md:items-center"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-24 w-24 rounded-xl border border-[#D4AF37]/30 object-cover shadow-md"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-[#f6e7bf]">{item.title}</h2>
                  <p className="font-medium text-[#D4AF37]">${item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="rounded-md border border-[#D4AF37]/30 bg-black/60 px-3 py-2 text-[#f6e7bf] transition hover:bg-[#1d0a0a]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="rounded-md border border-[#D4AF37]/30 bg-black/60 px-4 py-1 font-semibold text-[#f6e7bf]">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="rounded-md border border-[#D4AF37]/30 bg-black/60 px-3 py-2 text-[#f6e7bf] transition hover:bg-[#1d0a0a]"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/30 bg-[#4a0404] px-4 py-2 font-semibold text-[#f6e7bf] shadow transition hover:bg-[#5d0d0d]"
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
        className="mt-10 text-right text-2xl font-bold text-[#f6e7bf]"
      >
        Total: ${total.toFixed(2)}
      </motion.div>
    </div>
  )
}

export default CartPage;
