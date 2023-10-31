import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

function Paginate({ handlePageClick, pageCount, currentPage }) {
    return (
        <ReactPaginate
            className="flex gap-1"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            forcePage={currentPage - 1}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
        />
    );
}

Paginate.propTypes = {
    handlePageClick: PropTypes.func,
    pageCount: PropTypes.number,
    currentPage: PropTypes.number,
};

export default Paginate;
