import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import HeaderContainer from "./components/header/HeaderContainer";
import HomePage from "./pages/home-page/HomePage";
import ProductsPage from "./pages/products-page/ProductsPage";
import ProductsDetails from "./pages/product-details/ProductDetails";
import NotFound from "./pages/not-found/NotFound";
import { LanguagesContext } from "./context/languageContext";
import ProtectedRoute from "./components/ProtectedRoute"
import RegisterPage from "./pages/login-page/RegisterPage";
import CartPage from "./pages/cart-page/CartPage";
import ContactPage from "./pages/contact-page/ContactPage";

function App() {
  const { language } = useContext(LanguagesContext);

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="font-sans min-h-screen bg-gray-50 text-gray-800"
    >
      <HeaderContainer />

      <Routes>
        <Route path="/" element={<RegisterPage />} />

        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
            </ProtectedRoute>
          } 
          />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:product_id" element={<ProductsDetails />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/contact" element={<ContactPage/>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;