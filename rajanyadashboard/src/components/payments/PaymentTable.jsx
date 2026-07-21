import { useMemo, useState, useEffect } from "react";
import { Eye, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaginationPayment from "./PaginationPayment";

const PaymentTable = ({
  payments = [],
  search = "",
  status = "All Status",
  method = "All Methods",
  dateRange = "",
}) => {
  const navigate = useNavigate();

  const ROWS_PER_PAGE = 5;

  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredPayments = useMemo(() => {
    // item.date jaisa "16 Aug 2025" hai usse Date object mein convert karta hai
    const parseItemDate = (str) => {
      const d = new Date(str);
      return isNaN(d.getTime()) ? null : d;
    };

    // filter se aayi "16 Aug 2025" / "16/08/2025" jaisi string ko bhi Date mein convert karta hai
    const parseFilterDate = (str) => {
      if (!str || !str.trim()) return null;
      const trimmed = str.trim();

      let m = trimmed.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
      if (m) {
        const [, d, mo, y] = m;
        return new Date(Number(y), Number(mo) - 1, Number(d));
      }

      const fallback = new Date(trimmed);
      return isNaN(fallback.getTime()) ? null : fallback;
    };

    const isSameDay = (a, b) =>
      a && b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    const filterDate = parseFilterDate(dateRange);

    return payments.filter((item) => {
      const searchMatch =
        item.customer?.toLowerCase().includes(search.toLowerCase()) ||
        item.transactionId?.toLowerCase().includes(search.toLowerCase());

      const statusMatch = status === "All Status" || item.status === status;

      const methodMatch = method === "All Methods" || item.method === method;

      const dateMatch = !filterDate || isSameDay(parseItemDate(item.date), filterDate);

      return searchMatch && statusMatch && methodMatch && dateMatch;
    });
  }, [payments, search, status, method, dateRange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, method, dateRange]);

  const totalPages = Math.ceil(filteredPayments.length / ROWS_PER_PAGE);

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;

  const currentRows = filteredPayments.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE,
  );

  const toggleAll = () => {
    const ids = currentRows.map((item) => item._id);

    if (ids.every((id) => selectedRows.includes(id))) {
      setSelectedRows((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setSelectedRows((prev) => [...new Set([...prev, ...ids])]);
    }
  };

  const toggleRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const badgeColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-100 text-emerald-700";

      case "Pending":
        return "bg-amber-100 text-amber-700";

      case "Failed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto custom-scroll">
        <div className="h-[550px] overflow-y-auto">
          <table className="min-w-[1400px] w-full border-separate border-spacing-0">
            <thead className="sticky top-0 z-20 bg-white shadow-sm">
              <tr className="text-left">
                <th className="px-6 py-4 border-b bg-white">
                  <input
                    type="checkbox"
                    checked={
                      currentRows.length > 0 &&
                      currentRows.every((row) => selectedRows.includes(row._id))
                    }
                    onChange={toggleAll}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                </th>

                <th className="px-6 py-4 border-b text-xs font-bold uppercase tracking-wider text-slate-500">
                  Transaction ID
                </th>

                <th className="px-6 py-4 border-b text-xs font-bold uppercase tracking-wider text-slate-500">
                  Customer
                </th>

                <th className="px-6 py-4 border-b text-xs font-bold uppercase tracking-wider text-slate-500">
                  Service
                </th>

                <th className="px-6 py-4 border-b text-xs font-bold uppercase tracking-wider text-slate-500">
                  Amount
                </th>

                <th className="px-6 py-4 border-b text-xs font-bold uppercase tracking-wider text-slate-500">
                  Method
                </th>

                <th className="px-6 py-4 border-b text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 border-b text-xs font-bold uppercase tracking-wider text-slate-500">
                  Payment Date
                </th>

                <th className="px-6 py-4 border-b text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentRows.map((item) => (
                <tr
                  key={item._id}
                  className="border-b even:bg-slate-50/40 hover:bg-blue-50 transition-all duration-200"
                >
                  <td className="px-6 py-5">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item._id)}
                      onChange={() => toggleRow(item._id)}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                  </td>

                  <td className="px-6 py-5">
                    <span className="font-semibold text-slate-800">
                      {item.transactionId}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-slate-800">
                        {item.customer}
                      </p>

                      <p className="text-xs text-slate-500 truncate max-w-[220px]">
                        {item.email}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-slate-700">{item.service}</td>

                  <td className="px-6 py-5">
                    <span className="font-bold text-emerald-600 text-[15px]">
                      ₹{item.amount}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                      {item.method}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${badgeColor(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap text-slate-600">
                    {item.date}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => navigate(`/payments/view/${item._id}`)}
                        className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-200"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => {
                          const invoice = `
Transaction ID : ${item.transactionId}
Customer : ${item.customer}
Email : ${item.email}
Service : ${item.service}
Amount : ₹${item.amount}
Method : ${item.method}
Status : ${item.status}
Payment Date : ${item.date}
`;

                          const blob = new Blob([invoice], {
                            type: "text/plain",
                          });

                          const url = URL.createObjectURL(blob);

                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `${item.transactionId}.txt`;
                          a.click();

                          URL.revokeObjectURL(url);
                        }}
                        className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-200"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {currentRows.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-24 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl">
                        💳
                      </div>

                      <p className="text-lg font-semibold">No Payments Found</p>

                      <p className="text-sm">
                        Try changing filters or search keyword.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <PaginationPayment
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PaymentTable;