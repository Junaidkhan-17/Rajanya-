import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BookingPagination = ({
  currentPage,
  totalItems,
  pageSize = 10,
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const goTo = (p) => {
    const clamped = Math.min(Math.max(p, 1), totalPages);
    if (clamped !== currentPage) onPageChange(clamped);
  };

  const pages = useMemo(() => {
    const result = [];
    const windowSize = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - windowSize && i <= currentPage + windowSize)
      ) {
        result.push(i);
      } else if (result[result.length - 1] !== "...") {
        result.push("...");
      }
    }
    return result;
  }, [currentPage, totalPages]);

  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <p className="text-sm text-slate-400">
        Showing {start} to {end} of {totalItems.toLocaleString("en-IN")} bookings
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((p, idx) =>
          p === "..." ? (
            <span key={`dots-${idx}`} className="px-2 text-slate-400 text-sm">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goTo(p)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                p === currentPage
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default BookingPagination;