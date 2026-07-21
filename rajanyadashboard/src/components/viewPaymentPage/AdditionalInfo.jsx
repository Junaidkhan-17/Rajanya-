import {
  Smartphone,
  Globe,
  MapPin,
  BadgeIndianRupee,
} from "lucide-react";

const AdditionalInfo = ({ payment }) => {
  if (!payment) return null;

  const refundColor =
    payment.refundStatus === "Refunded"
      ? "bg-green-100 text-green-700"
      : payment.refundStatus === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-blue-100 text-blue-700";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md">
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
        <Globe size={18} />
        Additional Information
      </h2>

      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-500">
            <Smartphone size={16} />
            <span>Device</span>
          </div>

          <span className="font-semibold text-slate-800">
            {payment.device}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500">
            IP Address
          </span>

          <span className="font-semibold text-slate-800">
            {payment.ipAddress}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin size={16} />
            <span>Location</span>
          </div>

          <span className="font-semibold text-slate-800 text-right">
            {payment.location}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-500">
            <BadgeIndianRupee size={16} />
            <span>Currency</span>
          </div>

          <span className="font-semibold text-slate-800">
            {payment.currency}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500">
            Refund Status
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${refundColor}`}
          >
            {payment.refundStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;