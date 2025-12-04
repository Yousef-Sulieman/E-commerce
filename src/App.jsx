import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from "./context/ProductContext";
import { BrandProvider } from "./context/BrandContext";
import { OfferProvider } from "./context/OfferContext";
import { CartProvider } from "./context/CartContext";
import { ProductModalProvider } from "./context/ProductModalContext";
// import paymentRoutes from "./routes/payment.routes.js";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Auth/Profile";
import Users from "./pages/Dashboard/Users";
import Shop from "./pages/Shop/Shop";
import CartPage from "./pages/Cart/CartPage";
import WishlistPage from "./pages/Wishlist/WishlistPage";
import CheckoutPage from "./pages/Checkout/Checkout";
import Contact from "./pages/Contact/Contact";
import BlogPage from "./pages/Blog/BlogPage";
import BlogDetails from "./pages/Blog/BlogDetails";
import AboutUs from "./pages/AboutUs";
import Compare from "./pages/Compare/Compare";
// import UserOrders from "./pages/Checkout/UserOrders";

// Components
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Cart must come before Order */}
        <CartProvider>
          {/* Order depends on cart + user */}
          <OrderProvider>
            {/* Wishlist does NOT depend on cart/order → safe here */}
            <WishlistProvider>
              <CategoryProvider>
                <BrandProvider>
                  <ProductProvider>
                    <ProductModalProvider>
                      <OfferProvider>
                        <Routes>
                          <Route element={<Layout />}>
                            {/* Public */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route
                              path="/wishlist"
                              element={<WishlistPage />}
                            />
                            <Route
                              path="/checkout"
                              element={<CheckoutPage />}
                            />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:id" element={<BlogDetails />} />
                            <Route path="/aboutus" element={<AboutUs />} />
                            <Route path="/compare" element={<Compare />} />

                            {/* Protected */}
                            <Route
                              path="/profile"
                              element={
                                <ProtectedRoute>
                                  <Profile />
                                </ProtectedRoute>
                              }
                            />

                            {/* Admin */}
                            <Route
                              path="/admin/users"
                              element={
                                <ProtectedRoute role="Admin">
                                  <Users />
                                </ProtectedRoute>
                              }
                            />
                          </Route>
                        </Routes>
                      </OfferProvider>
                    </ProductModalProvider>
                  </ProductProvider>
                </BrandProvider>
              </CategoryProvider>
            </WishlistProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
