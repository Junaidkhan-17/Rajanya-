import { ArrowLeft, Save, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CancelBooking from "../../components/delete/CancelBooking";

const EditActionButtons = ({
  booking,
  onSave,
  setBooking,
  //   onCancelBooking,
}) => {
  const navigate = useNavigate();

  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-4 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      {/* Back Button */}

      <button
        onClick={() =>
          navigate(`/rent-bookings/${booking._id || booking.bookingId}`)
        }
        className="h-11 px-5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-2 text-slate-700 transition text-sm sm:text-base"
      >
        <ArrowLeft size={18} className="shrink-0" />
        <span className="whitespace-nowrap">Back to Booking Details</span>
      </button>

      {/* Right Buttons */}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          onClick={() => {
            console.log("Clicked");
            setShowCancelModal(true);
          }}
          className="h-11 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <XCircle size={18} className="shrink-0" />
          Cancel Booking
        </button>

        <button
          onClick={onSave}
          className="h-11 px-6 rounded-xl bg-black hover:bg-slate-800 text-white flex items-center justify-center gap-2 transition text-sm sm:text-base"
        >
          <Save size={18} className="shrink-0" />
          Save Changes
        </button>
      </div>
      <CancelBooking
        open={showCancelModal}
        booking={booking}
        onClose={() => setShowCancelModal(false)}
        onConfirm={(data) => {
          console.log(data);

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

export default EditActionButtons;
