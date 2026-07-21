import {
  ImagePlus,
  Clock3,
  CheckCircle2,
  XCircle,
  IndianRupee,
} from "lucide-react";

export default function TryStatsOn({ stats }) {
  const cards = [
    {
      title: "Total Try-On Requests",
      value: stats?.totalRequests || 0,
      sub: "+11.3% vs last month",
      color: "purple",
      icon: <ImagePlus size={22} />,
    },
    {
      title: "Pending Requests",
      value: stats?.pendingRequests || 0,
      sub: "+8.4% vs last month",
      color: "orange",
      icon: <Clock3 size={22} />,
    },
    {
      title: "Completed Requests",
      value: stats?.completedRequests || 0,
      sub: "+15.3% vs last month",
      color: "green",
      icon: <CheckCircle2 size={22} />,
    },
    {
      title: "Failed Requests",
      value: stats?.failedRequests || 0,
      sub: "-4.2% vs last month",
      color: "red",
      icon: <XCircle size={22} />,
    },
    {
      title: "Revenue Generated",
      value: `₹${stats?.revenue || 0}`,
      sub: "+18.7% vs last month",
      color: "blue",
      icon: <IndianRupee size={22} />,
    },
  ];

  const colorClasses = {
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-500",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-500",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-500",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-500",
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5"
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[card.color].bg}`}
            >
              <div className={colorClasses[card.color].text}>
                {card.icon}
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400">{card.title}</p>

              <h3 className="text-2xl font-bold text-slate-800">
                {card.value}
              </h3>

              <p className="text-[11px] text-green-500 font-medium mt-1">
                {card.sub}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}