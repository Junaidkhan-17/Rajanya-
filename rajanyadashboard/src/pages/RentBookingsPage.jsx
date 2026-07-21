import { useEffect, useMemo, useState } from "react";
import { Download } from "lucide-react";

import BookingsStats from "../components/bookings/Bookingstats";
import BookingFilters from "../components/bookings/BookingFilters";
import BookingTable from "../components/bookings/BookingTable";
import BookingPagination from "../components/bookings/BookingPagination";

const RentBookingsPage = () => {
  // Stats
  const [stats] = useState({
    totalBookings: 1248,
    activeRentals: 586,
    returnedOrders: 438,
    rentalRevenue: "₹8,47,250",
  });

  // Draft filter state (controlled by BookingFilters inputs)
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [method, setMethod] = useState("All Methods");
  const [dateRange, setDateRange] = useState("");

  // Filters actually applied to the table (only updates when Apply is clicked)
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    status: "All Status",
    method: "All Methods",
    dateRange: "",
  });

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Dummy Bookings
  const [bookings] = useState([
    {
      _id: 1,
      bookingId: "RB-001248",
      customer: "Priya Sharma",
      phone: "+91 9876543210",
      product: "Bridal Lehenga",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200",
      duration: "5 Days",
      rentDate: "15 Aug 2025",
      returnDate: "20 Aug 2025",
      amount: 4500,
      paymentMethod: "UPI",
      status: "Confirmed",
    },
    {
      _id: 2,
      bookingId: "RB-001248",
      customer: "Priya Sharma",
      phone: "+91 9876543210",
      product: "Bridal Lehenga",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200",
      duration: "5 Days",
      rentDate: "15 Aug 2025",
      returnDate: "20 Aug 2025",
      amount: 4500,
      paymentMethod: "UPI",
      status: "Confirmed",
    },
    {
      _id: 3,
      bookingId: "RB-001248",
      customer: "Priya Sharma",
      phone: "+91 9876543210",
      product: "Bridal Lehenga",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200",
      duration: "5 Days",
      rentDate: "15 Aug 2025",
      returnDate: "20 Aug 2025",
      amount: 4500,
      paymentMethod: "UPI",
      status: "Confirmed",
    },
    {
      _id: 4,
      bookingId: "RB-001249",
      customer: "Neha Patel",
      phone: "+91 9988776655",
      product: "Designer Saree",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
      duration: "3 Days",
      rentDate: "16 Aug 2025",
      returnDate: "19 Aug 2025",
      amount: 3200,
      paymentMethod: "Card",
      status: "Pending",
    },
    {
      _id: 5,
      bookingId: "RB-001250",
      customer: "Aarav Singh",
      phone: "+91 9911223344",
      product: "Sherwani",
      image:
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=200",
      duration: "7 Days",
      rentDate: "18 Aug 2025",
      returnDate: "25 Aug 2025",
      amount: 6200,
      paymentMethod: "Cash",
      status: "Cancelled",
    },
    {
      _id: 6,
      bookingId: "RB-001251",
      customer: "Riya Shah",
      phone: "+91 9871112233",
      product: "Party Gown",
      image:
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=200",
      duration: "4 Days",
      rentDate: "20 Aug 2025",
      returnDate: "24 Aug 2025",
      amount: 5200,
      paymentMethod: "UPI",
      status: "Returned",
    },
  ]);

  // parses "01 Aug 2025" style item dates
  const parseItemDate = (str) => {
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
  };

  // parses a single date piece like "01 Aug 2025" or "01/08/2025"
  const parseOneDate = (text) => {
    if (!text) return null;
    const trimmed = text.trim();

    let m = trimmed.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (m) {
      const [, d, mo, y] = m;
      const date = new Date(Number(y), Number(mo) - 1, Number(d));
      if (!isNaN(date.getTime())) return date;
    }

    const fallback = new Date(trimmed);
    return isNaN(fallback.getTime()) ? null : fallback;
  };

  // parses "01 Aug 2025 - 18 Aug 2025" (or a single date) coming from the filter input
  const parseFilterRange = (text) => {
    if (!text || !text.trim()) return { from: null, to: null };

    const rangeMatch = text.match(/^(.*\d{4})\s*-\s*(.*\d{4})$/);
    if (rangeMatch) {
      return {
        from: parseOneDate(rangeMatch[1]),
        to: parseOneDate(rangeMatch[2]),
      };
    }

    return { from: parseOneDate(text), to: null };
  };

  // Filter - now driven by appliedFilters, and includes date range matching against rentDate
  const filteredBookings = useMemo(() => {
    const { from, to } = parseFilterRange(appliedFilters.dateRange);

    return bookings.filter((item) => {
      const searchMatch =
        item.customer.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
        item.bookingId.toLowerCase().includes(appliedFilters.search.toLowerCase());

      const statusMatch =
        appliedFilters.status === "All Status" || item.status === appliedFilters.status;

      const methodMatch =
        appliedFilters.method === "All Methods" ||
        item.paymentMethod === appliedFilters.method;

      const itemDate = parseItemDate(item.rentDate);
      let dateMatch = true;
      if (from && to) {
        dateMatch =
          itemDate &&
          itemDate.getTime() >= from.getTime() &&
          itemDate.getTime() <= to.getTime();
      } else if (from) {
        dateMatch =
          itemDate &&
          itemDate.getFullYear() === from.getFullYear() &&
          itemDate.getMonth() === from.getMonth() &&
          itemDate.getDate() === from.getDate();
      }

      return searchMatch && statusMatch && methodMatch && dateMatch;
    });
  }, [bookings, appliedFilters]);

  // Reset to page 1 whenever applied filters change
  useEffect(() => {
    setPage(1);
  }, [appliedFilters]);

  // Slice bookings for current page
  const paginatedBookings = useMemo(() => {
    const startIdx = (page - 1) * pageSize;
    return filteredBookings.slice(startIdx, startIdx + pageSize);
  }, [filteredBookings, page]);

  const handleApplyFilters = () => {
    setAppliedFilters({ search, status, method, dateRange });
  };

  const handleExport = () => {
    const headers = ["Booking ID", "Customer", "Product", "Amount", "Status"];

    const rows = filteredBookings.map((item) => [
      item.bookingId,
      item.customer,
      item.product,
      item.amount,
      item.status,
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "rent-bookings.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Rent Bookings</h1>

          <p className="text-slate-500 mt-2">
            Manage all dress rental bookings, schedules and returns.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="w-full sm:w-auto h-11 px-6 rounded-xl bg-black hover:bg-slate-800 text-white flex items-center justify-center gap-2 transition"
        >
          <Download size={18} />
          <span>Export Report</span>
        </button>
      </div>

      {/* Stats */}
      <BookingsStats stats={stats} />

      {/* Filters */}
      <BookingFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        method={method}
        setMethod={setMethod}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onApply={handleApplyFilters}
      />

      {/* Table */}
      <BookingTable bookings={paginatedBookings} />

      {/* Pagination */}
      <BookingPagination
        currentPage={page}
        totalItems={filteredBookings.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
};

export default RentBookingsPage;