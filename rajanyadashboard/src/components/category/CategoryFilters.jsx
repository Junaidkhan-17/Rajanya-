import { Search } from "lucide-react";

const CategoryFilters = ({
  search,
  setSearch,

  featured,
  setFeatured,

  sortBy,
  setSortBy,

  date,
  setDate,

  status,
  setStatus,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[250px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 rounded-xl border border-slate-200 pl-11 pr-4 outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Featured */}
        <select
          value={featured}
          onChange={(e) => setFeatured(e.target.value)}
          className="h-12 w-full sm:w-[150px] rounded-xl border border-slate-200 px-4 outline-none bg-white"
        >
          <option value="">Featured</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-12 w-full sm:w-[150px] rounded-xl border border-slate-200 px-4 outline-none bg-white"
        >
          <option value="">Category Type</option>
          <option value="Men's Wear">Men's Wear</option>
          <option value="Women's Wear">Women's Wear</option>
        </select>

        {/* Date */}
        <div className="w-full sm:w-[170px]">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none"
          />
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-12 w-full sm:w-[150px] rounded-xl border border-slate-200 px-4 outline-none bg-white"
        >
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default CategoryFilters;
