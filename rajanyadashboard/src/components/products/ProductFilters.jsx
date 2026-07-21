import { Search, X } from "lucide-react";

export default function ProductFilters({ filters, setFilters, onSearchChange }) {
  const categories = [
    "Bridal",
    "Men's Wear",
    "Sarees",
    "Party Wear",
    "Reception Wear",
  ];

  const sizes = ["S", "M", "L", "XL", "XXL", "Free Size"];

  const prices = ["₹0 - ₹2000", "₹2000 - ₹5000", "₹5000 - ₹10000", "₹10000+"];

  const statuses = ["Active", "Inactive"];

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.size ||
    filters.priceRange ||
    filters.selectedDate ||
    filters.status;

  const clearAllFilters = () => {
    setFilters({
      search: "",
      category: "",
      size: "",
      priceRange: "",
      selectedDate: null,
      status: "",
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 sm:p-4">
      <div className="flex flex-col xl:flex-row gap-3">
        {/* Search */}
        <div className="relative w-full xl:flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => {
              const value = e.target.value;
              setFilters({ ...filters, search: value });
              if (onSearchChange) {
                onSearchChange(value);
              }
            }}
            placeholder="Search product name..."
            className="w-full h-11 pl-10 pr-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-300"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:flex gap-2 w-full xl:w-auto">
          {/* Category */}
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="h-11 px-3 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none w-full min-w-0"
          >
            <option value="">All Categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Size */}
          <select
            value={filters.size}
            onChange={(e) =>
              setFilters({ ...filters, size: e.target.value })
            }
            className="h-11 px-3 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none w-full min-w-0"
          >
            <option value="">All Sizes</option>
            {sizes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Price */}
          <select
            value={filters.priceRange}
            onChange={(e) =>
              setFilters({ ...filters, priceRange: e.target.value })
            }
            className="h-11 px-3 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none w-full min-w-0"
          >
            <option value="">Price Range</option>
            {prices.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Date — FIXED */}
          <div className="w-full xl:w-[170px]">
            <input
              type="date"
              value={
                filters.selectedDate
                  ? (() => {
                      const d = new Date(filters.selectedDate);
                      const yyyy = d.getFullYear();
                      const mm = String(d.getMonth() + 1).padStart(2, "0");
                      const dd = String(d.getDate()).padStart(2, "0");
                      return `${yyyy}-${mm}-${dd}`;
                    })()
                  : ""
              }
              onChange={(e) =>
                setFilters({
                  ...filters,
                  selectedDate: e.target.value
                    ? new Date(e.target.value + "T00:00:00") // ✅ midnight local time fix
                    : null,
                })
              }
              className="h-11 w-full px-3 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none"
            />
          </div>

          {/* Status */}
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
            className="h-11 px-3 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none w-full min-w-0"
          >
            <option value="">Status</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Clear All Button */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="h-11 px-3 flex items-center gap-1.5 border border-red-200 text-red-500 rounded-xl text-sm hover:bg-red-50 transition-colors w-full xl:w-auto justify-center"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}