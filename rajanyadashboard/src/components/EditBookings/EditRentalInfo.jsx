import { CalendarDays, ClipboardList, Info } from "lucide-react";

const RentalInformationForm = ({ booking, setBooking }) => {
  const rental = booking?.rental || {};

  const handleChange = (field, value) => {
    setBooking((prev) => ({
      ...prev,
      rental: {
        ...prev.rental,
        [field]: value,
      },
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
      {/* Header */}

      <div className="flex items-center gap-2 px-4 py-4 sm:px-6 sm:py-5 border-b border-slate-100">
        <ClipboardList size={18} className="text-slate-700 shrink-0" />

        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-800">
          Rental Information
        </h3>
      </div>

      {/* Body */}

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
        {/* Row 1 */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Rental Duration */}

          <div>
            <label className="text-xs font-semibold text-slate-600">
              Rental Duration
              <span className="text-red-500"> *</span>
            </label>

            <select
              value={rental.duration || ""}
              onChange={(e) => handleChange("duration", e.target.value)}
              className="mt-2 w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 "
            >
              <option>3 Days</option>
              <option>5 Days</option>
              <option>7 Days</option>
              <option>10 Days</option>
            </select>
          </div>

          {/* Rent Date */}

          <div>
            <label className="text-xs font-semibold text-slate-600">
              Rent Date
              <span className="text-red-500"> *</span>
            </label>

            <div className="relative mt-2">
              <input
                type="date"
                value={rental.rentDate || ""}
                onChange={(e) => handleChange("rentDate", e.target.value)}
                className="w-full h-11 rounded-xl border border-slate-200 px-4 pr-10 text-sm outline-none focus:ring-2 "
              />

              <CalendarDays
                size={16}
                className="absolute right-3 top-3 text-slate-400"
              />
            </div>
          </div>

          {/* Return Date */}

          <div>
            <label className="text-xs font-semibold text-slate-600">
              Return Date
              <span className="text-red-500"> *</span>
            </label>

            <div className="relative mt-2">
              <input
                type="date"
                value={rental.returnDate || ""}
                onChange={(e) => handleChange("returnDate", e.target.value)}
                className="w-full h-11 rounded-xl border border-slate-200 px-4 pr-10 text-sm outline-none focus:ring-2 "
              />

              <CalendarDays
                size={16}
                className="absolute right-3 top-3 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Row 2 */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Advance Notice */}

          <div>
            <label className="text-xs font-semibold text-slate-600">
              Advance Notice (Days)
            </label>

            <input
              type="number"
              value={rental.notice || ""}
              onChange={(e) => handleChange("notice", e.target.value)}
              className="mt-2 w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 "
            />
          </div>

          {/* Availability */}

          <div>
            <label className="text-xs font-semibold text-slate-600">
              Outfit Availability
              <span className="text-red-500"> *</span>
            </label>

            <select
              value={rental.availability || ""}
              onChange={(e) => handleChange("availability", e.target.value)}
              className="mt-2 w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 "
            >
              <option>Available</option>
              <option>Reserved</option>
              <option>Not Reserved</option>
            </select>
          </div>
        </div>

        {/* Note */}

        <div className="flex items-start gap-3 rounded-xl bg-indigo-50 border border-indigo-100 p-4">
          <Info size={18} className="text-indigo-500 mt-0.5 shrink-0" />

          <p className="text-sm text-indigo-700 font-medium">
            <span className="font-semibold">Note:</span> Rental duration
            includes both rent date and return date.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RentalInformationForm;