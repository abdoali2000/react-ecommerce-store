import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../../redux/reducers/cartSlice";

function CartPage() {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 p-10">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-800">🛒 Shopping Cart</h1>

      <div className="bg-white shadow-2xl rounded-2xl p-6">
        {items.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
        ) : (
          items.map(item => (
            <div 
              key={item.id} 
              className="flex items-center gap-6 border-b border-gray-200 py-6 last:border-b-0 hover:bg-indigo-50 transition"
            >
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-24 h-24 object-cover rounded-xl border shadow-md"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                <p className="text-indigo-600 font-medium">${item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => dispatch(decreaseQuantity(item.id))} 
                  className="px-3 py-1 bg-indigo-100 hover:bg-indigo-200 rounded-md text-indigo-700 font-bold transition"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-white border rounded-md shadow-sm font-semibold">{item.quantity}</span>
                <button 
                  onClick={() => dispatch(increaseQuantity(item.id))} 
                  className="px-3 py-1 bg-indigo-100 hover:bg-indigo-200 rounded-md text-indigo-700 font-bold transition"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => dispatch(removeFromCart(item.id))} 
                className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold shadow transition"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-10 text-right text-2xl font-bold text-indigo-900">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  )
}

export default CartPage;
