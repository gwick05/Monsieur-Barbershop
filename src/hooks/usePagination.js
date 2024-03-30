import { useState } from 'react';

export function usePagination({ length, nItemsOnPage, arrayToPaginate }) {
  const [currPage, setCurrPage] = useState(1);
  const maxPage = Math.ceil(length / nItemsOnPage);
  const paginatedArray = arrayToPaginate.slice(
    (currPage - 1) * nItemsOnPage,
    currPage * nItemsOnPage,
  );

  function next() {
    setCurrPage((currPage) => currPage + 1);
  }
  function prev() {
    setCurrPage((currPage) => currPage - 1);
  }

  return { currPage, maxPage, next, prev, paginatedArray };
}
