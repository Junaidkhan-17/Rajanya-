import { useState } from "react";
import { NavLink } from "react-router-dom";
import CustomerInfoCard from "../../components/viewBookings/CustomerInfoCard";
import ProductInfoCard from "../../components/viewBookings/ProductInfoCard";
import RentalInfoCard from "../../components/viewBookings/RentalInfoCard";
import BookingsDetailsAction from "../../components/viewBookings/BookingsDetailsAction";

import CancelInfoCard from "../../components/viewBookings/CancelInfoCard";
import BookingStats from "../../components/viewBookings/BookingStats";

const ViewBookings = () => {
  // Dummy Data
  const [booking] = useState({
    bookingId: "RB-001248",
    bookingStatus: "Pending",

    customer: {
      name: "Priya Sharma",
      phone: "+91 9876543210",
      email: "priya.sharma@email.com",
      city: "Mumbai",
      state: "Maharashtra",
      pin: "400001",
    },
    product: {
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
      name: "Bridal Lehenga",
      category: "Bridal Wear",
      collection: "Premium Red",
      size: "M (Medium)",
      sku: "BRD-LEH-001",
    },
    cancelInfo: {
      cancelledBy: "Admin Rajanya",
      cancelledOn: "16 Aug 2025, 02:30 PM",
      reason: "Outfit not available on requested dates.",
      notes: "Customer informed via WhatsApp.",
    },
  });
  const statusConfig = {
    Pending: {
      label: "Pending",
      badge: "bg-blue-100 text-blue-700",
    },

    Confirmed: {
      label: "Confirmed",
      badge: "bg-green-100 text-green-700",
    },

    Cancelled: {
      label: "Cancelled",
      badge: "bg-red-100 text-red-700",
    },
  };

  const currentStatus = statusConfig[booking.bookingStatus];

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-0">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-500">
        <NavLink to="/" className="hover:text-black whitespace-nowrap">
          Dashboard
        </NavLink>
        <span>›</span>
        <NavLink to="/rent-bookings" className="hover:text-black whitespace-nowrap">
          Rent Bookings
        </NavLink>
        <span>›</span>

        <span className="font-semibold text-slate-900 whitespace-nowrap">
          Booking Details
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Booking Details
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mt-1 sm:mt-2">
            View complete booking information and customer details.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="text-left sm:text-right">
            <p className="text-xs text-slate-400">Booking Status</p>

            <span
              className={`inline-flex mt-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold ${currentStatus.badge}`}
            >
              {currentStatus.label}
            </span>
          </div>
        </div>
      </div>

      <BookingStats booking={booking} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <CustomerInfoCard booking={booking} />
        <ProductInfoCard booking={booking} />
        <RentalInfoCard booking={booking} />
      </div>

      {booking.bookingStatus === "Cancelled" && (
        <CancelInfoCard booking={booking} />
      )}

      <BookingsDetailsAction booking={booking} />
    </div>
  );
};

export default ViewBookings;