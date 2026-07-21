import { CircleCheckBig } from "lucide-react";

const TryOnPaymentCard = ({ request }) => {
  if (!request?.payment) return null;
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
          <CircleCheckBig size={20} className="text-green-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-green-700">
            Payment Information
          </h2>

          <p className="text-sm text-slate-500">Transaction details</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs uppercase text-slate-400 mb-1">Payment ID</p>

            <p className="font-semibold">{request.payment.paymentId}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-400 mb-1">
              Payment Method
            </p>

            <p className="font-semibold">{request.payment.method}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs uppercase text-slate-400 mb-1">Amount Paid</p>

            <p className="font-bold text-lg">₹{request.payment.amount}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-400 mb-1">
              Payment Date
            </p>

            <p className="font-semibold">{request.payment.date}</p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-400 mb-2">
            Transaction Status
          </p>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
              request.payment.status === "Success"
                ? "bg-green-100 text-green-600"
                : request.payment.status === "Pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
            }`}
          >
            {request.payment.status.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TryOnPaymentCard;
