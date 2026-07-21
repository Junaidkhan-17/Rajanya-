import { User } from "lucide-react";

const EditCustomerInfo = ({ booking, setBooking }) => {
const customer = booking?.customer || {};

 const handleChange = (field, value) => {
  if (!setBooking) return;

  setBooking((prev) => ({
    ...prev,
    customer: {
      ...(prev?.customer || {}),
      [field]: value,
    },
  }));
};

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6 sm:py-5 border-b border-slate-100">
        <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
          <User size={18} className="text-violet-600" />
        </div>

        <h3 className="font-bold uppercase tracking-wide text-xs sm:text-sm text-slate-800">
          Customer Information
        </h3>
      </div>
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

        {/* Customer Name */}
        <div>
          <label className="text-sm font-medium text-slate-600">
            Customer Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={customer.name || ""}
            onChange={(e) =>
              handleChange("name", e.target.value)
            }
            className="mt-2 w-full h-11 rounded-xl border border-slate-200 px-4 outline-none focus:ring-2 "
          />
        </div>

        {/* City */}
        <div>
          <label className="text-sm font-medium text-slate-600">
            City <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={customer.city || ""}
            onChange={(e) =>
              handleChange("city", e.target.value)
            }
            className="mt-2 w-full h-11 rounded-xl border border-slate-200 px-4 outline-none focus:ring-2 "
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="text-sm font-medium text-slate-600">
            Mobile Number <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={customer.phone || ""}
            onChange={(e) =>
              handleChange("phone", e.target.value)
            }
            className="mt-2 w-full h-11 rounded-xl border border-slate-200 px-4 outline-none focus:ring-2 "
          />
        </div>

        {/* State */}
        <div>
          <label className="text-sm font-medium text-slate-600">
            State <span className="text-red-500">*</span>
          </label>

          <select
            value={customer.state || ""}
            onChange={(e) =>
              handleChange("state", e.target.value)
            }
            className="mt-2 w-full h-11 rounded-xl border border-slate-200 px-4 outline-none focus:ring-2 "
          >
            <option>Maharashtra</option>
            <option>Delhi</option>
            <option>Gujarat</option>
            <option>Rajasthan</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-slate-600">
            Email Address
          </label>

          <input
            type="email"
            value={customer.email || ""}
            onChange={(e) =>
              handleChange("email", e.target.value)
            }
            className="mt-2 w-full h-11 rounded-xl border border-slate-200 px-4 outline-none focus:ring-2 "
          />
        </div>

        {/* Pin */}
        <div>
          <label className="text-sm font-medium text-slate-600">
            Pin Code <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={customer.pin || ""}
            onChange={(e) =>
              handleChange("pin", e.target.value)
            }
            className="mt-2 w-full h-11 rounded-xl border border-slate-200 px-4 outline-none focus:ring-2 "
          />
        </div>
      </div>
    </div>
  );
};

export default EditCustomerInfo;