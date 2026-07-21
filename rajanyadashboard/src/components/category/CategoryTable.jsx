import CategoryRow from "./CategoryRow";

const CategoryTable = ({
  categories = [],
  loading = false,
  onDelete,
  selectedRows,
  setSelectedRows,
}) => {
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(categories.map((item) => item._id));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Horizontal Scroll */}
      <div className="w-full overflow-x-auto">
        {/* Vertical Scroll */}
        <div className="max-h-[550px] overflow-y-auto">
          <table className="min-w-[1250px] w-full">
            {/* Header */}
            <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10">
              <tr className="text-[11px] uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4 w-12">
                  <input
                    type="checkbox"
                    checked={
                      categories.length > 0 &&
                      selectedRows.length === categories.length
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 cursor-pointer"
                  />
                </th>

                <th className="px-4 py-4 text-center">#</th>

                <th className="px-4 py-4 text-left">Image</th>

                <th className="px-4 py-4 text-left">Category</th>

                <th className="px-4 py-4 text-center">Products</th>

                <th className="px-4 py-4 text-center">Featured</th>

                <th className="px-4 py-4 text-center">Status</th>

                <th className="px-4 py-4 text-center">Date</th>

                <th className="px-4 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-20 text-center text-slate-400">
                    Loading Categories...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-20 text-center text-slate-400">
                    No Categories Found
                  </td>
                </tr>
              ) : (
                categories.map((category, index) => (
                  <CategoryRow
                    key={category._id}
                    category={category}
                    index={index}
                    onDelete={onDelete}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
