import { useNavigate } from "react-router-dom";
import productImg from "../../assets/product.jpg";

const bookings = [
  {
    id: "#1001",
    customer: "Priya Sharma",
    product: "Bridal Lehenga",
    date: "15 Jun, 2024",
    status: "Confirmed",
  },
  {
    id: "#1002",
    customer: "Rahul Verma",
    product: "Royal Sherwani",
    date: "15 Jun, 2024",
    status: "Pending",
  },
  {
    id: "#1003",
    customer: "Neha Singh",
    product: "Designer Saree",
    date: "20 Jun, 2024",
    status: "Active",
  },
  {
    id: "#1004",
    customer: "Anjali Gupta",
    product: "Reception Wear",
    date: "22 Jun, 2024",
    status: "Confirmed",
  },
  {
    id: "#1005",
    customer: "Karan Malhotra",
    product: "Designer Kurta",
    date: "25 Jun, 2024",
    status: "Pending",
  },
  {
    id: "#1006",
    customer: "Riya Sharma",
    product: "Bridal Lehenga",
    date: "28 Jun, 2024",
    status: "Confirmed",
  },
];

export default function RecentBookingsTable() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm overflow-hidden h-[420px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-5 border-b border-slate-100">
        <h2 className="text-[15px] font-bold text-slate-800">
          Recent Rent Bookings
        </h2>

        <button
          onClick={() => navigate("/rent-bookings")}
          className="bg-purple-50 text-purple-600 text-[13px] font-semibold px-4 sm:px-5 py-2 rounded-xl hover:bg-purple-100 transition"
        >
          View All
        </button>
      </div>

      {/* Table Wrapper */}
      <div className="flex-1 overflow-auto">
        <table className="w-full min-w-[700px]">
          <thead className="sticky top-0 bg-white z-10 border-b border-slate-100">
            <tr>
              <th className="text-left px-4 py-4 text-[11px] uppercase text-slate-400 font-semibold whitespace-nowrap">
                Booking ID
              </th>

              <th className="text-left py-4 text-[11px] uppercase text-slate-400 font-semibold whitespace-nowrap">
                Customer
              </th>

              <th className="text-left py-4 text-[11px] uppercase text-slate-400 font-semibold whitespace-nowrap">
                Product
              </th>

              <th className="text-left py-4 text-[11px] uppercase text-slate-400 font-semibold whitespace-nowrap">
                Rent Date
              </th>

              <th className="text-center py-4 text-[11px] uppercase text-slate-400 font-semibold whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((item) => (
              <tr
                key={item.id}
                onClick={() =>
                  navigate(`/rent-bookings/${item.id.replace("#", "")}`)
                }
                className="border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer"
              >
                {/* Booking ID */}
                <td className="px-4 py-4">
                  <p className="text-[12px] font-medium text-slate-500">
                    {item.id}
                  </p>
                </td>

                {/* Customer */}
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 shrink-0"></div>

                    <p className="text-[12px] font-medium text-slate-700 whitespace-nowrap">
                      {item.customer}
                    </p>
                  </div>
                </td>

                {/* Product */}
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={productImg}
                      alt=""
                      className="w-9 h-9 rounded-lg object-cover shrink-0"
                    />

                    <p className="text-[12px] text-slate-600 whitespace-nowrap">
                      {item.product}
                    </p>
                  </div>
                </td>

                {/* Date */}
                <td className="py-4">
                  <p className="text-[12px] text-slate-500 whitespace-nowrap">
                    {item.date}
                  </p>
                </td>

                {/* Status */}
                <td className="py-4 text-center">
                  <span
                    className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 rounded-full text-[10px] font-semibold ${
                      item.status === "Confirmed"
                        ? "bg-green-100 text-green-600"
                        : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
