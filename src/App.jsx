import { useContext, useEffect } from "react";
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
import Footer from "./components/footer/Footer";
import { useSelector } from "react-redux";

function App() {
  const { language } = useContext(LanguagesContext);
  const themeMode = useSelector((state) => state.theme.mode);
  const isDarkMode = themeMode === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className={`font-sans min-h-screen transition-colors ${isDarkMode ? "bg-black text-[#f6e7bf]" : "bg-white text-[#374151]"}`}
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
      <Footer />
    </div>
  );
}

export default App;