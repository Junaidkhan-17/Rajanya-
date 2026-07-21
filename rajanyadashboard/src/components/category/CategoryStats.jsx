import { FolderOpen, Package, Star, CheckCircle2 } from "lucide-react";

const icons = {
  totalCategories: {
    icon: FolderOpen,
    bg: "bg-amber-100",
    color: "text-amber-600",
  },
  productsAssigned: {
    icon: Package,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  featuredCategories: {
    icon: Star,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  activeCategories: {
    icon: CheckCircle2,
    bg: "bg-green-100",
    color: "text-green-600",
  },
};

const labels = {
  totalCategories: {
    title: "Total Categories",
    subTitle: "All Categories",
  },
  productsAssigned: {
    title: "Products Assigned",
    subTitle: "Across All Categories",
  },
  featuredCategories: {
    title: "Featured Categories",
    subTitle: "Marked as Featured",
  },
  activeCategories: {
    title: "Active Categories",
    subTitle: "Currently Active",
  },
};

const CategoryStats = ({ stats = {} }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {Object.entries(stats).map(([key, value]) => {
        const Icon = icons[key]?.icon;
        if (!Icon) return null;

        return (
          <div
            key={key}
            className="bg-white border border-slate-200 rounded-2xl shadow-sm px-5 py-4"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${icons[key].bg}`}
              >
                <Icon className={`w-6 h-6 ${icons[key].color}`} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                  {labels[key].title}
                </p>

                <h2 className="text-3xl font-bold text-slate-900">{value}</h2>

                <p className="text-xs text-slate-500">{labels[key].subTitle}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryStats;
