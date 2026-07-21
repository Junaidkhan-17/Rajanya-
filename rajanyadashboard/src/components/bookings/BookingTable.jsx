import { Eye, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  Confirmed: "bg-green-50 text-green-600",
  Pending: "bg-blue-50 text-blue-600",
  Cancelled: "bg-rose-50 text-rose-600",
};



const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const BookingTable = ({ bookings = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <h3 className="font-semibold text-slate-800">
          All Bookings{" "}
          <span className="text-slate-400 font-normal">
            ({bookings.length})
          </span>
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400">Sort By:</span>
          <select className="h-8 px-2 rounded-lg border border-slate-200 text-slate-600 text-sm focus:outline-none">
            <option>Latest First</option>
            <option>Oldest First</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="max-h-[480px] overflow-y-auto overflow-x-auto">
        <table className="w-full text-sm min-w-[1100px]">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
              <th className="px-5 py-3 font-medium bg-white">SR NO.</th>
              <th className="px-5 py-3 font-medium bg-white">BOOKING ID</th>
              <th className="px-5 py-3 font-medium bg-white">CUSTOMER</th>
              <th className="px-5 py-3 font-medium bg-white">PRODUCT</th>
              <th className="px-5 py-3 font-medium bg-white">
                RENTAL DURATION
              </th>
              <th className="px-5 py-3 font-medium bg-white">RENT DATE</th>
              <th className="px-5 py-3 font-medium bg-white">RETURN DATE</th>
              <th className="px-5 py-3 font-medium bg-white">AMOUNT</th>
              <th className="px-5 py-3 font-medium bg-white">STATUS</th>
              <th className="px-5 py-3 font-medium bg-white text-right">
                ACTION
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((item, idx) => (
              <tr
                key={item._id}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
              >
                <td className="px-5 py-4 text-slate-500">{idx + 1}</td>
                <td className="px-5 py-4 font-medium text-slate-800">
                  {item.bookingId}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-white text-xs flex items-center justify-center font-medium">
                      {initials(item.customer)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">
                        {item.customer}
                      </p>
                      <p className="text-xs text-slate-400">{item.phone}</p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.product}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <span className="text-slate-700">{item.product}</span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="px-2 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium">
                    {item.duration}
                  </span>
                </td>

                <td className="px-5 py-4 text-slate-500">{item.rentDate}</td>
                <td className="px-5 py-4 text-slate-500">{item.returnDate}</td>
                <td className="px-5 py-4 font-medium text-slate-800">
                  ₹{item.amount.toLocaleString("en-IN")}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[item.status] || "bg-slate-100 text-slate-600"}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/rent-bookings/${item._id}`)}
                      className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => navigate(`/rent-bookings/edit/${item._id}`)}
                      className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400"
                    >
                      <Pencil size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-10 text-slate-400">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
