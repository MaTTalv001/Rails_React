import React from 'react';
import PaginationButton from './PaginationButton';

const Pagination = ({ page, totalPages, handlePrevPage, handleNextPage }) => {
  return (
    <nav className="flex items-center gap-x-1">
      <PaginationButton onClick={handlePrevPage} disabled={page === 1} direction="prev">
        Previous
      </PaginationButton>
      {/* 以下のコードは必要に応じてページ番号を表示するために使うことができます */}
      {/* <span>Page {page} of {totalPages}</span> */ }
      <PaginationButton onClick={handleNextPage} disabled={page === totalPages} direction="next">
        Next
      </PaginationButton>
    </nav>
  );
};

export default Pagination;