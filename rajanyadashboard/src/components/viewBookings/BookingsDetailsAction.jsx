import {
  ArrowLeft,
  Pencil,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CancelBooking from "../delete/CancelBooking";

const BookingsDetailsAction = ({ booking }) => {
  const navigate = useNavigate();

  if (!booking) return null;

  const status = booking.bookingStatus;
  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
      {/* Left Button */}

      <button
        onClick={() => navigate("/rent-bookings")}
        className="h-11 px-5 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium transition"
      >
        <ArrowLeft size={18} />
        Back to Bookings
      </button>

      {/* Right Buttons */}

      <div className="flex flex-wrap items-center justify-end gap-3">
        {/* Edit */}

        <button
          onClick={() =>
            navigate(`/rent-bookings/edit/${booking._id || booking.bookingId}`)
          }
          className="h-11 px-5 border border-rose-500 text-rose-600 rounded-xl hover:bg-rose-50 flex items-center gap-2 font-medium transition"
        >
          <Pencil size={17} />
          Edit Booking
        </button>

        {/* Pending */}

        {status === "Pending" && (
          <>
            <button className="h-11 px-5 rounded-xl bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 font-medium transition">
              <CheckCircle2 size={18} />
              Confirm Booking
            </button>

            <button
              onClick={() => setShowCancelModal(true)}
              className="h-11 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 font-medium transition"
            >
              <XCircle size={18} />
              Cancel Booking
            </button>
          </>
        )}

        {/* Confirmed */}

        {status === "Confirmed" && (
          <>
            <button className="h-11 px-5 rounded-xl bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 font-medium transition">
              <RotateCcw size={18} />
              Order Return
            </button>

            <button
              onClick={() => setShowCancelModal(true)}
              className="h-11 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 font-medium transition"
            >
              <XCircle size={18} />
              Cancel Booking
            </button>
          </>
        )}
      </div>
      <CancelBooking
        open={showCancelModal}
        booking={booking}
        onClose={() => setShowCancelModal(false)}
        onConfirm={(data) => {
          console.log(data);

          

          setShowCancelModal(false);
        }}
      />
    </div>
  );
};

export default BookingsDetailsAction;
