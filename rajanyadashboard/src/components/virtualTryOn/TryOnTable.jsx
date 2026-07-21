import { useMemo, useState } from "react";
import { ChevronDown, Search, Trash2 } from "lucide-react";

import TryOnRow from "./TryOnRow";
import TryOnPagination from "./TryOnPagination";
import { NavLink } from "react-router-dom";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const PER_PAGE = 5;

const TryOnTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortBy, setSortBy] = useState("Latest First");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ search: "", month: "", status: "" });

  const [requests, setRequests] = useState([
    {
      _id: "1",
      requestId: "VTO-001248",
      customer: "Priya Sharma",
      email: "priya@gmail.com",
      productName: "Bridal Lehenga",
      sku: "BL-1023",
      price: "₹4,500",
      productImage:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
      uploadedPhoto:
        "https://images.unsplash.com/photo-1618886487325-f665032b6352?w=300",
      paymentStatus: "Paid",
      paymentAmount: "₹99",
      paymentMethod: "QR",
      status: "Processing",
      statusText: "Generating...",
      createdAt: "2025-08-15T10:30:00",
    },
    {
      _id: "2",
      requestId: "VTO-001249",
      customer: "riya Sharma",
      email: "priya@gmail.com",
      productName: "Lehenga",
      sku: "BL-1023",
      price: "₹4,500",
      productImage:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
      uploadedPhoto:
        "https://images.unsplash.com/photo-1618886487325-f665032b6352?w=300",
      paymentStatus: "Paid",
      paymentAmount: "₹99",
      paymentMethod: "QR",
      status: "Completed",
      statusText: "AI Generated",
      createdAt: "2025-08-14T09:10:00",
    },
    {
      _id: "3",
      requestId: "VTO-001250",
      customer: "Priya Sharma",
      email: "priya@gmail.com",
      productName: "Bridal Lehenga",
      sku: "BL-1023",
      price: "₹4,500",
      productImage:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
      uploadedPhoto: "",
      paymentStatus: "Pending",
      paymentAmount: "₹99",
      paymentMethod: "QR",
      status: "Pending",
      statusText: "Awaiting Payment",
      createdAt: "2025-08-13T09:10:00",
    },
    {
      _id: "4",
      requestId: "VTO-001251",
      customer: "Priya Sharma",
      email: "priya@gmail.com",
      productName: "Jeans",
      sku: "BL-1023",
      price: "₹4,500",
      productImage:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
      uploadedPhoto:
        "https://images.unsplash.com/photo-1618886487325-f665032b6352?w=300",
      paymentStatus: "Failed",
      paymentAmount: "₹99",
      paymentMethod: "QR",
      status: "Failed",
      statusText: "Payment Failed",
      createdAt: "2025-10-12T08:30:00",
    },
    {
      _id: "5",
      requestId: "VTO-001251",
      customer: "Priya Sharma",
      email: "priya@gmail.com",
      productName: "Jeans",
      sku: "BL-1023",
      price: "₹4,500",
      productImage:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
      uploadedPhoto:
        "https://images.unsplash.com/photo-1618886487325-f665032b6352?w=300",
      paymentStatus: "Failed",
      paymentAmount: "₹99",
      paymentMethod: "QR",
      status: "Failed",
      statusText: "Payment Failed",
      createdAt: "2025-10-12T08:30:00",
    }
  ]);

  //api
  // const [requests, setRequests] = useState([]);
  // const [loading, setLoading] = useState(false);
  //
  // useEffect(() => {
  //   const fetchRequests = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch("/api/virtual-tryon/requests");
  //       const data = await res.json();
  //       setRequests(data);
  //     } catch (err) {
  //       console.error("Failed to fetch requests:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchRequests();
  // }, []);


  //Filter
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const search = filters.search.toLowerCase();

      const matchesSearch =
        !search ||
        req.productName.toLowerCase().includes(search) ||
        req.requestId.toLowerCase().includes(search) ||
        req.customer.toLowerCase().includes(search) ||
        req.email.toLowerCase().includes(search);

      const matchesMonth =
        !filters.month ||
        new Date(req.createdAt).toLocaleString("default", { month: "long" }) ===
          filters.month;

      const matchesStatus = !filters.status || req.status === filters.status;

      return matchesSearch && matchesMonth && matchesStatus;
    });
  }, [requests, filters]);

  //Sort
  const sortedRequests = useMemo(() => {
    const arr = [...filteredRequests];
    if (sortBy === "Latest First") {
      arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "Oldest First") {
      arr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    return arr;
  }, [filteredRequests, sortBy]);

  // Paginate
  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return sortedRequests.slice(start, start + PER_PAGE);
  }, [sortedRequests, currentPage]);

  // Reset page on filter/sort change
  const handleSetFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Delete selected
  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) return;
    setRequests((prev) => prev.filter((r) => !selectedRows.includes(r._id)));
    setSelectedRows([]);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Virtual Try-On Requests
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Showing {sortedRequests.length} of {requests.length} requests
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none h-11 px-4 pr-10 rounded-xl border border-slate-200 text-sm bg-white outline-none"
            >
              <option>Latest First</option>
              <option>Oldest First</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b border-slate-100 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative xl:col-span-2">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search product"
              value={filters.search}
              onChange={(e) =>
                handleSetFilters({ ...filters, search: e.target.value })
              }
              className="w-full h-11 rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          {/* Month */}
          <div className="relative">
            <select
              value={filters.month}
              onChange={(e) =>
                handleSetFilters({ ...filters, month: e.target.value })
              }
              className="appearance-none w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-black/10"
            >
              <option value="">All Months</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          {/* Status */}
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) =>
                handleSetFilters({ ...filters, status: e.target.value })
              }
              className="appearance-none w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-black/10"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          {/* Delete */}
          <div>
            <button 
              onClick={handleDeleteSelected}
              disabled={selectedRows.length === 0}
              className="h-11 w-full px-5 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center gap-2 transition"
            >
              <Trash2 size={17} />
              Delete ({selectedRows.length})
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[1700px] w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">
                <input
                  type="checkbox"
                  checked={
                    paginatedRequests.length > 0 &&
                    paginatedRequests.every((r) => selectedRows.includes(r._id))
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows((prev) => [
                        ...new Set([
                          ...prev,
                          ...paginatedRequests.map((r) => r._id),
                        ]),
                      ]);
                    } else {
                      setSelectedRows((prev) =>
                        prev.filter(
                          (id) =>
                            !paginatedRequests.map((r) => r._id).includes(id),
                        ),
                      );
                    }
                  }}
                />
              </th>
              <th className="px-5 py-4">Request</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Product</th>
              <th className="px-5 py-4">Uploaded Photo</th>
              <th className="px-5 py-4">Payment</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((request) => (
                <TryOnRow
                  key={request._id}
                  request={request}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="px-5 py-16 text-center text-slate-400 text-sm"
                >
                  No requests match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <TryOnPagination
        currentPage={currentPage}
        totalEntries={sortedRequests.length}
        perPage={PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TryOnTable;
