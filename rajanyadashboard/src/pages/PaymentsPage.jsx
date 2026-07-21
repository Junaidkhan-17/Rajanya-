import { useEffect, useState } from "react";
import {
  Wallet,
  CircleCheckBig,
  Clock3,
  CircleX,
  BarChart3,
  Download,
} from "lucide-react";

import PaymentFilters from "../components/payments/PaymentFilter";
import PaymentTable from "../components/payments/PaymentTable";

const PaymentsPage = () => {
  const [stats, setStats] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [method, setMethod] = useState("All Methods");
  const [dateRange, setDateRange] = useState("");

  const [payments, setPayments] = useState([]);

  // filters that are actually applied to the table (only updates on Apply click)
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    status: "All Status",
    method: "All Methods",
    dateRange: "",
  });

  useEffect(() => {
    // Stats
    setStats({
      totalRevenue: "₹2,48,750",
      successfulPayments: 986,
      pendingPayments: 142,
      failedPayments: 120,
      monthRevenue: "₹78,450",
    });

    // Dummy Payments
    setPayments([
      {
        _id: 1,
        transactionId: "PAY-001246",
        customer: "Neha Patel",
        email: "neha@gmail.com",
        service: "Virtual Try-On",
        amount: 2800,
        method: "UPI",
        status: "Paid",
        date: "16 Aug 2025",
      },
      {
        _id: 2,
        transactionId: "PAY-001247",
        customer: "Priya Sharma",
        email: "priya@gmail.com",
        service: "Rent Booking",
        amount: 4500,
        method: "Card",
        status: "Pending",
        date: "17 Aug 2025",
      },
      {
        _id: 3,
        transactionId: "PAY-001248",
        customer: "Aarav Singh",
        email: "aarav@gmail.com",
        service: "Virtual Try-On",
        amount: 7200,
        method: "Net Banking",
        status: "Failed",
        date: "18 Aug 2025",
      },
      {
        _id: 4,
        transactionId: "PAY-001249",
        customer: "Rohit Mehta",
        email: "rohit@gmail.com",
        service: "Virtual Try-On",
        amount: 3100,
        method: "Wallet",
        status: "Paid",
        date: "18 Aug 2025",
      },
      {
        _id: 5,
        transactionId: "PAY-001250",
        customer: "Kavya Rao",
        email: "kavya@gmail.com",
        service: "Rent Booking",
        amount: 5600,
        method: "UPI",
        status: "Pending",
        date: "19 Aug 2025",
      },
      {
        _id: 6,
        transactionId: "PAY-001251",
        customer: "Ishaan Kapoor",
        email: "ishaan@gmail.com",
        service: "Virtual Try-On",
        amount: 990,
        method: "Card",
        status: "Failed",
        date: "20 Aug 2025",
      },
    ]);
  }, []);

  const handleApplyFilters = () => {
    setAppliedFilters({
      search,
      status,
      method,
      dateRange,
    });
  };

  const handleExport = () => {
    const headers = [
      "Transaction ID",
      "Customer",
      "Service",
      "Amount",
      "Method",
      "Status",
      "Date",
    ];

    const rows = payments.map((item) => [
      item.transactionId,
      item.customer,
      item.service,
      item.amount,
      item.method,
      item.status,
      item.date,
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "payments-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  if (!stats) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Revenue",
      value: stats.totalRevenue,
      change: "+18.7% vs last month",
      icon: Wallet,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      trendColor: "text-green-600",
    },
    {
      title: "Successful Payments",
      value: stats.successfulPayments,
      change: "+15.3% vs last month",
      icon: CircleCheckBig,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      trendColor: "text-green-600",
    },
    {
      title: "Pending Payments",
      value: stats.pendingPayments,
      change: "+8.4% vs last month",
      icon: Clock3,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      trendColor: "text-orange-500",
    },
    {
      title: "Failed Payments",
      value: stats.failedPayments,
      change: "-4.2% vs last month",
      icon: CircleX,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      trendColor: "text-red-500",
    },
    {
      title: "This Month Revenue",
      value: stats.monthRevenue,
      change: "+12.8% vs last month",
      icon: BarChart3,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trendColor: "text-green-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Payments Management
          </h1>
          <p className="text-slate-500 mt-2">
            View all payments, track transactions and manage refunds.
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                <Icon className={card.iconColor} size={20} />
              </div>
              <p className="mt-5 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                {card.title}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">{card.value}</h2>
              <p className={`mt-2 text-xs ${card.trendColor}`}>{card.change}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <PaymentFilters
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

      {/* Table - driven by appliedFilters, not live typing */}
      <PaymentTable
        payments={payments}
        search={appliedFilters.search}
        status={appliedFilters.status}
        method={appliedFilters.method}
        dateRange={appliedFilters.dateRange}
      />
    </div>
  );
};

export default PaymentsPage;