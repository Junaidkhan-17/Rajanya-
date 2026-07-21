import "./AllProductsPagination.css";

{/*import {
  useProductLiveData,
  PRODUCT_ACTIONS,
} from "../../../contexts/ProductLiveDataContext"; */}

const AllProductsPagination = ({
  state,
  dispatch,
  totalPages,
  actions,
}) => {

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page) => {
    dispatch({
      type: actions.SET_PAGE,
      payload: page,
    });

    window.scrollTo({
      top: 450,
      behavior: "smooth",
    });
  };

  const handlePrevious = () => {
    if (state.currentPage > 1) {
      dispatch({
        type: actions.PREVIOUS_PAGE,
      });

      window.scrollTo({
        top: 450,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (state.currentPage < totalPages) {
      dispatch({
        type: actions.NEXT_PAGE,
      });

      window.scrollTo({
        top: 450,
        behavior: "smooth",
      });
    }
  };

  const handleFirst = () => {
    dispatch({
      type: actions.FIRST_PAGE,
    });

    window.scrollTo({
      top: 450,
      behavior: "smooth",
    });
  };

  const handleLast = () => {
    dispatch({
      type: actions.LAST_PAGE,
      payload: totalPages,
    });

    window.scrollTo({
      top: 450,
      behavior: "smooth",
    });
  };

  const getVisiblePages = () => {
    const pages = [];

    let start = Math.max(
      1,
      state.currentPage - 2
    );

    let end = Math.min(
      totalPages,
      state.currentPage + 2
    );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="all-products-pagination-main">
      {/* First */}

      <button
        onClick={handleFirst}
        disabled={state.currentPage === 1}
        className="all-products-pagination-btn"
      >
        Previous
      </button>

      {/* Previous */}

      <button
        onClick={handlePrevious}
        disabled={state.currentPage === 1}
        className="all-products-pagination-btn"
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      {/* Pages */}

      <div className="all-products-pagination-pages">
        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() =>
              handlePageChange(page)
            }
            className={`all-products-pagination-number ${
              state.currentPage === page
                ? "all-products-pagination-active"
                : ""
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}

      <button
        onClick={handleNext}
        disabled={
          state.currentPage === totalPages
        }
        className="all-products-pagination-btn"
      >
        <i className="bi bi-chevron-right"></i>
      </button>

      {/* Last */}

      <button
        onClick={handleLast}
        disabled={
          state.currentPage === totalPages
        }
        className="all-products-pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

export default AllProductsPagination;