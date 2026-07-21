const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  setCurrentPage,
}) => {
  if (totalPages <= 1) return null;

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-200 bg-white">

      <p className="text-sm text-slate-500">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
          className="px-3 py-2 border rounded-lg disabled:opacity-40"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;

          return (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={`w-10 h-10 rounded-lg ${
                page === currentPage
                  ? "bg-[#151b4f] text-white"
                  : "border border-slate-200"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
          className="px-3 py-2 border rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;