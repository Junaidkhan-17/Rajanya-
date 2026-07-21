import { CircleX } from "lucide-react";

const CancelInfoCard = ({ booking }) => {
  if (booking?.bookingStatus !== "Cancelled") return null;

  const cancel = booking?.cancelInfo || {};

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
        <CircleX size={18} className="text-red-500" />

        <h2 className="text-lg font-bold text-red-500">Cancel Information</h2>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-x-16 gap-y-6">
          {/* Cancelled By */}
          <div>
            <p className="text-sm text-slate-400 mb-1">Cancelled By</p>

            <p className="font-semibold text-slate-800">
              {cancel.cancelledBy || "-"}
            </p>
          </div>

          {/* Cancelled On */}
          <div>
            <p className="text-sm text-slate-400 mb-1">Cancelled On</p>

            <p className="font-semibold text-slate-800">
              {cancel.cancelledOn || "-"}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 my-5" />

        <div className="grid grid-cols-2 gap-x-16 gap-y-6">
          {/* Reason */}
          <div>
            <p className="text-sm text-slate-400 mb-1">Reason</p>

            <p className="font-medium text-slate-700">{cancel.reason || "-"}</p>
          </div>

          {/* Notes */}
          <div>
            <p className="text-sm text-slate-400 mb-1">Notes</p>
            <p className="font-medium text-slate-700">{cancel.notes || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelInfoCard;
