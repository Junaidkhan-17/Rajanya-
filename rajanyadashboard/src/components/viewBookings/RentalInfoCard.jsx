import { CalendarDays } from "lucide-react";

const RentalInfoCard = ({ booking }) => {
  const rental = booking?.rental || {};

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md">
      {/* Header */}

      <div className="flex items-center gap-3 px-6 py-5 ">
        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
          <CalendarDays size={16} className="text-violet-600" />
        </div>

        <h2 className="text-lg font-bold text-slate-800">
          Rental Information
        </h2>
      </div>

      {/* Body */}

      <div className="p-6 overflow-x-auto">
        <div className="space-y-4 min-w-[240px]">

          <div className="flex justify-between gap-3">
            <span className="text-slate-500 font-semibold shrink-0">
              Rental Duration :
            </span>

            <span className="font-semibold text-right break-words min-w-0">
              {rental.duration || "-"}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-slate-500 font-semibold shrink-0">
              Requested Rent Date :
            </span>

            <span className="font-semibold text-right break-words min-w-0">
              {rental.requestDate || "-"}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-slate-500 font-semibold shrink-0">
              Requested Return Date :
            </span>

            <span className="font-semibold text-right break-words min-w-0">
              {rental.returnDate || "-"}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-slate-500 font-semibold shrink-0">
              Advance Notice :
            </span>

            <span className="font-semibold text-right break-words min-w-0">
              {rental.advanceNotice || "-"}
            </span>
          </div>

          <div className="flex justify-between items-center gap-3">
            <span className="text-slate-500 font-semibold shrink-0">
              Outfit Availability :
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                rental.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {rental.available ? "Available" : "Not Reserved"}
            </span>
          </div>

          <div className="flex justify-between gap-5">
            <span className="text-slate-500 font-semibold whitespace-nowrap shrink-0">
              Special Instructions :
            </span>

            <span className="font-semibold text-right break-words min-w-0">
              {rental.instructions || "-"}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RentalInfoCard;