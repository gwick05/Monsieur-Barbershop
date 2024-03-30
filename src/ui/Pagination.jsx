function getComponent({ option, currPage, onNext, onPrev }) {
  switch (option) {
    case 'start':
      return (
        <>
          <span className="text-1xl">{currPage}</span>
          <button
            onClick={onNext}
            className="px-2 py-1 text-lg hover:scale-125 hover:text-orange-400"
          >
            {'>'}
          </button>
        </>
      );

    case 'between':
      return (
        <>
          <button
            onClick={onPrev}
            className="px-2 py-1 text-lg hover:scale-125 hover:text-orange-400"
          >
            {'<'}
          </button>
          <span className="text-1xl">{currPage}</span>
          <button
            onClick={onNext}
            className="px-2 py-1 text-lg hover:scale-125 hover:text-orange-400"
          >
            {'>'}
          </button>
        </>
      );

    case 'end':
      return (
        <>
          <button
            onClick={onPrev}
            className="px-2 py-1 text-lg hover:scale-125 hover:text-orange-400"
          >
            {'<'}
          </button>
          <span className="text-1xl">{currPage}</span>
        </>
      );

    default:
      return null;
  }
}

function Pagination({ maxPage, currPage, onNext, onPrev }) {
  let option;
  if (currPage < maxPage) option = 'start';
  if (currPage < maxPage && currPage > 1) option = 'between';
  if (currPage === maxPage && currPage > 1) option = 'end';

  return (
    <div className="mb-4 mt-4 flex items-center justify-center gap-4">
      {getComponent({
        option: option,
        currPage: currPage,
        onNext: onNext,
        onPrev: onPrev,
      })}
    </div>
  );
}

export default Pagination;
