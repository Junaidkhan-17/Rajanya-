import {
  CalendarDays,
  User,
  RefreshCcw,
} from "lucide-react";

const VCategoryMetaCard = ({ category }) => {
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full">
      {/* Heading */}

      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">
          Category Information
        </h2>
      </div>

      {/* Body */}

      <div className="p-6 space-y-6">
        {/* Created On */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-500">
            <CalendarDays
              size={18}
              className="text-red-500"
            />

            <span className="text-sm">
              Created On
            </span>
          </div>

          <span className="font-semibold text-slate-800 text-sm">
            {formatDate(category?.createdAt)}
          </span>
        </div>

        {/* Created By */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-500">
            <User
              size={18}
              className="text-pink-500"
            />

            <span className="text-sm">
              Created By
            </span>
          </div>

          <span className="font-semibold text-slate-800 text-sm">
            {category?.createdBy || "Admin"}
          </span>
        </div>

        {/* Updated */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-500">
            <RefreshCcw
              size={18}
              className="text-red-500"
            />

            <span className="text-sm">
              Last Updated
            </span>
          </div>

          <span className="font-semibold text-slate-800 text-sm">
            {formatDate(category?.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VCategoryMetaCard;