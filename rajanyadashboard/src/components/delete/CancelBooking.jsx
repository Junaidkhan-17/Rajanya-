import { useState } from "react";
import {
  AlertTriangle,
  X,
  Package,
  User,
  Calendar,
  Trash2,
} from "lucide-react";

const CancelBooking = ({ open, booking, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");
  const [remark, setRemark] = useState("");

  if (!open) return null;

  const handleConfirm = () => {
    if (!reason) {
      alert("Please select cancellation reason.");
      return;
    }

    onConfirm({
      reason,
      remark,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-start justify-between p-4 sm:p-6 border-b gap-3">
          <div className="flex gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="text-red-600" size={20} />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                Cancel Booking?
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Are you sure you want to cancel this booking? This action will
                update the booking status to
                <span className="font-semibold text-red-600">
                  {" "}
                  Cancelled
                </span>{" "}
                and customer will be notified.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-black shrink-0"
          >
            <X size={22} />
          </button>
        </div>

        {/* Booking Summary */}

        <div className="px-4 pt-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-3">
            Booking Summary
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-slate-200 p-4 bg-slate-50">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Package size={16} className="text-violet-500 shrink-0" />
                <span className="text-slate-500">Booking ID</span>
                <span className="ml-auto font-semibold text-right">
                  {booking.bookingId}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <User size={16} className="text-green-500 shrink-0" />
                <span className="text-slate-500">Customer</span>
                <span className="ml-auto font-semibold text-right">
                  {booking.customer?.name}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Package size={16} className="text-cyan-500 shrink-0" />
                <span className="text-slate-500">Product</span>
                <span className="ml-auto font-semibold text-right">
                  {booking.product?.name}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-red-500 shrink-0" />
                <span className="text-slate-500">Rent Date</span>
                <span className="ml-auto font-semibold text-right">
                  {booking.rentDate}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-blue-500 shrink-0" />
                <span className="text-slate-500">Return Date</span>
                <span className="ml-auto font-semibold text-right">
                  {booking.returnDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reason */}

        <div className="px-4 sm:px-6 mt-5">
          <label className="block text-sm font-medium mb-2">
            Cancellation Reason
            <span className="text-red-500">*</span>
          </label>

          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full h-11 rounded-xl border border-slate-300 px-4 outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Cancellation Reason</option>
            <option>Customer changed their mind</option>
            <option>Outfit unavailable</option>
            <option>Payment issue</option>
            <option>Other</option>
          </select>
        </div>

        {/* Remark */}

        <div className="px-4 sm:px-6 mt-5">
          <label className="block text-sm font-medium mb-2">
            Admin Remark
            <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={3}
            maxLength={300}
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter cancellation reason or remark..."
            className="w-full rounded-xl border border-slate-300 p-4 outline-none resize-none focus:ring-2 focus:ring-red-500"
          />

          <div className="text-right text-xs text-slate-400 mt-1">
            {remark.length}/300
          </div>
        </div>

        {/* Footer */}

        <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 sm:p-6 border-t mt-6">
          <button
            onClick={onClose}
            className="px-6 h-11 rounded-xl border border-slate-300 hover:bg-slate-50 order-2 sm:order-1"
          >
            Keep Booking
          </button>

          <button
            onClick={handleConfirm}
            className="px-6 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 order-1 sm:order-2"
          >
            <Trash2 size={18} />
            Confirm Cancellation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBooking;
