import { Package, Grid3X3, Sparkles, IndianRupee } from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: "356",
    growth: "+25 New Products",
    icon: Package,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Total Categories",
    value: "12",
    growth: "Active Categories",
    icon: Grid3X3,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    title: "Virtual Try-On Requests",
    value: "185",
    growth: "+28 This Month",
    icon: Sparkles,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    title: "Virtual Try-On Revenue",
    value: "₹18,500",
    growth: "+12% This Month",
    icon: IndianRupee,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              bg-white
              rounded-3xl
              border
              border-slate-200
              shadow-sm
              p-4
              min-h-[130px]
              hover:shadow-md
              transition-all
            "
          >
            <div className="flex items-start gap-6">
              {/* Icon */}
              <div
                className={`
      w-14 h-14
      rounded-2xl
      flex
      items-center
      justify-center
      shrink-0
      ${item.iconBg}
    `}
              >
                <Icon size={28} className={item.iconColor} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm text-slate-500">{item.title}</p>

                <h2 className="text-3xl font-bold text-slate-900 mt-1">
                  {item.value}
                </h2>

                <p className="text-sm text-green-500 mt-2">{item.growth}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
