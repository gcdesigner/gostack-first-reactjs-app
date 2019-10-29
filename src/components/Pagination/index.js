import React from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import { PaginationContainer } from './styles';

export default function Pagination({ page, totalIssues, lastPage }) {
  function handlePagePrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handlePageNext() {
    if (page < lastPage) {
      setPage(page + 1);
    }
  }

  function handleLastPage() {
    setPage(lastPage);
  }

  return (
    <PaginationContainer>
      <button
        type="button"
        onClick={handlePagePrev}
        className={page === 1 ? 'disabled' : ''}
        disabled={page === 1 ? 1 : 0}
      >
        <FaArrowLeft />
        Prev
      </button>

      <strong>{`Total ${
        issueType !== 'all' ? issueType : ''
      } Issues: ${totalIssues} - LastPage: ${lastPage} de ${page}`}</strong>

      <button
        type="button"
        onClick={handlePageNext}
        className={page === 2 ? 'disabled' : ''}
        disabled={page === 2 ? 'disabled' : ''}
      >
        Next
        <FaArrowRight />
      </button>

      <button
        type="button"
        onClick={handleLastPage}
        className={page === lastPage ? 'disabled' : ''}
        disabled={page === lastPage ? 'disabled' : ''}
      >
        Last
        <FaArrowRight />
      </button>
    </PaginationContainer>
  );
}
