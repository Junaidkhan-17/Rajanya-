import { Calendar, RefreshCw, CheckCircle2, IndianRupee } from "lucide-react";

const statConfig = [
  {
    key: "totalBookings",
    label: "Total Bookings",
    icon: Calendar,
    iconBg: "bg-purple-100 text-purple-600",
    trend: "+18.6% vs last month",
    trendColor: "text-emerald-500",
  },
  {
    key: "activeRentals",
    label: "Active Rentals",
    icon: RefreshCw,
    iconBg: "bg-blue-100 text-blue-600",
    trend: "+15.3% vs last month",
    trendColor: "text-emerald-500",
  },
  {
    key: "returnedOrders",
    label: "Returned Orders",
    icon: CheckCircle2,
    iconBg: "bg-green-100 text-green-600",
    trend: "+12.1% vs last month",
    trendColor: "text-emerald-500",
  },
  {
    key: "rentalRevenue",
    label: "Rental Revenue",
    icon: IndianRupee,
    iconBg: "bg-pink-100 text-pink-600",
    trend: "+20.7% vs last month",
    trendColor: "text-emerald-500",
  },
];

const BookingsStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {statConfig.map(({ key, label, icon: Icon, iconBg, trend, trendColor }) => (
        <div
          key={key}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4"
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
            <Icon size={22} />
          </div>

          <div>
            <p className="text-sm text-slate-500">{label}</p>
            <h3 className="text-2xl font-bold text-slate-800">{stats[key]}</h3>
            <span className={`text-xs font-medium ${trendColor}`}>{trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsStats;