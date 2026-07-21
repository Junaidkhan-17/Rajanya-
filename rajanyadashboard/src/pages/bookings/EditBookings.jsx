import { NavLink } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
// import api from "../../utils/api";
import EditCustomerInfo from "../../components/EditBookings/EditCustomerInfo";
import EditProductInfo from "./../../components/EditBookings/EditProductInfo";
import EditRentalInfo from "../../components/EditBookings/EditRentalInfo";
import EditBookStatusNote from "../../components/EditBookings/EditBookStatusNote";
import EditActionButtons from "../../components/EditBookings/EditActionButtons";
import CancelBooking from "../../components/delete/CancelBooking";

const EditBookings = () => {
  // Dummy Data
  const [booking, setBooking] = useState({
    bookingId: "RB-001248",
    bookingStatus: "Cancelled",

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
      size: "M (Medium)",
      sku: "BRD-LEH-001",
    },

    rental: {
      duration: "5 Days",
      rentDate: "15 Aug 2025",
      returnDate: "20 Aug 2025",
      notice: "3",
      availability: "Available",
    },

    cancelInfo: {
      cancelledBy: "Admin Rajanya",
      cancelledOn: "16 Aug 2025, 02:30 PM",
      reason: "Outfit not available on requested dates.",
      notes: "Customer informed via WhatsApp.",
    },
  });
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleSave = async () => {
    console.log("Booking Payload =>", booking);

    // await api.put(`/bookings/${booking._id || booking.bookingId}`, booking);

    toast.success("Booking Updated Successfully");
  };

  return (
    <div className="space-y-3 px-3 sm:px-4 lg:px-0">
      {/* Breadcrumb */}

      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500">
        <NavLink to="/" className="hover:text-black">
          Dashboard
        </NavLink>

        <span>›</span>

        <NavLink to="/rent-bookings" className="hover:text-black">
          Rent Bookings
        </NavLink>

        <span>›</span>

        <span className="font-semibold text-slate-900">Edit Booking</span>
      </div>

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 sm:gap-5">
        {/* Left */}

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Edit Booking
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mt-1 sm:mt-2">
            Update the booking information and save changes.
          </p>
        </div>

        {/* Right */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-4 py-3 sm:px-5 sm:py-4 flex items-center gap-3 sm:gap-4 w-full lg:w-auto lg:min-w-[220px]">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-pink-100 flex items-center justify-center shrink-0">
            <CalendarDays size={20} className="text-pink-600 sm:hidden" />
            <CalendarDays
              size={22}
              className="text-pink-600 hidden sm:block"
            />
          </div>

          <div>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wide text-slate-400 font-semibold">
              Booking ID
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-800">
              {booking.bookingId}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EditCustomerInfo booking={booking} setBooking={setBooking} />
        <EditProductInfo booking={booking} setBooking={setBooking} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EditRentalInfo booking={booking} setBooking={setBooking} />
        <EditBookStatusNote booking={booking} setBooking={setBooking} />
      </div>

      <EditActionButtons
        booking={booking}
        setBooking={setBooking}
        onSave={handleSave}
        onCancelBooking={() => setShowCancelModal(true)}
      />
      <CancelBooking
        open={showCancelModal}
        booking={booking}
        onClose={() => setShowCancelModal(false)}
        onConfirm={(data) => {
          console.log(data);

          // Dummy Update
          setBooking((prev) => ({
            ...prev,
            bookingStatus: "Cancelled",

            cancelInfo: {
              cancelledBy: "Admin Rajanya",
              cancelledOn: new Date().toLocaleString(),
              reason: data.reason,
              notes: data.remark,
            },
          }));

          setShowCancelModal(false);
        }}
      />
    </div>
  );
};

export default EditBookings;