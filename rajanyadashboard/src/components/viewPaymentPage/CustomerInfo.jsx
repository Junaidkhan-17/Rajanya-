import { Mail,  MapPin, BadgeCheck } from "lucide-react";

const CustomerInfo = ({ payment }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md">
      <h3 className="text-lg font-bold text-slate-800 mb-5 tracking-wider ">
        Customer Information
      </h3>

      <div className="flex items-center gap-4">
        <img
          src={
            payment.customerImage ||
            "https://ui-avatars.com/api/?name=" + payment.customer
          }
          alt={payment.customer}
          className="w-18 h-18 rounded-full object-cover border"
        />

        <div>
          <div className="flex items-center gap-4">
            <h4 className="font-bold text-lg text-slate-800">
              {payment.customer}
            </h4>

            <BadgeCheck size={18} className="text-blue-500" />
          </div>

          <p className="text-sm text-slate-500">
            {payment.phone || "+91 9876543210"}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3">
          <Mail size={18} className="text-slate-400" />

          <span className="text-slate-700">{payment.email}</span>
        </div>

        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-slate-400 mt-0.5" />

          <span className="text-slate-700">
            {payment.address || "Mumbai, Maharashtra, India"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
