const TryOnPagination = ({
  currentPage,
  totalEntries,
  perPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalEntries / perPage);

  const getPages = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
      {/* Left */}
      <p className="text-sm text-slate-500">
        Showing {Math.min((currentPage - 1) * perPage + 1, totalEntries)} to{" "}
        {Math.min(currentPage * perPage, totalEntries)} of {totalEntries}{" "}
        entries
      </p>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          ‹
        </button>

        {/* Pages */}
        {getPages().map((page, idx) =>
          page === "..." ? (
            <span
              key={idx}
              className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm"
            >
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                currentPage === page
                  ? "bg-black text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ),
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default TryOnPagination;
