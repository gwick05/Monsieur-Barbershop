import { useSearchParams } from 'react-router-dom';

export function useFilteredAndSortedData({
  data,
  sortSwitchFn,
  filterBy,
  filterFn,
  searchByKey,
}) {
  let filteredData;
  const [searchParams] = useSearchParams();
  const searchBy = searchParams.get('searchBy');
  const sortBy = searchParams.get('sortBy');
  const filter = searchParams.get(filterBy);

  //Filter basato sul campo cerca
  filteredData = searchBy?.trim()
    ? data?.filter((piece) =>
        new RegExp(searchBy.trim(), 'i').test(piece[searchByKey]),
      )
    : data;

  filteredData = filter ? filterFn(filteredData, filter) : filteredData;

  filteredData = sortBy
    ? sortSwitchFn([...filteredData], sortBy)
    : filteredData;

  return filteredData;
}
