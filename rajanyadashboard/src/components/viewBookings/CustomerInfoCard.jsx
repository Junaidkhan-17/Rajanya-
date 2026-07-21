import { User } from "lucide-react";

const CustomerInfoCard = ({ booking }) => {
  if (!booking) return null;

  const { customer } = booking;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md">
      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
          <User size={16} className="text-violet-600" />
        </div>

        <h2 className="font-bold text-lg text-slate-800">
          Customer Information
        </h2>
      </div>

      {/* Body */}

      <div className="p-6 overflow-x-auto">
        <div className="space-y-4 min-w-[240px]">

          <div className="flex justify-between gap-3">
            <span className="text-slate-500 font-semibold shrink-0">
              Customer Name :
            </span>

            <span className="font-medium text-slate-800 text-right break-words min-w-0">
              {customer.name}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-slate-500 font-semibold shrink-0">
              Mobile Number :
            </span>

            <span className="font-medium text-right break-words min-w-0">
              {customer.phone}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-slate-500 font-semibold shrink-0">
              Email Address :
            </span>

            <span className="font-medium break-all text-right min-w-0">
              {customer.email}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-slate-500 font-semibold shrink-0">
              City :
            </span>

            <span className="font-medium text-right break-words min-w-0">
              {customer.city}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-slate-500 font-semibold shrink-0">
              State :
            </span>

            <span className="font-medium text-right break-words min-w-0">
              {customer.state}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-slate-500 font-semibold shrink-0">
              Pin Code :
            </span>

            <span className="font-medium text-right break-words min-w-0">
              {customer.pin}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerInfoCard;