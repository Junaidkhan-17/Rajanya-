import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import productImg from "../../assets/product.jpg";

const requests = [
  {
    id: 1,
    user: "Priya Sharma",
    email: "priya@gmail.com",
    product: "Bridal Lehenga",
    date: "30 May, 2024",
    time: "10:30 AM",
    payment: "₹99",
    status: "Completed",
  },
  {
    id: 2,
    user: "Rahul Verma",
    email: "rahul@gmail.com",
    product: "Royal Sherwani",
    date: "30 May, 2024",
    time: "11:15 AM",
    payment: "₹99",
    status: "Completed",
  },
  {
    id: 3,
    user: "Neha Singh",
    email: "neha@gmail.com",
    product: "Designer Saree",
    date: "29 May, 2024",
    time: "09:45 AM",
    payment: "₹99",
    status: "Completed",
  },
  {
    id: 4,
    user: "Anjali Gupta",
    email: "anjali@gmail.com",
    product: "Reception Wear",
    date: "28 May, 2024",
    time: "02:20 PM",
    payment: "₹99",
    status: "Completed",
  },
];

export default function RecentTryOnTable() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[28px] border border-slate-200 shadow-sm overflow-hidden h-[420px] flex flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-5">
        <h2 className="text-[14px] sm:text-[15px] font-bold text-slate-800">
          Recent Virtual Try-On Requests
        </h2>

        <button
          onClick={() => navigate("/virtual-tryon")}
          className="bg-purple-50 text-purple-600 text-[12px] sm:text-[13px] font-semibold px-4 sm:px-5 py-2 rounded-xl whitespace-nowrap"
        >
          View All
        </button>
      </div>

      {/* Responsive Table */}
      <div className="flex-1 overflow-auto">
        <table className="min-w-[850px] w-full table-fixed">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-t border-b border-slate-100 text-[11px] uppercase text-slate-400">
              <th className="text-left px-5 py-4 w-[22%]">
                User
              </th>

              <th className="text-left py-4 w-[22%]">
                Product
              </th>

              <th className="text-left py-4 w-[18%]">
                Date
              </th>

              <th className="text-left py-4 w-[10%]">
                Payment
              </th>

              <th className="text-left py-4 pl-3 w-[18%]">
                Status
              </th>

              <th className="text-center py-4 w-[10%]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {requests.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-100 hover:bg-slate-50 transition"
              >
                {/* USER */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex-shrink-0"></div>

                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-slate-800 truncate">
                        {item.user}
                      </p>

                      <p className="text-[10px] text-slate-400 truncate">
                        {item.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* PRODUCT */}
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={productImg}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                    />

                    <span className="text-[12px] font-medium text-slate-700 truncate">
                      {item.product}
                    </span>
                  </div>
                </td>

                {/* DATE */}
                <td className="py-4">
                  <p className="text-[12px] text-slate-700 whitespace-nowrap">
                    {item.date}
                  </p>

                  <p className="text-[10px] text-slate-400">
                    {item.time}
                  </p>
                </td>

                {/* PAYMENT */}
                <td className="py-4">
                  <span className="text-[14px] font-bold text-slate-800">
                    {item.payment}
                  </span>
                </td>

                {/* STATUS */}
                <td className="py-4 pl-3">
                  <span className="inline-flex items-center justify-center w-[95px] h-[30px] bg-green-100 text-green-600 rounded-full text-[11px] font-semibold">
                    {item.status}
                  </span>
                </td>

                {/* ACTION */}
                <td className="py-4">
                  <div className="flex justify-center">
                    <button
                      onClick={() => navigate(`/virtual-tryon/view/${item.id}`)}
                      className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"
                    >
                      <Eye size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}