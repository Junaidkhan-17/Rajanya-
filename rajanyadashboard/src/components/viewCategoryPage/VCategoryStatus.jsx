import { CheckCircle2 } from "lucide-react";

const VCategoryStatus = ({ category }) => {
  const status = category?.status || "Draft";

  const badgeClass =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : status === "Inactive"
      ? "bg-red-100 text-red-600"
      : "bg-yellow-100 text-yellow-700";

  const statusMessage =
    status === "Active"
      ? "This category is currently visible to customers and available for product assignments."
      : status === "Inactive"
      ? "This category is currently hidden from customers and is not available for product assignments."
      : "This category is saved as a draft and is not yet published.";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full">
      {/* Heading */}

      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">
          Category Status
        </h2>
      </div>

      {/* Body */}

      <div className="p-6">
        <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">
          Status
        </p>

        <div className="flex items-center gap-2 mb-5">
          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold ${badgeClass}`}
          >
            {status}
          </span>
        </div>

        <div className="flex items-start gap-2">
          <CheckCircle2
            size={18}
            className={
              status === "Active"
                ? "text-green-500 mt-0.5"
                : status === "Inactive"
                ? "text-red-500 mt-0.5"
                : "text-yellow-500 mt-0.5"
            }
          />

          <p className="text-sm italic text-slate-500 leading-6">
            {statusMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VCategoryStatus;