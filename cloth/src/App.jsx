import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./SharedComponents/ScrollToTop/ScrollToTop";
import Navbar from "./SharedComponents/Navbar/Navbar";
import CategoryInfoBar from "./SharedComponents/CategoryInfoBar/CategoryInfoBar";
import Footer from "./SharedComponents/Footer/Footer";
/* Public Pages */
import Home from "./Pages/Home/Home";
import AllProducts from "./Pages/AllProducts/AllProducts";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import CreateAccountModal from "./PagesComponents/AuthenticationComponents/CreateAccountModal";
import LoginModal from "./PagesComponents/AuthenticationComponents/LoginModal";
import BookForRentModal from "./PagesComponents/AuthenticationComponents/BookForRentModal";
import MensWear from "./Pages/MensWear/MensWear";
import ContactUs from "./Pages/ContactUs/ContactUs";
import VirtualTryOnUnlockDrawer from "./PagesComponents/VirtualTryOnUnlockComponents/VirtualTryOnUnlockDrawer";
import Wishlist from "./Pages/Wishlist/Wishlist";
import VirtualTryOnStudioDrawer from "./PagesComponents/VirtualTryOnStudioDrawer/VirtualTryOnStudioDrawer";
//import About from "./pages/public/About/About";
//import Categories from "./pages/public/Categories/Categories";
//import Collection from "./pages/public/Collection/Collection";
//import ProductDetails from "./pages/public/ProductDetails/ProductDetails";
//import VirtualTryOn from "./pages/public/VirtualTryOn/VirtualTryOn";
//import AIStylist from "./pages/public/AIStylist/AIStylist";
//import Pricing from "./pages/public/Pricing/Pricing";
//import Blog from "./pages/public/Blog/Blog";
//import BlogDetails from "./pages/public/BlogDetails/BlogDetails";
//import FAQ from "./pages/public/FAQ/FAQ";
//import Contact from "./pages/public/Contact/Contact";
//import TermsConditions from "./pages/public/TermsConditions/TermsConditions";
//import PrivacyPolicy from "./pages/public/PrivacyPolicy/PrivacyPolicy";
//
/* Auth Pages */
//import Login from "./pages/auth/Login/Login";
//import Register from "./pages/auth/Register/Register";
//import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";
//import ResetPassword from "./pages/auth/ResetPassword/ResetPassword";
//import VerifyOTP from "./pages/auth/VerifyOTP/VerifyOTP";
//
/* Customer Pages */
//import CustomerDashboard from "./pages/customer/Dashboard/Dashboard";
//import Profile from "./pages/customer/Profile/Profile";
//import Wishlist from "./pages/customer/Wishlist/Wishlist";
//import Cart from "./pages/customer/Cart/Cart";
//import Orders from "./pages/customer/Orders/Orders";
//import OrderDetails from "./pages/customer/OrderDetails/OrderDetails";
//import Rentals from "./pages/customer/Rentals/Rentals";
//import SavedLooks from "./pages/customer/SavedLooks/SavedLooks";
//import Notifications from "./pages/customer/Notifications/Notifications";
//import Settings from "./pages/customer/Settings/Settings";
//
/* Vendor Pages */
//import VendorDashboard from "./pages/vendor/Dashboard/Dashboard";
//import Products from "./pages/vendor/Products/Products";
//import AddProduct from "./pages/vendor/AddProduct/AddProduct";
//import EditProduct from "./pages/vendor/EditProduct/EditProduct";
//import Inventory from "./pages/vendor/Inventory/Inventory";
//import VendorOrders from "./pages/vendor/Orders/Orders";
//import Customers from "./pages/vendor/Customers/Customers";
//import VendorAnalytics from "./pages/vendor/Analytics/Analytics";
//import VendorNotifications from "./pages/vendor/Notifications/Notifications";
//import VendorSettings from "./pages/vendor/Settings/Settings";
//
/* Admin Pages */
//import AdminDashboard from "./pages/admin/Dashboard/Dashboard";
//import Users from "./pages/admin/Users/Users";
//import Vendors from "./pages/admin/Vendors/Vendors";
//import AdminProducts from "./pages/admin/Products/Products";
//import AdminCategories from "./pages/admin/Categories/Categories";
//import AdminOrders from "./pages/admin/Orders/Orders";
//import Payments from "./pages/admin/Payments/Payments";
//import Coupons from "./pages/admin/Coupons/Coupons";
//import Reviews from "./pages/admin/Reviews/Reviews";
//import AdminNotifications from "./pages/admin/Notifications/Notifications";
//import CMS from "./pages/admin/CMS/CMS";
//import AdminAnalytics from "./pages/admin/Analytics/Analytics";
//import AdminSettings from "./pages/admin/Settings/Settings";
import { useAuth, AUTH_ACTIONS } from "./contexts/AuthContext";
import "./App.css";
import WomensWear from "./Pages/WomensWear/WomensWear";

function App() {
  const { state, dispatch } = useAuth();
  return (
    <div className="app-main-wrapper">
      <ScrollToTop />
      <Navbar />
      <CategoryInfoBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<AllProducts />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/mens-wear" element={<MensWear />} />
        <Route path="/womens-wear" element={<WomensWear />} />
        <Route path="/Contact-Us" element={<ContactUs />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* 
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/virtual-try-on" element={<VirtualTryOn />} />
        <Route path="/ai-stylist" element={<AIStylist />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
*/}
        {/* Auth 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
*/}
        {/* Customer 
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/profile" element={<Profile />} />
        <Route path="/customer/wishlist" element={<Wishlist />} />
        <Route path="/customer/cart" element={<Cart />} />
        <Route path="/customer/orders" element={<Orders />} />
        <Route path="/customer/orders/:id" element={<OrderDetails />} />
        <Route path="/customer/rentals" element={<Rentals />} />
        <Route path="/customer/saved-looks" element={<SavedLooks />} />
        <Route path="/customer/notifications" element={<Notifications />} />
        <Route path="/customer/settings" element={<Settings />} />
*/}
        {/* Vendor 
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/products" element={<Products />} />
        <Route path="/vendor/products/add" element={<AddProduct />} />
        <Route path="/vendor/products/edit/:id" element={<EditProduct />} />
        <Route path="/vendor/inventory" element={<Inventory />} />
        <Route path="/vendor/orders" element={<VendorOrders />} />
        <Route path="/vendor/customers" element={<Customers />} />
        <Route path="/vendor/analytics" element={<VendorAnalytics />} />
        <Route path="/vendor/notifications" element={<VendorNotifications />} />
        <Route path="/vendor/settings" element={<VendorSettings />} />
*/}
        {/* Admin 
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/vendors" element={<Vendors />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/payments" element={<Payments />} />
        <Route path="/admin/coupons" element={<Coupons />} />
        <Route path="/admin/reviews" element={<Reviews />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/cms" element={<CMS />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
*/}
      </Routes>
      <Footer />
      {/* Global Modals */}
      <CreateAccountModal />
      <LoginModal />
      <BookForRentModal
        isOpen={state.showBookForRentModal}
        bookingData={state.bookForRentPayload}
        currentUser={state.user}
        onClose={() =>
          dispatch({
            type: AUTH_ACTIONS.CLOSE_BOOK_FOR_RENT_MODAL,
          })
        }
      />

      <VirtualTryOnUnlockDrawer
        isOpen={state.showVirtualTryOnDrawer}
        bookingData={state.virtualTryOnPayload}
        onClose={() =>
          dispatch({
            type: AUTH_ACTIONS.CLOSE_VIRTUAL_TRY_ON_DRAWER,
          })
        }
      />

      <VirtualTryOnStudioDrawer
  isOpen={
    state.showVirtualTryOnStudioDrawer
  }
  bookingData={
    state.virtualTryOnStudioPayload
  }
  onClose={() =>
    dispatch({
      type:
        AUTH_ACTIONS.CLOSE_VIRTUAL_TRY_ON_STUDIO_DRAWER,
    })
  }
/>
    </div>
  );
}

export default App;
