import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import DashboardLayout from "./components/layout/DashboardLayout";
import { useAuth } from "./context/AuthContext";

import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductPage";
import CategoriesPage from "./pages/CategoriesPage";
import VirtualTryOnPage from "./pages/VirtualTryOnPage";
import PaymentsPage from "./pages/PaymentsPage";
import RentBookingsPage from "./pages/RentBookingsPage";

import AddProductPage from "./pages/productPage/AddProductPage";
import ViewProductPage from "./pages/productPage/ViewProductPage";
import EditProductPage from "./pages/productPage/EditProductPage";
import DeleteProduct from "./components/delete/DeleteProduct";

import AddCategoryPage from "./pages/categoryPage/AddCategoryPage";
import ViewCategoryPage from "./pages/categoryPage/ViewCategoryPage";
import DeleteCategory from "./components/delete/DeleteCategory";
import EditCategoryPage from "./pages/categoryPage/EditCategoryPage";
import ViewTryOnPage from "./pages/tryOnPage/ViewTryOnPage";
import DeleteTryOn from "./components/delete/DeleteTryOn";
import ViewPaymentPage from "./pages/paymentPage/ViewPaymentPage";
import ViewBookings from "./pages/bookings/ViewBookings";
import EditBookings from "./pages/bookings/EditBookings";
import CancelBooking from "./components/delete/CancelBooking";

import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminForgotPassword from "./pages/AdminForgotPassword";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      <Routes>
        {/* Auth Routes - No Layout */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/signup" element={<AdminSignup />} />
        <Route path="/forgot-password" element={<AdminForgotPassword />} />

        {/* Dashboard Routes - With Layout + Auth Protection */}
        <Route
          path="/*"
          element={
            // <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />

                {/* Products */}
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/add" element={<AddProductPage />} />
                <Route path="/products/view/:id" element={<ViewProductPage />} />
                <Route path="/products/edit/:id" element={<EditProductPage />} />
                <Route path="/products/delete/:id" element={<DeleteProduct />} />

                {/* Categories */}
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/add" element={<AddCategoryPage />} />
                <Route
                  path="/categories/view/:id"
                  element={<ViewCategoryPage />}
                />
                <Route
                  path="/categories/delete/:id"
                  element={<DeleteCategory />}
                />
                <Route
                  path="/categories/edit/:id"
                  element={<EditCategoryPage />}
                />

                {/* Virtual Try On */}
                <Route path="/virtual-tryon" element={<VirtualTryOnPage />} />
                <Route
                  path="/virtual-tryon/view/:id"
                  element={<ViewTryOnPage />}
                />
                <Route
                  path="/virtual-tryon/delete/:id"
                  element={<DeleteTryOn />}
                />

                {/* Payment */}
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/payments/view/:id" element={<ViewPaymentPage />} />

                {/* Booking rent */}
                <Route path="/rent-bookings" element={<RentBookingsPage />} />
                <Route path="/rent-bookings/:id" element={<ViewBookings />} />
                <Route
                  path="/rent-bookings/edit/:id"
                  element={<EditBookings />}
                />
                <Route
                  path="/rent-bookings/delete/:id"
                  element={<CancelBooking />}
                />
              </Routes>
            </DashboardLayout>
            // </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;