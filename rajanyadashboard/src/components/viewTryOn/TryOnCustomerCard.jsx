import { User, Mail, Phone, Calendar } from "lucide-react";

const TryOnCustomerCard = ({ request }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      {/* Heading */}

      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
          <User size={20} className="text-slate-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Customer Information</h2>

          <p className="text-sm text-slate-500">
            Customer details and contact information
          </p>
        </div>
      </div>

      {/* Customer */}

      <div className="space-y-5">
        <div>
          <p className="text-xs text-slate-500 mb-1">Customer Name</p>

          <p className="font-semibold text-slate-800">
            {request.customer.name}
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Mail size={18} className="text-slate-400 mt-1" />

          <div>
            <p className="text-xs text-slate-500">Email Address</p>

            <p className="font-medium">{request.customer.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone size={18} className="text-slate-400 mt-1" />

          <div>
            <p className="text-xs text-slate-500">Phone Number</p>

            <p className="font-medium">{request.customer.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar size={18} className="text-slate-400 mt-1" />

          <div>
            <p className="text-xs text-slate-500">Customer Location</p>

            <p className="font-medium">{request.customer.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOnCustomerCard;
