import { IndianRupee } from "lucide-react";

const AmountBreakDown = ({ payment }) => {
  if (!payment) return null;

  const platformFee = payment.platformFee || 0;
  const gst = payment.gst || 0;

  const total =
    Number(payment.amount) +
    Number(platformFee) +
    Number(gst);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md">
      {/* Header */}

      <div className="flex items-center gap-2 px-6 py-5 border-b">
        <IndianRupee size={18} />

        <h3 className="text-lg font-bold text-slate-800">
          Amount Breakdown
        </h3>
      </div>

      {/* Body */}

      <div className="p-6 space-y-5">
        <div className="flex justify-between text-slate-500">
          <span>Item</span>

          <span>Amount (₹)</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">
            Virtual Try-On Fee
          </span>

          <span className="font-semibold">
            ₹{payment.amount}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">
            Platform Fee
          </span>

          <span className="font-semibold">
            ₹{platformFee}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">
            GST (18%)
          </span>

          <span className="font-semibold">
            ₹{gst}
          </span>
        </div>

        <div className="border-t pt-5 flex justify-between">
          <span className="text-lg font-bold">
            Total Paid
          </span>

          <span className="text-3xl font-bold text-slate-900">
            ₹{total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AmountBreakDown;