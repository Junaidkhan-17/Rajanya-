import { ShoppingBag } from "lucide-react";

const ServiceDetails = ({ payment }) => {
  if (!payment) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md">
      {/* Header */}

      <div className="flex items-center gap-2 px-6 py-5 border-b">
        <ShoppingBag size={18} />

        <h3 className="text-lg font-bold text-slate-800">
          Service Details
        </h3>
      </div>

      {/* Body */}

      <div className="p-6 flex gap-5">
        {/* Product Image */}

        <img
          src={payment.productImage}
          alt={payment.productName}
          className="w-28 h-40 rounded-xl border object-cover"
        />

        {/* Details */}

        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">
                Service Type :
              </span>

              <span className="font-semibold text-slate-800">
                {payment.service}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span className="text-slate-400">
                Product Name :
              </span>

              <span className="font-semibold text-slate-800 text-right">
                {payment.productName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                Category :
              </span>

              <span className="font-semibold text-slate-800">
                {payment.category}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                Selected Size :
              </span>

              <span className="font-semibold text-slate-800">
                {payment.size}
              </span>
            </div>
          </div>

          {/* Price */}

          <div className="flex justify-between items-end pt-6">
            <span className="text-slate-400">
              Try-On Price
            </span>

            <span className="text-3xl font-bold text-slate-900">
              ₹{payment.amount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;